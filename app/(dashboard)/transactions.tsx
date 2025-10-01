import {
  deleteTransaction,
  getRecentTransactions,
  updateTransaction,
} from "@/services/transactionService";
import { Transactions as TransactionType } from "@/types/transaction";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Transactions: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [allTransactions, setAllTransactions] = useState<TransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionType | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    amount: "",
    type: "expense" as "income" | "expense",
    description: "",
  });

  const filterOptions = [
    "All",
    "Income",
    "Expenses",
    "Food",
    "Transport",
    "Bills",
    "Shopping",
  ];
  const periods = ["This Week", "This Month", "Last Month", "This Year"];

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const res = await getRecentTransactions();

      const transactions: TransactionType[] = res.map((re) => ({
        id: re.id,
        title: re.title,
        category: re.category,
        amount:
          re.type === "income"
            ? parseFloat(re.amount)
            : -1 * parseFloat(re.amount),
        date: re.date,
        icon:
          re.category === "food"
            ? "🍕"
            : re.category === "transport"
              ? "🚗"
              : re.category === "shopping"
                ? "🛍️"
                : re.category === "bills"
                  ? "💡"
                  : re.category === "health"
                    ? "🏥"
                    : re.category === "fun"
                      ? "🎮"
                      : re.category === "education"
                        ? "📚"
                        : re.category === "salary"
                          ? "💰"
                          : re.category === "gift"
                            ? "🎁"
                            : re.category === "investment"
                              ? "📈"
                              : re.category === "freelance"
                                ? "💻"
                                : re.category === "service"
                                  ? "🛠️"
                                  : "📦",
        color:
          re.category === "food"
            ? "bg-orange-500"
            : re.category === "transport"
              ? "bg-blue-500"
              : re.category === "shopping"
                ? "bg-purple-500"
                : re.category === "bills"
                  ? "bg-yellow-500"
                  : re.category === "health"
                    ? "bg-red-500"
                    : re.category === "fun"
                      ? "bg-pink-500"
                      : re.category === "education"
                        ? "bg-green-500"
                        : re.category === "salary"
                          ? "bg-green-500"
                          : re.category === "gift"
                            ? "bg-gray-500"
                            : re.category === "investment"
                              ? "bg-black"
                              : re.category === "freelance"
                                ? "bg-gray-500"
                                : re.category === "service"
                                  ? "bg-gray-500"
                                  : "bg-indigo-500",
        type: re.type,
        description: re.description,
      }));

      setAllTransactions(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      Alert.alert("Error", "Failed to load transactions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

  const handleTransactionPress = (id: string) => {
    if (selectedTransactionId === id) {
      setSelectedTransactionId(null);
    } else {
      setSelectedTransactionId(id);
    }
  };

  const handleEdit = (transaction: TransactionType) => {
    setEditingTransaction(transaction);
    setEditForm({
      title: transaction.title,
      category: transaction.category,
      amount: Math.abs(transaction.amount).toString(),
      type: transaction.type as "income" | "expense",
      description: transaction.description || "",
    });
    setIsEditModalVisible(true);
    setSelectedTransactionId(null);
  };

  const handleSaveEdit = async () => {
    if (!editingTransaction) return;

    if (!editForm.title.trim() || !editForm.amount.trim()) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    try {
      const updatedTransaction: Partial<TransactionType> = {
        title: editForm.title,
        category: editForm.category,
        amount: parseFloat(editForm.amount),
        type: editForm.type,
        description: editForm.description,
      };

      await updateTransaction(editingTransaction.id || "", updatedTransaction);

      // Refresh transactions from server
      await fetchTransactions();

      setIsEditModalVisible(false);
      setEditingTransaction(null);
      Alert.alert("Success", "Transaction updated successfully");
    } catch (error) {
      console.error("Error updating transaction:", error);
      Alert.alert("Error", "Failed to update transaction");
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    setEditingTransaction(null);
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTransaction(id);
              setAllTransactions((prev) => prev.filter((t) => t.id !== id));
              setSelectedTransactionId(null);
              Alert.alert("Success", "Transaction deleted successfully");
            } catch (error) {
              console.error("Error deleting transaction:", error);
              Alert.alert("Error", "Failed to delete transaction");
            }
          },
        },
      ]
    );
  };

  const getFilteredTransactions = () => {
    let filtered = allTransactions;

    if (selectedFilter !== "All") {
      if (selectedFilter === "Income") {
        filtered = filtered.filter((t) => t.type === "income");
      } else if (selectedFilter === "Expenses") {
        filtered = filtered.filter((t) => t.type === "expense");
      } else {
        filtered = filtered.filter(
          (t) => t.category.toLowerCase() === selectedFilter.toLowerCase()
        );
      }
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();

  const getTotalAmount = () => {
    return filteredTransactions.reduce(
      (sum, transaction) => sum + parseFloat(String(transaction.amount)),
      0
    );
  };

  const getTransactionCount = () => {
    const income = filteredTransactions.filter(
      (t) => t.type === "income"
    ).length;
    const expenses = filteredTransactions.filter(
      (t) => t.type === "expense"
    ).length;
    return { income, expenses, total: income + expenses };
  };

  const counts = getTransactionCount();
  const totalAmount = getTotalAmount();

  const groupTransactionsByDate = (transactions: TransactionType[]) => {
    const groups: { [key: string]: TransactionType[] } = {};

    transactions.forEach((transaction) => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });

    return groups;
  };

  const groupedTransactions = groupTransactionsByDate(filteredTransactions);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-600 text-lg">Loading transactions...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View className="px-6 pt-4 mb-4">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Transactions
        </Text>
        <Text className="text-gray-500 text-base">
          Track all your financial activities
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 mb-4">
        <View className="bg-white rounded-2xl px-4 py-3 shadow-sm">
          <TextInput
            className="text-base text-gray-800"
            placeholder="Search transactions..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Period Selector */}
      <View className="px-6 mb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-full mr-3 ${
                selectedPeriod === period ? "bg-gray-800" : "bg-white"
              }`}
            >
              <Text
                className={`font-semibold ${
                  selectedPeriod === period ? "text-white" : "text-gray-600"
                }`}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Summary Card */}
      <View className="px-6 mb-4">
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-800 font-bold text-lg">Summary</Text>
            <Text className="text-gray-500 text-sm">
              {counts.total} transactions
            </Text>
          </View>

          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <View className="bg-green-100 rounded-full p-2 mb-2">
                <Text className="text-xl">📈</Text>
              </View>
              <Text className="text-gray-600 text-sm">Income</Text>
              <Text className="text-green-600 font-bold text-lg">
                +
                {formatCurrency(
                  filteredTransactions
                    .filter((t) => t.type === "income")
                    .reduce((sum, t) => sum + parseFloat(String(t.amount)), 0)
                )}
              </Text>
            </View>

            <View className="items-center flex-1">
              <View className="bg-red-100 rounded-full p-2 mb-2">
                <Text className="text-xl">📉</Text>
              </View>
              <Text className="text-gray-600 text-sm">Expenses</Text>
              <Text className="text-red-600 font-bold text-lg">
                -
                {formatCurrency(
                  Math.abs(
                    filteredTransactions
                      .filter((t) => t.type === "expense")
                      .reduce((sum, t) => sum + parseFloat(String(t.amount)), 0)
                  )
                )}
              </Text>
            </View>

            <View className="items-center flex-1">
              <View className="bg-blue-100 rounded-full p-2 mb-2">
                <Text className="text-xl">💰</Text>
              </View>
              <Text className="text-gray-600 text-sm">Net Total</Text>
              <Text
                className={`font-bold text-lg ${totalAmount >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {totalAmount >= 0 ? "+" : ""}
                {formatCurrency(totalAmount)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Filter Options */}
      <View className="px-6 mb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full mr-3 ${
                selectedFilter === filter ? "bg-gray-800" : "bg-white"
              }`}
            >
              <Text
                className={`font-semibold ${
                  selectedFilter === filter ? "text-white" : "text-gray-600"
                }`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Transactions List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {Object.keys(groupedTransactions).length === 0 ? (
          <View className="bg-white rounded-2xl p-8 shadow-sm items-center">
            <Text className="text-6xl mb-4">📭</Text>
            <Text className="text-gray-800 font-bold text-lg mb-2">
              No transactions found
            </Text>
            <Text className="text-gray-500 text-center">
              {searchQuery
                ? "Try adjusting your search terms"
                : "No transactions match your current filters"}
            </Text>
          </View>
        ) : (
          Object.entries(groupedTransactions).map(([date, transactions]) => (
            <View key={date} className="mb-6">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-800 font-bold text-lg">{date}</Text>
                <Text className="text-gray-500 text-sm">
                  {transactions.length} transaction
                  {transactions.length !== 1 ? "s" : ""}
                </Text>
              </View>

              <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {transactions.map((transaction, index) => (
                  <View key={transaction.id}>
                    <TouchableOpacity
                      onLongPress={() =>
                        handleTransactionPress(transaction.id || "")
                      }
                      delayLongPress={300}
                      className={`flex-row items-center p-4 ${
                        selectedTransactionId === transaction.id
                          ? "bg-gray-50"
                          : "bg-white"
                      } ${index !== transactions.length - 1 ? "border-b border-gray-100" : ""}`}
                    >
                      <View
                        className={`${transaction.color} rounded-full p-3 mr-4`}
                      >
                        <Text className="text-lg">{transaction.icon}</Text>
                      </View>

                      <View className="flex-1">
                        <Text className="text-gray-800 font-semibold text-base">
                          {transaction.title}
                        </Text>
                        <Text className="text-gray-500 text-sm">
                          {transaction.category} • {date}
                        </Text>
                      </View>

                      <View className="items-end">
                        <Text
                          className={`font-bold text-base ${
                            transaction.amount > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : "-"}
                          {formatCurrency(Math.abs(transaction.amount))}
                        </Text>
                        <Text className="text-gray-400 text-xs">
                          {transaction.type}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {selectedTransactionId === transaction.id && (
                      <View className="flex-row bg-gray-50 px-4 py-3 border-t border-gray-200">
                        <TouchableOpacity
                          onPress={() => handleEdit(transaction)}
                          className="flex-1 bg-blue-600 rounded-xl py-3 mr-2 flex-row items-center justify-center"
                        >
                          <Text className="text-xl mr-2">✏️</Text>
                          <Text className="text-white font-semibold">Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => handleDelete(transaction.id || "")}
                          className="flex-1 bg-red-600 rounded-xl py-3 ml-2 flex-row items-center justify-center"
                        >
                          <Text className="text-xl mr-2">🗑️</Text>
                          <Text className="text-white font-semibold">
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))
        )}

        <View className="h-4" />
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancelEdit}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6 max-h-[80%]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-gray-800">
                Edit Transaction
              </Text>
              <TouchableOpacity onPress={handleCancelEdit}>
                <Text className="text-gray-500 text-2xl">✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2">Title</Text>
                <TextInput
                  className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800"
                  placeholder="Enter title"
                  value={editForm.title}
                  onChangeText={(text) =>
                    setEditForm({ ...editForm, title: text })
                  }
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2">Type</Text>
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() =>
                      setEditForm({ ...editForm, type: "expense" })
                    }
                    className={`flex-1 py-3 rounded-xl mr-2 ${
                      editForm.type === "expense" ? "bg-red-500" : "bg-gray-100"
                    }`}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        editForm.type === "expense"
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      Expense
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setEditForm({ ...editForm, type: "income" })}
                    className={`flex-1 py-3 rounded-xl ml-2 ${
                      editForm.type === "income"
                        ? "bg-green-500"
                        : "bg-gray-100"
                    }`}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        editForm.type === "income"
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      Income
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2">
                  Category
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800"
                  placeholder="Enter category"
                  value={editForm.category}
                  onChangeText={(text) =>
                    setEditForm({ ...editForm, category: text })
                  }
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2">Amount</Text>
                <TextInput
                  className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800"
                  placeholder="Enter amount"
                  value={editForm.amount}
                  onChangeText={(text) =>
                    setEditForm({ ...editForm, amount: text })
                  }
                  keyboardType="decimal-pad"
                />
              </View>

              <View className="mb-6">
                <Text className="text-gray-700 font-semibold mb-2">
                  Description
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800"
                  placeholder="Enter description (optional)"
                  value={editForm.description}
                  onChangeText={(text) =>
                    setEditForm({ ...editForm, description: text })
                  }
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>

              <View className="flex-row">
                <TouchableOpacity
                  onPress={handleCancelEdit}
                  className="flex-1 bg-gray-200 rounded-xl py-4 mr-2"
                >
                  <Text className="text-center text-gray-700 font-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSaveEdit}
                  className="flex-1 bg-blue-600 rounded-xl py-4 ml-2"
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text className="text-center text-white font-semibold">
                      Save Changes
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Transactions;
