import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
  // Define your expense management tabs
  const tabItems = [
    { name: "dashboard", title: "Dashboard", icon: "dashboard" },
    { name: "transactions", title: "Transactions", icon: "receipt-long" },
    { name: "add-transaction", title: "Add", icon: "add-circle-outline" },
    { name: "analytics", title: "Analytics", icon: "analytics" },
    { name: "profile", title: "Profile", icon: "account-circle" }
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <Tabs 
        screenOptions={{ 
          tabBarActiveTintColor: "#1F2937", // Gray-800 to match your app theme
          tabBarInactiveTintColor: "#9CA3AF", // Gray-400 for inactive tabs
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF", // White background
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB", // Gray-200 border
            paddingBottom: 8,
            paddingTop: 8,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginTop: 4,
          },
          tabBarIconStyle: {
            marginBottom: 2,
          }
        }}
      >
        {tabItems.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, size, focused }) => (
                <View className={`items-center justify-center ${
                  tab.name === "add-transaction" 
                    ? "bg-gray-800 rounded-full shadow-lg" 
                    : ""
                }`}>
                  <MaterialIcons 
                    name={tab.icon as any} 
                    size={tab.name === "add-transaction" ? 28 : size} 
                    color={tab.name === "add-transaction" ? "#FFFFFF" : color}
                  />
                </View>
              ),
              tabBarLabel: tab.name === "add-transaction" ? "" : tab.title,
              ...(tab.name === "add-transaction" && {
                tabBarIconStyle: {
                  marginTop: 0,
                }
              })
            }}
          />
        ))}
      </Tabs>
    </View>
  );
}