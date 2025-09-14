import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-3xl font-bold text-gray-900 mb-3">
        Welcome to Spendify
      </Text>

      <Text className="text-base text-gray-600 text-center mb-8">
        Track your expenses and manage your budget with ease.
      </Text>

      <TouchableOpacity className="bg-green-500 px-6 py-3 rounded-xl">
        <Text className="text-white text-lg font-semibold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
