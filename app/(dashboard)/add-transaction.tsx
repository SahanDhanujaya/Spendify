import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const AddTransaction: React.FC = () => {
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('Today');
  const router = useRouter();

  const expenseCategories = [
    { id: 'food', name: 'Food', icon: '🍕', color: 'bg-orange-500' },
    { id: 'transport', name: 'Transport', icon: '🚗', color: 'bg-blue-500' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'bg-purple-500' },
    { id: 'bills', name: 'Bills', icon: '💡', color: 'bg-yellow-500' },
    { id: 'health', name: 'Health', icon: '🏥', color: 'bg-red-500' },
    { id: 'entertainment', name: 'Fun', icon: '🎮', color: 'bg-pink-500' },
    { id: 'education', name: 'Education', icon: '📚', color: 'bg-indigo-500' },
    { id: 'other', name: 'Other', icon: '📦', color: 'bg-gray-500' },
  ];

  const incomeCategories = [
    { id: 'salary', name: 'Salary', icon: '💰', color: 'bg-green-500' },
    { id: 'freelance', name: 'Freelance', icon: '💻', color: 'bg-blue-500' },
    { id: 'investment', name: 'Investment', icon: '📈', color: 'bg-purple-500' },
    { id: 'gift', name: 'Gift', icon: '🎁', color: 'bg-pink-500' },
    { id: 'other', name: 'Other', icon: '💵', color: 'bg-gray-500' },
  ];

  const quickAmounts = ['10', '25', '50', '100', '250', '500'];
  const dateOptions = ['Today', 'Yesterday', '2 days ago', 'Custom'];

  const categories = transactionType === 'expense' ? expenseCategories : incomeCategories;

  const handleSave = () => {
    // Handle save transaction logic
    console.log('Transaction saved:', {
      type: transactionType,
      amount,
      title,
      category: selectedCategory,
      description,
      date: selectedDate,
    });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const handleQuickAmount = (quickAmount: string) => {
    setAmount(quickAmount);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-4 mb-6">
          <TouchableOpacity onPress={handleCancel} className="py-2 px-4 bg-white rounded-full shadow-sm">
            <Text className="text-gray-700 font-semibold text-sm">✕ Cancel</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Add Transaction</Text>
          <TouchableOpacity onPress={handleSave} className="py-2 px-4 bg-gray-800 rounded-full">
            <Text className="text-white font-semibold text-sm">Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          className="flex-1 px-6" 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Transaction Type Toggle */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <Text className="text-gray-800 font-bold text-lg mb-4">Transaction Type</Text>
            <View className="flex-row bg-gray-100 rounded-xl p-2">
              <TouchableOpacity
                className={`flex-1 py-3 px-4 rounded-lg ${
                  transactionType === 'expense' ? 'bg-red-700' : ''
                }`}
                onPress={() => {
                  setTransactionType('expense');
                  setSelectedCategory('');
                }}
              >
                <Text className={`text-center font-semibold ${
                  transactionType === 'expense' ? 'text-white' : 'text-gray-600'
                }`}>
                  📉 Expense
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className={`flex-1 py-3 px-4 rounded-lg ${
                  transactionType === 'income' ? 'bg-green-700' : ''
                }`}
                onPress={() => {
                  setTransactionType('income');
                  setSelectedCategory('');
                }}
              >
                <Text className={`text-center font-semibold ${
                  transactionType === 'income' ? 'text-white' : 'text-gray-600'
                }`}>
                  📈 Income
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Amount Input */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <Text className="text-gray-800 font-bold text-lg mb-4">Amount</Text>
            <View className="items-center mb-4">
              <TextInput
                className="text-4xl font-bold text-gray-800 text-center w-full"
                placeholder="$0.00"
                placeholderTextColor="#9CA3AF"
                value={amount ? `$${amount}` : ''}
                onChangeText={(text) => setAmount(text.replace('$', ''))}
                keyboardType="numeric"
                autoFocus={true}
              />
            </View>
            
            {/* Quick Amount Buttons */}
            <View className="flex-row flex-wrap justify-center">
              {quickAmounts.map((quickAmount) => (
                <TouchableOpacity
                  key={quickAmount}
                  onPress={() => handleQuickAmount(quickAmount)}
                  className="bg-gray-100 rounded-full px-4 py-2 m-1"
                >
                  <Text className="text-gray-700 font-medium">${quickAmount}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Category Selection */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <Text className="text-gray-800 font-bold text-lg mb-4">Category</Text>
            <View className="flex-row flex-wrap justify-between">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  className={`items-center p-3 rounded-2xl mb-3 ${
                    selectedCategory === category.id ? category.color : 'bg-gray-100'
                  }`}
                  style={{ width: '22%' }}
                >
                  <Text className="text-2xl mb-1">{category.icon}</Text>
                  <Text className={`text-xs font-medium text-center ${
                    selectedCategory === category.id ? 'text-white' : 'text-gray-700'
                  }`}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Title Input */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <Text className="text-gray-800 font-bold text-lg mb-3">Title</Text>
            <TextInput
              className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-800 font-medium"
              placeholder="Enter transaction title"
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
              autoCapitalize="sentences"
            />
          </View>

          {/* Date Selection */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <Text className="text-gray-800 font-bold text-lg mb-4">Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row space-x-3">
                {dateOptions.map((date) => (
                  <TouchableOpacity
                    key={date}
                    onPress={() => setSelectedDate(date)}
                    className={`px-4 py-2 rounded-full ${
                      selectedDate === date ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  >
                    <Text className={`font-semibold ${
                      selectedDate === date ? 'text-white' : 'text-gray-600'
                    }`}>
                      {date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Description Input */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-8">
            <Text className="text-gray-800 font-bold text-lg mb-3">Description (Optional)</Text>
            <TextInput
              className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-800 font-medium h-20"
              placeholder="Add a note about this transaction..."
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              multiline={true}
              textAlignVertical="top"
              autoCapitalize="sentences"
            />
          </View>
        </ScrollView>

        {/* Save Button */}
        <View className="px-6 pb-6">
          <TouchableOpacity 
            className={`rounded-2xl py-4 shadow-lg ${
              transactionType === 'expense' ? 'bg-red-700' : 'bg-green-700'
            }`}
            onPress={handleSave}
          >
            <Text className="text-white text-lg font-bold text-center">
              {transactionType === 'expense' ? '📉 Add Expense' : '📈 Add Income'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddTransaction;