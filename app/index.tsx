import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const GetStarted: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace('../(dashboard)/dashboard'); 
    }
  }, [user, loading]);

  const onboardingData = [
    {
      id: 1,
      title: 'Track Your Expenses',
      subtitle: 'Effortlessly',
      description: 'Monitor your spending habits and keep track of every transaction with our intuitive interface.',
      emoji: '💰',
      color: 'bg-gray-800',
    },
    {
      id: 2,
      title: 'Smart Budget',
      subtitle: 'Planning',
      description: 'Set budgets for different categories and get notifications when you\'re close to your limits.',
      emoji: '🎯',
      color: 'bg-blue-600',
    },
    {
      id: 3,
      title: 'Insightful',
      subtitle: 'Analytics',
      description: 'Get detailed insights about your spending patterns with beautiful charts and reports.',
      emoji: '📊',
      color: 'bg-purple-600',
    },
  ];

  const handleNext = () => {
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGetStarted = () => {
    // Navigate to login screen
    router.push('/(auth)/login');
  };

  const handleSkip = () => {
    // Skip to last slide
    setCurrentSlide(onboardingData.length - 1);
  };

  // Show loading indicator while checking auth
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#1F2937" />
        <Text className="text-gray-600 mt-4 text-lg">Loading...</Text>
      </SafeAreaView>
    );
  }

  const currentData = onboardingData[currentSlide];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Skip Button */}
      <View className={`flex-row justify-end px-6 pt-4 mt-4 ${currentSlide === onboardingData.length - 1 ? 'opacity-0' : ''}`}>
        <TouchableOpacity 
          onPress={handleSkip} 
          className="py-2 px-4 bg-gray-800 rounded-full"
          disabled={currentSlide === onboardingData.length - 1}
        >
          <Text className="text-white font-semibold text-sm">Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Main Content */}
        <View className="flex-1 items-center justify-center px-6 py-8">
          {/* App Logo/Name */}
          <View className="mb-12">
            <Text className="text-4xl font-bold text-gray-800 text-center">
              Spendify
            </Text>
            <Text className="text-lg text-gray-500 text-center mt-2">
              Smart Expense Management
            </Text>
          </View>

          {/* Illustration Card */}
          <View className={`${currentData.color} rounded-3xl p-8 mb-12 shadow-lg h-96 w-full max-w-md`}>
            <View className="items-center">
              <Text className="text-8xl mb-4">{currentData.emoji}</Text>
              <View className="bg-white/20 rounded-2xl px-6 py-4">
                <Text className="text-white text-2xl font-bold text-center">
                  {currentData.title}
                </Text>
                <Text className="text-white/90 text-2xl font-light text-center">
                  {currentData.subtitle}
                </Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View className="mb-12">
            <Text className="text-gray-500 text-lg text-center leading-7 h-24 px-4">
              {currentData.description}
            </Text>
          </View>

          {/* Page Indicators */}
          <View className="flex-row items-center mb-12">
            {onboardingData.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full mx-2 ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="px-6 pb-6 mb-4">
        {currentSlide === onboardingData.length - 1 ? (
          // Get Started Button (Last Slide)
          <TouchableOpacity
            onPress={handleGetStarted}
            className="bg-gray-800 rounded-2xl py-4 px-8 shadow-lg"
          >
            <Text className="text-white text-lg font-bold text-center">
              Get Started
            </Text>
          </TouchableOpacity>
        ) : (
          // Navigation Buttons
          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              onPress={handlePrevious}
              className={`py-4 px-8 rounded-2xl ${
                currentSlide === 0 ? 'opacity-50' : 'bg-gray-100'
              }`}
              disabled={currentSlide === 0}
            >
              <Text className="text-gray-700 font-semibold">Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              className="bg-gray-800 py-4 px-8 rounded-2xl shadow-lg"
            >
              <Text className="text-white font-semibold">Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;