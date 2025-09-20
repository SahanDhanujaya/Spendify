import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BarChart,
  LineChart,
  PieChart,
} from 'react-native-chart-kit';

const { width: screenWidth } = Dimensions.get('window');

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [selectedChart, setSelectedChart] = useState('spending');

  // Sample analytics data
  const monthlyData = [
    { month: 'Jan', income: 8500, expenses: 3200, savings: 5300 },
    { month: 'Feb', income: 8200, expenses: 3800, savings: 4400 },
    { month: 'Mar', income: 8800, expenses: 3500, savings: 5300 },
    { month: 'Apr', income: 9000, expenses: 3079, savings: 5921 },
    { month: 'May', income: 8500, expenses: 2900, savings: 5600 },
    { month: 'Jun', income: 8700, expenses: 3200, savings: 5500 },
  ];

  const weeklySpending = [
    { week: 'Week 1', amount: 580 },
    { week: 'Week 2', amount: 720 },
    { week: 'Week 3', amount: 650 },
    { week: 'Week 4', amount: 890 },
  ];

  const categorySpending = [
    { 
      name: 'Food',
      population: 450.20,
      color: '#F97316',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
      percentage: 28 
    },
    { 
      name: 'Transport',
      population: 180.50,
      color: '#3B82F6',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
      percentage: 11 
    },
    { 
      name: 'Shopping',
      population: 320.80,
      color: '#8B5CF6',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
      percentage: 20 
    },
    { 
      name: 'Bills',
      population: 650.00,
      color: '#EAB308',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
      percentage: 41 
    },
  ];

  const topExpenses = [
    { title: 'Rent Payment', amount: 1200.00, category: 'Bills', date: 'Monthly', trend: '0%' },
    { title: 'Grocery Shopping', amount: 450.20, category: 'Food', date: 'This Month', trend: '+12%' },
    { title: 'Car Insurance', amount: 180.50, category: 'Transport', date: 'Monthly', trend: '-5%' },
    { title: 'Shopping', amount: 320.80, category: 'Lifestyle', date: 'This Month', trend: '+25%' },
  ];

  const periods = ['This Week', 'This Month', 'This Year'];
  const chartTypes = [
    { id: 'spending', title: 'Spending Trends', icon: '📊' },
    { id: 'income', title: 'Income vs Expenses', icon: '💹' },
    { id: 'categories', title: 'Category Breakdown', icon: '🥧' },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getSpendingInsight = () => {
    const thisMonth = monthlyData[monthlyData.length - 1];
    const lastMonth = monthlyData[monthlyData.length - 2];
    const difference = thisMonth.expenses - lastMonth.expenses;
    const percentage = ((difference / lastMonth.expenses) * 100).toFixed(1);
    
    return {
      difference,
      percentage,
      trend: difference > 0 ? 'increased' : 'decreased'
    };
  };

  const insight = getSpendingInsight();

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
  };

  const incomeExpenseChartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1, dataset) => {
      if (dataset && dataset.key === 'income') {
        return `rgba(16, 185, 129, ${opacity})`;
      }
      return `rgba(239, 68, 68, ${opacity})`;
    },
    strokeWidth: 3,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'spending':
        return (
          <View className="mb-4">
            <BarChart
              data={{
                labels: weeklySpending.map(item => item.week),
                datasets: [{
                  data: weeklySpending.map(item => item.amount),
                  color: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`,
                }]
              }}
              width={screenWidth - 48}
              height={220}
              chartConfig={chartConfig}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        );
      case 'income':
        return (
          <View className="mb-4">
            <LineChart
              data={{
                labels: monthlyData.map(item => item.month),
                datasets: [
                  {
                    data: monthlyData.map(item => item.income),
                    key: 'income',
                    color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                    strokeWidth: 3,
                  },
                  {
                    data: monthlyData.map(item => item.expenses),
                    key: 'expenses', 
                    color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
                    strokeWidth: 3,
                  }
                ]
              }}
              width={screenWidth - 48}
              height={220}
              chartConfig={incomeExpenseChartConfig}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        );
      case 'categories':
        return (
          <View className="mb-4">
            <PieChart
              data={categorySpending}
              width={screenWidth - 48}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View className="px-6 pt-4 mb-6">
        <Text className="text-2xl font-bold text-gray-800 mb-2">Analytics</Text>
        <Text className="text-gray-500 text-base">Insights into your spending patterns</Text>

        {/* Period Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
          <View className="flex-row space-x-3">
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                onPress={() => setSelectedPeriod(period)}
                className={`px-4 py-2 mr-1 rounded-full ${
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
        {/* Quick Stats */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <Text className="text-gray-800 font-bold text-lg mb-4">Quick Insights</Text>
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <View className="bg-blue-100 rounded-full p-3 mb-2">
                  <Text className="text-2xl">💰</Text>
                </View>
                <Text className="text-gray-600 text-sm">Avg Daily</Text>
                <Text className="text-gray-800 font-bold text-lg">{formatCurrency(102.65)}</Text>
              </View>
              
              <View className="items-center flex-1">
                <View className="bg-green-100 rounded-full p-3 mb-2">
                  <Text className="text-2xl">📈</Text>
                </View>
                <Text className="text-gray-600 text-sm">Best Day</Text>
                <Text className="text-gray-800 font-bold text-lg">Monday</Text>
              </View>
              
              <View className="items-center flex-1">
                <View className="bg-red-100 rounded-full p-3 mb-2">
                  <Text className="text-2xl">📉</Text>
                </View>
                <Text className="text-gray-600 text-sm">Highest</Text>
                <Text className="text-gray-800 font-bold text-lg">{formatCurrency(890)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Spending Insight Card */}
        <View className="px-6 mb-6">
          <View className="bg-blue-600 rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Text className="text-2xl mr-2">💡</Text>
              <Text className="text-white font-bold text-lg">Monthly Insight</Text>
            </View>
            <Text className="text-white text-sm leading-6" style={{ opacity: 0.9 }}>
              Your spending has {insight.trend} by {formatCurrency(Math.abs(insight.difference))} ({Math.abs(parseFloat(insight.percentage))}%) compared to last month. 
              {insight.trend === 'decreased' ? ' Great job saving!' : ' Consider reviewing your budget.'}
            </Text>
          </View>
        </View>

        {/* Chart Selection */}
        <View className="px-6 mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3">
              {chartTypes.map((chart) => (
                <TouchableOpacity
                  key={chart.id}
                  onPress={() => setSelectedChart(chart.id)}
                  className={`flex-row items-center px-4 py-2 rounded-full ${
                    selectedChart === chart.id ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <Text className="mr-2">{chart.icon}</Text>
                  <Text
                    className={`font-semibold ${
                      selectedChart === chart.id ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {chart.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Chart Display */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <Text className="text-gray-800 font-bold text-lg mb-4">
              {chartTypes.find(c => c.id === selectedChart)?.title}
            </Text>
            <View className="items-center">
              {renderChart()}
            </View>
            
            {/* Chart Legend/Info */}
            {selectedChart === 'income' && (
              <View className="flex-row justify-center mt-4 space-x-6">
                <View className="flex-row items-center">
                  <View className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                  <Text className="text-gray-600 text-sm">Income</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                  <Text className="text-gray-600 text-sm">Expenses</Text>
                </View>
              </View>
            )}
            
            {selectedChart === 'categories' && (
              <View className="mt-4">
                {categorySpending.map((category, index) => (
                  <View key={index} className="flex-row justify-between items-center py-2">
                    <View className="flex-row items-center">
                      <View 
                        className="w-4 h-4 rounded-full mr-3" 
                        style={{ backgroundColor: category.color }}
                      />
                      <Text className="text-gray-700 font-medium">{category.name}</Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-gray-800 font-semibold">
                        {formatCurrency(category.population)}
                      </Text>
                      <Text className="text-gray-500 text-xs">
                        {category.percentage}%
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Top Expenses */}
        <View className="px-6 mb-8">
          <Text className="text-gray-800 font-bold text-xl mb-4">Top Expenses</Text>
          <View className="bg-white rounded-2xl shadow-sm">
            {topExpenses.map((expense, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center justify-between p-4 ${
                  index !== topExpenses.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold text-base">
                    {expense.title}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {expense.category} • {expense.date}
                  </Text>
                </View>
                
                <View className="items-end">
                  <Text className="text-gray-800 font-bold text-base">
                    {formatCurrency(expense.amount)}
                  </Text>
                  <Text className={`text-sm font-medium ${
                    expense.trend.startsWith('+') ? 'text-red-500' : 
                    expense.trend.startsWith('-') ? 'text-green-500' : 'text-gray-500'
                  }`}>
                    {expense.trend}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytics;