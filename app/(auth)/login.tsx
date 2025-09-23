import { login } from "@/services/userService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsLoading(true);
    login({ email, password })
      .then(() => {
        setIsLoading(false);
        clearFields();
        Alert.alert("Login Successful", "You have logged in successfully!");
        router.push("../../(dashboard)/dashboard");
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert("Login Error", error?.message || String(error));
      });
  };

  const handleForgotPassword = () => {
    console.log("Forgot password pressed");
  };

  const handleSignUp = () => {
    router.push("/(auth)/register");
  };

  const handleBackToOnboarding = () => {
    router.back();
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header with Back Button */}
        <View className="flex-row justify-between items-center px-6 pt-4 mt-4">
          <TouchableOpacity
            onPress={handleBackToOnboarding}
            className="py-2 px-4 bg-gray-100 rounded-full"
          >
            <Text className="text-gray-700 font-semibold text-sm">← Back</Text>
          </TouchableOpacity>
          <View className="opacity-0">
            <Text className="text-sm">Placeholder</Text>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Main Content */}
          <View className="flex-1 items-center px-6 py-8">
            {/* App Logo/Name */}
            <View className="mb-12">
              <Text className="text-4xl font-bold text-gray-800 text-center">
                Spendify
              </Text>
              <Text className="text-lg text-gray-500 text-center mt-2">
                Welcome Back
              </Text>
            </View>

            {/* Login Illustration Card */}
            <ImageBackground
                source={require("../../assets/images/sign-page-abstract-concept-illustration_335657-3875.jpg")}
                resizeMode="cover"
                className="mb-12 w-full max-w-md h-96 rounded-3xl overflow-hidden"
            >
            </ImageBackground>
            {/* Form Container */}
            <View className="w-full max-w-md">
              {/* Email Input */}
              <View className="mb-6">
                <Text className="text-gray-700 text-sm font-semibold mb-3 px-1">
                  Email Address
                </Text>
                <TextInput
                  className="bg-gray-100 rounded-2xl px-6 py-4 text-base text-gray-800 font-medium"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View className="mb-4">
                <Text className="text-gray-700 text-sm font-semibold mb-3 px-1">
                  Password
                </Text>
                <View className="flex-row bg-gray-100 rounded-2xl items-center">
                  <TextInput
                    className="flex-1 px-6 py-4 text-base text-gray-800 font-medium"
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    className="px-6 py-4"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Text className="text-xl">
                      {isPasswordVisible ? "👁️" : "👁️‍🗨️"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity
                className="items-end mb-8"
                onPress={handleForgotPassword}
              >
                <Text className="text-blue-600 text-sm font-semibold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                className="bg-gray-800 rounded-2xl py-4 px-8 shadow-lg mb-6"
                onPress={handleLogin}
              >
                <Text className="text-white text-lg font-bold text-center">
                  Sign In
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="text-gray-500 px-4 text-sm font-medium">
                  or continue with
                </Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              {/* Social Login Buttons */}
               
                <TouchableOpacity className=" flex-row bg-gray-100 rounded-2xl py-4 px-6 justify-center items-center mb-8 shadow-sm">
                 <Image
                  source={require("../../assets/icons/icons8-google-48.png")}
                  style={{ width: 24, height: 24, marginRight: 8 }}
                />
                <Text className="text-gray-700 text-base font-semibold text-center">
                Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row justify-center bg-gray-100 rounded-2xl py-4 px-6 items-center mb-8 shadow-sm">
                <Image
                  source={require("../../assets/icons/icons8-apple-50.png")}
                  style={{ width: 24, height: 24, marginRight: 8 }}
                />
                <Text className="text-gray-700 text-base font-semibold text-center">
                  Apple
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {/* Bottom Sign Up Link */}
        <View className="px-6 pb-6 mb-4">
          <View className="flex-row justify-center items-center bg-gray-50 rounded-2xl py-4">
            <Text className="text-gray-500 text-base font-medium">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text className="text-blue-600 text-base font-bold ml-2">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
