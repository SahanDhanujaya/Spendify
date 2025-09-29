import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";
import "../global.css";

const _layout = () => {
  return (
    <View className="flex-1 mt-1 ">
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </View>
  );
};

export default _layout;
