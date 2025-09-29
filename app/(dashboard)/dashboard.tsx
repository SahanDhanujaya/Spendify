import { useAuth } from '@/context/AuthContext';
import { getRecentTransactions } from '@/services/transactionService';
import { Transactions } from '@/types/transaction';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  // Sample data
  const totalBalance = 5420.50;
  const monthlyIncome = 8500.00;
  const monthlyExpenses = 3079.50;
  const savingsGoal = 2000.00;
  const currentSavings = 1340.50;
  const [recentlyTransactions, setRecentlyTransactions] = useState<Transactions[]>([]);

  const recentTransactions = [
    { id: 1, title: 'Grocery Shopping', category: 'Food', amount: -85.50, date: 'Today', icon: '🛒', color: 'bg-red-100' },
    { id: 2, title: 'Salary Deposit', category: 'Income', amount: 3500.00, date: 'Yesterday', icon: '💰', color: 'bg-green-100' },
    { id: 3, title: 'Coffee Shop', category: 'Food', amount: -12.30, date: 'Yesterday', icon: '☕', color: 'bg-red-100' },
    { id: 4, title: 'Gas Station', category: 'Transport', amount: -45.00, date: '2 days ago', icon: '⛽', color: 'bg-red-100' },
    { id: 5, title: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, date: '3 days ago', icon: '📺', color: 'bg-red-100' },
  ];

  const categories = [
    { name: 'Food', spent: 450.20, budget: 600, icon: '🍕', color: 'bg-orange-500' },
    { name: 'Transport', spent: 180.50, budget: 300, icon: '🚗', color: 'bg-blue-500' },
    { name: 'Shopping', spent: 320.80, budget: 400, icon: '🛍️', color: 'bg-purple-500' },
    { name: 'Bills', spent: 650.00, budget: 800, icon: '💡', color: 'bg-yellow-500' },
  ];

  const periods = ['This Week', 'This Month', 'This Year'];
  const auth = useAuth();

  useEffect(()=> {
    const result = getRecentTransactions();
    result.then((res) => {
      res.map((re)=> {
        const tran: Transactions = {
          id: re.id,
          title: re.title,
          category: re.category,
          amount: re.type === "income" ? re.amount : -1 * re.amount,
          date: re.date,
          icon: re.type === "income" ? "💰" : "💸",
          color: re.type === "income" ? "bg-green-100" : "bg-red-100",
          type: re.type,
          description: re.description
        }
        setRecentlyTransactions(prev => [...prev, tran]);
      });
    });
  },[])
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getProgressPercentage = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 py-4">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View className="px-6 pt-4 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-2xl font-bold text-gray-800">Good Morning!</Text>
            <Text className="text-gray-500 text-base">{auth.user?.email}</Text>
          </View>
          <TouchableOpacity className="bg-white rounded-full p-3 shadow-sm">
            <Image
            source={require('../../assets/profile/WhatsApp Image 2025-08-28 at 13.37.33_97bcc532.jpg')}
            className='w-16 h-16 rounded-full'
            />
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
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

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View className="px-6 mb-6">
          <View className="bg-gray-800 rounded-3xl p-6 shadow-lg">
            <View className="items-center mb-4">
              <Text className="text-white/70 text-base font-medium">Total Balance</Text>
              <Text className="text-white text-4xl font-bold mt-2">
                {formatCurrency(totalBalance)}
              </Text>
            </View>
            
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <View className="bg-green-500/20 rounded-full p-2 mb-2">
                  <Text className="text-xl">📈</Text>
                </View>
                <Text className="text-white/70 text-sm">Income</Text>
                <Text className="text-white font-bold text-lg">
                  {formatCurrency(monthlyIncome)}
                </Text>
              </View>
              
              <View className="items-center flex-1">
                <View className="bg-red-500/20 rounded-full p-2 mb-2">
                  <Text className="text-xl">📉</Text>
                </View>
                <Text className="text-white/70 text-sm">Expenses</Text>
                <Text className="text-white font-bold text-lg">
                  {formatCurrency(monthlyExpenses)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Savings Goal */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-800 font-bold text-lg">💎 Savings Goal</Text>
              <Text className="text-gray-500 text-sm">
                {Math.round((currentSavings / savingsGoal) * 100)}%
              </Text>
            </View>
            
            <View className="bg-gray-200 rounded-full h-3 mb-3">
              <View 
                className="bg-blue-500 rounded-full h-3"
                style={{ width: `${(currentSavings / savingsGoal) * 100}%` }}
              />
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">
                {formatCurrency(currentSavings)} saved
              </Text>
              <Text className="text-gray-600 text-sm">
                Goal: {formatCurrency(savingsGoal)}
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
              <View key={index} className="bg-white rounded-2xl p-4 shadow-sm mb-4" style={{ width: '48%' }}>
                <View className="flex-row items-center mb-3">
                  <View className={`${category.color} rounded-full p-2 mr-3`}>
                    <Text className="text-white text-lg">{category.icon}</Text>
                  </View>
                  <Text className="text-gray-800 font-semibold flex-1">{category.name}</Text>
                </View>
                
                <View className="bg-gray-200 rounded-full h-2 mb-2">
                  <View 
                    className={`${category.color} rounded-full h-2`}
                    style={{ width: `${getProgressPercentage(category.spent, category.budget)}%` }}
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
            <Text className="text-gray-800 font-bold text-xl">Recent Transactions</Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-semibold">View All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="bg-white rounded-2xl shadow-sm">
            {recentlyTransactions.map((transaction, index) => (
              <TouchableOpacity 
                key={index}
                className={`flex-row items-center p-4 ${
                  index !== recentTransactions.length - 1 ? 'border-b border-gray-100' : ''
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
                
                <Text className={`font-bold text-base ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
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