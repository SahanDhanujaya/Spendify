import { useAuth } from "@/context/AuthContext";
import { getRecentTransactions } from "@/services/transactionService";
import { Category } from "@/types/category";
import { Transactions } from "@/types/transaction";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [data, setData] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsGoal: 5000, // Set a default goal
    currentSavings: 0,
  });
  const [recentlyTransactions, setRecentlyTransactions] = useState<
    Transactions[]
  >([]);

  const categories: Category[] = [
    {
      name: "Food",
      spent: 450.2,
      budget: 600,
      icon: "🍕",
      color: "bg-orange-500",
    },
    {
      name: "Transport",
      spent: 180.5,
      budget: 300,
      icon: "🚗",
      color: "bg-blue-500",
    },
    {
      name: "Shopping",
      spent: 320.8,
      budget: 400,
      icon: "🛍️",
      color: "bg-purple-500",
    },
    {
      name: "Bills",
      spent: 650.0,
      budget: 800,
      icon: "💡",
      color: "bg-yellow-500",
    },
    {
      name: "Health",
      spent: 200.0,
      budget: 250,
      icon: "🏥",
      color: "bg-red-500",
    },
    {
      name: "Fun",
      spent: 120.0,
      budget: 150,
      icon: "🎮",
      color: "bg-pink-500",
    },
    {
      name: "Education",
      spent: 90.0,
      budget: 100,
      icon: "📚",
      color: "bg-green-500",
    },
    {
      name: "Service",
      spent: 50.0,
      budget: 60,
      icon: "🛠️",
      color: "bg-gray-500",
    }
  ];

  const periods = ["This Week", "This Month", "This Year"];
  const auth = useAuth();
  const clearData = () => {
    setData({
      totalBalance: 0,
      monthlyIncome: 0,
      monthlyExpenses: 0,
      savingsGoal: 5000, // Set a default goal
      currentSavings: 0,
    });
  }
  useEffect(() => {
    clearData();
    const fetchTransactions = async () => {
      try {
        const res = await getRecentTransactions();
        
        let totalIncome:number = 0;
        let totalExpenses:number = 0;
        const transactions: Transactions[] = [];

        res.forEach((re) => {
          const tran: Transactions = {
            id: re.id,
            title: re.title,
            category: re.category,
            amount: re.type === "income" ? re.amount : -1 * re.amount,
            date: re.date,
            icon: re.category === "food" ? "🍕" : 
                  re.category === "transport" ? "🚗" : 
                  re.category === "shopping" ? '🛍️' : 
                  re.category === 'bills' ? '💡' : 
                  re.category === 'health' ? '🏥' : 
                  re.category === 'fun' ? '🎮' : 
                  re.category === 'education' ? '📚' : 
                  re.category === 'salary' ? '💰' :
                  re.category === 'gift' ? '🎁' :
                  re.category === 'investment' ? '📈' :
                  re.category === 'freelance' ? '💻' :
                  re.category === 'service' ? '🛠️' : '📦',
            color: re.category === "food" ? "bg-orange-500" : 
                   re.category === "transport" ? "bg-blue-500" : 
                   re.category === "shopping" ? 'bg-purple-500' : 
                   re.category === 'bills' ? 'bg-yellow-500' : 
                   re.category === 'health' ? 'bg-red-500' : 
                   re.category === 'fun' ? 'bg-pink-500' : 
                   re.category === 'education' ? 'bg-green-500' : 
                   re.category === 'salary' ? 'bg-green-500' :
                   re.category === 'gift' ? 'bg-gray-500' :
                   re.category === 'investment' ? 'bg-black' :
                   re.category === 'freelance' ? 'bg-gray-500' :
                   re.category === 'service' ? 'bg-gray-500' : 'bg-indigo-500',
            type: re.type,
            description: re.description,
          };

          transactions.push(tran);

          if (re.type === "income") {
            console.log(re.amount);
            totalIncome += parseFloat(re.amount);
          } else {
            console.log('expenses',re.amount);
            totalExpenses += parseFloat(re.amount);
          }
        });

        setRecentlyTransactions(transactions);
        console.log(totalIncome, totalExpenses);
        setData({
          totalBalance: totalIncome - totalExpenses,
          monthlyIncome: totalIncome,
          monthlyExpenses: totalExpenses,
          savingsGoal: 5000,
          currentSavings: totalIncome - totalExpenses, 
        });
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

  const getProgressPercentage = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const savingsPercentage = data.savingsGoal > 0 
    ? Math.min(Math.round((data.currentSavings / data.savingsGoal) * 100), 100)
    : 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 py-4">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View className="px-6 pt-4 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-2xl font-bold text-gray-800">
              Good Morning!
            </Text>
            <Text className="text-gray-500 text-base">{auth.user?.email}</Text>
          </View>
          <TouchableOpacity className="bg-white rounded-full p-3 shadow-sm">
            <Image
              source={require("../../assets/profile/WhatsApp Image 2025-08-28 at 13.37.33_97bcc532.jpg")}
              className="w-16 h-16 rounded-full"
            />
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
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

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View className="px-6 mb-6">
          <View className="bg-gray-800 rounded-3xl p-6 shadow-lg">
            <View className="items-center mb-4">
              <Text className="text-white/70 text-base font-medium">
                Total Balance
              </Text>
              <Text className="text-white text-4xl font-bold mt-2">
                {formatCurrency(data.totalBalance)}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <View className="bg-green-500/20 rounded-full p-2 mb-2">
                  <Text className="text-xl">📈</Text>
                </View>
                <Text className="text-white/70 text-sm">Income</Text>
                <Text className="text-white font-bold text-lg">
                  {formatCurrency(data.monthlyIncome)}
                </Text>
              </View>

              <View className="items-center flex-1">
                <View className="bg-red-500/20 rounded-full p-2 mb-2">
                  <Text className="text-xl">📉</Text>
                </View>
                <Text className="text-white/70 text-sm">Expenses</Text>
                <Text className="text-white font-bold text-lg">
                  {formatCurrency(data.monthlyExpenses)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Savings Goal */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-800 font-bold text-lg">
                💎 Savings Goal
              </Text>
              <Text className="text-gray-500 text-sm">
                {savingsPercentage}%
              </Text>
            </View>

            <View className="bg-gray-200 rounded-full h-3 mb-3">
              <View
                className="bg-blue-500 rounded-full h-3"
                style={{ width: `${savingsPercentage}%` }}
              />
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">
                {formatCurrency(data.currentSavings)} saved
              </Text>
              <Text className="text-gray-600 text-sm">
                Goal: {formatCurrency(data.savingsGoal)}
              </Text>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-800 font-bold text-xl">Categories</Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-semibold">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {categories.map((category, index) => (
              <View
                key={index}
                className="bg-white rounded-2xl p-4 shadow-sm mb-4"
                style={{ width: "48%" }}
              >
                <View className="flex-row items-center mb-3">
                  <View className={`${category.color} rounded-full p-2 mr-3`}>
                    <Text className="text-white text-lg">{category.icon}</Text>
                  </View>
                  <Text className="text-gray-800 font-semibold flex-1">
                    {category.name}
                  </Text>
                </View>

                <View className="bg-gray-200 rounded-full h-2 mb-2">
                  <View
                    className={`${category.color} rounded-full h-2`}
                    style={{
                      width: `${getProgressPercentage(category.spent, category.budget)}%`,
                    }}
                  />
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-gray-600 text-sm">
                    {formatCurrency(category.spent)}
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    of {formatCurrency(category.budget)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-800 font-bold text-xl">
              Recent Transactions
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-semibold">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl shadow-sm">
            {recentlyTransactions.map((transaction, index) => (
              <TouchableOpacity
                key={transaction.id}
                className={`flex-row items-center p-4 ${
                  index !== recentlyTransactions.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <View className={`${transaction.color} rounded-full p-3 mr-4`}>
                  <Text className="text-lg">{transaction.icon}</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold text-base">
                    {transaction.title}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {transaction.category} • {transaction.date}
                  </Text>
                </View>

                <Text
                  className={`font-bold text-base ${
                    transaction.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  {formatCurrency(transaction.amount)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;