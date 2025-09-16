import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <Text className="text-4xl font-bold text-white mb-4 text-center">
        Welcome to Spendify
      </Text>
      
      <Text className="text-lg text-gray-300 text-center mb-12 leading-relaxed">
        Take control of your finances with smart expense tracking and budget management.
      </Text>
      
      <TouchableOpacity className="bg-white px-8 py-4 rounded-2xl mb-4 w-full max-w-xs">
        <Text className="text-black text-lg font-bold text-center">
          Get Started
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="border-2 border-white px-8 py-4 rounded-2xl w-full max-w-xs">
        <Text className="text-white text-lg font-semibold text-center">
          Learn More
        </Text>
      </TouchableOpacity>
      
      <View className="mt-16">
        <Text className="text-gray-400 text-center text-sm">
          Simple • Secure • Smart
        </Text>
      </View>
    </View>
  );
};

export default Home;