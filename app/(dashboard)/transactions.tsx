import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const Transactions: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample transaction data
  const allTransactions = [
    { id: 1, title: 'Grocery Shopping', category: 'Food', amount: -85.50, date: 'Today', time: '2:30 PM', icon: '🛒', color: 'bg-orange-100', type: 'expense' },
    { id: 2, title: 'Salary Deposit', category: 'Income', amount: 3500.00, date: 'Yesterday', time: '9:00 AM', icon: '💰', color: 'bg-green-100', type: 'income' },
    { id: 3, title: 'Coffee Shop', category: 'Food', amount: -12.30, date: 'Yesterday', time: '8:15 AM', icon: '☕', color: 'bg-orange-100', type: 'expense' },
    { id: 4, title: 'Gas Station', category: 'Transport', amount: -45.00, date: '2 days ago', time: '6:45 PM', icon: '⛽', color: 'bg-blue-100', type: 'expense' },
    { id: 5, title: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, date: '3 days ago', time: '12:00 PM', icon: '📺', color: 'bg-purple-100', type: 'expense' },
    { id: 6, title: 'Freelance Payment', category: 'Income', amount: 750.00, date: '4 days ago', time: '3:20 PM', icon: '💻', color: 'bg-green-100', type: 'income' },
    { id: 7, title: 'Restaurant Dinner', category: 'Food', amount: -68.90, date: '5 days ago', time: '7:30 PM', icon: '🍽️', color: 'bg-orange-100', type: 'expense' },
    { id: 8, title: 'Uber Ride', category: 'Transport', amount: -18.50, date: '6 days ago', time: '10:15 AM', icon: '🚗', color: 'bg-blue-100', type: 'expense' },
    { id: 9, title: 'Online Shopping', category: 'Shopping', amount: -125.99, date: '1 week ago', time: '2:45 PM', icon: '🛍️', color: 'bg-purple-100', type: 'expense' },
    { id: 10, title: 'Electricity Bill', category: 'Bills', amount: -89.50, date: '1 week ago', time: '11:30 AM', icon: '💡', color: 'bg-yellow-100', type: 'expense' },
  ];

  const filterOptions = ['All', 'Income', 'Expenses', 'Food', 'Transport', 'Bills', 'Shopping'];
  const periods = ['This Week', 'This Month', 'Last Month', 'This Year'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount));
  };

  const getFilteredTransactions = () => {
    let filtered = allTransactions;

    // Filter by category/type
    if (selectedFilter !== 'All') {
      if (selectedFilter === 'Income') {
        filtered = filtered.filter(t => t.type === 'income');
      } else if (selectedFilter === 'Expenses') {
        filtered = filtered.filter(t => t.type === 'expense');
      } else {
        filtered = filtered.filter(t => t.category === selectedFilter);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();

  const getTotalAmount = () => {
    const total = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    return total;
  };

  const getTransactionCount = () => {
    const income = filteredTransactions.filter(t => t.type === 'income').length;
    const expenses = filteredTransactions.filter(t => t.type === 'expense').length;
    return { income, expenses, total: income + expenses };
  };

  const counts = getTransactionCount();
  const totalAmount = getTotalAmount();

  // Group transactions by date
  const groupTransactionsByDate = (transactions: typeof allTransactions) => {
    const groups: { [key: string]: typeof allTransactions } = {};
    
    transactions.forEach(transaction => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });
    
    return groups;
  };

  const groupedTransactions = groupTransactionsByDate(filteredTransactions);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View className="px-6 pt-4 mb-4">
        <Text className="text-2xl font-bold text-gray-800 mb-2">Transactions</Text>
        <Text className="text-gray-500 text-base">Track all your financial activities</Text>
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
          <View className="flex-row space-x-3">
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                onPress={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-full ${
                  selectedPeriod === period ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    selectedPeriod === period ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Summary Card */}
      <View className="px-6 mb-4">
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-800 font-bold text-lg">Summary</Text>
            <Text className="text-gray-500 text-sm">{counts.total} transactions</Text>
          </View>
          
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <View className="bg-green-100 rounded-full p-2 mb-2">
                <Text className="text-xl">📈</Text>
              </View>
              <Text className="text-gray-600 text-sm">Income</Text>
              <Text className="text-green-600 font-bold text-lg">
                +{formatCurrency(filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0))}
              </Text>
            </View>
            
            <View className="items-center flex-1">
              <View className="bg-red-100 rounded-full p-2 mb-2">
                <Text className="text-xl">📉</Text>
              </View>
              <Text className="text-gray-600 text-sm">Expenses</Text>
              <Text className="text-red-600 font-bold text-lg">
                -{formatCurrency(Math.abs(filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)))}
              </Text>
            </View>
            
            <View className="items-center flex-1">
              <View className="bg-blue-100 rounded-full p-2 mb-2">
                <Text className="text-xl">💰</Text>
              </View>
              <Text className="text-gray-600 text-sm">Net Total</Text>
              <Text className={`font-bold text-lg ${totalAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalAmount >= 0 ? '+' : ''}{formatCurrency(totalAmount)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Filter Options */}
      <View className="px-6 mb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-3">
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full ${
                  selectedFilter === filter ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    selectedFilter === filter ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Transactions List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {Object.keys(groupedTransactions).length === 0 ? (
          <View className="bg-white rounded-2xl p-8 shadow-sm items-center">
            <Text className="text-6xl mb-4">📭</Text>
            <Text className="text-gray-800 font-bold text-lg mb-2">No transactions found</Text>
            <Text className="text-gray-500 text-center">
              {searchQuery ? 'Try adjusting your search terms' : 'No transactions match your current filters'}
            </Text>
          </View>
        ) : (
          Object.entries(groupedTransactions).map(([date, transactions], groupIndex) => (
            <View key={date} className="mb-6">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-800 font-bold text-lg">{date}</Text>
                <Text className="text-gray-500 text-sm">
                  {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                </Text>
              </View>
              
              <View className="bg-white rounded-2xl shadow-sm">
                {transactions.map((transaction, index) => (
                  <TouchableOpacity
                    key={transaction.id}
                    className={`flex-row items-center p-4 ${
                      index !== transactions.length - 1 ? 'border-b border-gray-100' : ''
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
                        {transaction.category} • {transaction.time}
                      </Text>
                    </View>
                    
                    <View className="items-end">
                      <Text className={`font-bold text-base ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                      </Text>
                      <Text className="text-gray-400 text-xs">
                        {transaction.type}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))
        )}
        
        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transactions;