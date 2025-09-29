import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
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

const EditProfile: React.FC = () => {
  const router = useRouter();
  
  // Initial user data (would typically come from state management or API)
  const [userData, setUserData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    address: '123 Main Street, City, State 12345',
    occupation: 'Software Developer',
    monthlyIncome: '8500',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: keyof typeof userData, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Profile Updated',
        'Your profile has been successfully updated.',
        [
          {
            text: 'OK',
            onPress: () => {
              setHasChanges(false);
              router.back();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        'Discard Changes',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          { 
            text: 'Discard', 
            style: 'destructive',
            onPress: () => router.back()
          }
        ]
      );
    } else {
      router.back();
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete Account', 
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Account Deleted',
              'Your account has been successfully deleted.',
              [{ text: 'OK', onPress: () => console.log('Navigate to login') }]
            );
          }
        }
      ]
    );
  };

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount.replace(/[^0-9.-]+/g, ''));
    return isNaN(num) ? '' : num.toLocaleString();
  };

  function handleChangePassword(): void {
    router.push('/(profile)/changePassword')
  }

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
            <Text className="text-gray-700 font-semibold text-sm">Cancel</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Edit Profile</Text>
          <TouchableOpacity 
            onPress={handleSave} 
            disabled={!hasChanges || isLoading}
            className={`py-2 px-4 rounded-full ${
              hasChanges && !isLoading ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <Text className={`font-semibold text-sm ${
              hasChanges && !isLoading ? 'text-white' : 'text-gray-500'
            }`}>
              {isLoading ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          className="flex-1 px-6" 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Picture Section */}
          <View className="items-center mb-8">
            <View className="bg-gray-800 rounded-full p-6 mb-4">
              <Text className="text-4xl">👤</Text>
            </View>
            <TouchableOpacity className="bg-blue-600 rounded-full px-4 py-2">
              <Text className="text-white font-semibold text-sm">Change Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Personal Information */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <Text className="text-gray-800 font-bold text-lg mb-4">Personal Information</Text>
            
            {/* Full Name */}
            <View className="mb-4">
              <Text className="text-gray-700 text-sm font-semibold mb-2">Full Name</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-800 font-medium"
                placeholder="Enter your full name"
                value={userData.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
                autoCapitalize="words"
              />
            </View>

            {/* Email */}
            <View className="mb-4">
              <Text className="text-gray-700 text-sm font-semibold mb-2">Email Address</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-800 font-medium"
                placeholder="Enter your email"
                value={userData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Phone */}
            <View className="mb-4">
              <Text className="text-gray-700 text-sm font-semibold mb-2">Phone Number</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-800 font-medium"
                placeholder="Enter your phone number"
                value={userData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
              />
            </View>

            {/* Date of Birth */}
            <View className="mb-0">
              <Text className="text-gray-700 text-sm font-semibold mb-2">Date of Birth</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-800 font-medium"
                placeholder="YYYY-MM-DD"
                value={userData.dateOfBirth}
                onChangeText={(value) => handleInputChange('dateOfBirth', value)}
              />
            </View>
          </View>

          {/* Address Information */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <Text className="text-gray-800 font-bold text-lg mb-4">Address Information</Text>
            
            <View className="mb-0">
              <Text className="text-gray-700 text-sm font-semibold mb-2">Home Address</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-800 font-medium h-20"
                placeholder="Enter your address"
                value={userData.address}
                onChangeText={(value) => handleInputChange('address', value)}
                multiline={true}
                textAlignVertical="top"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Financial Information */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <Text className="text-gray-800 font-bold text-lg mb-4">Financial Information</Text>
            
            {/* Occupation */}
            <View className="mb-4">
              <Text className="text-gray-700 text-sm font-semibold mb-2">Occupation</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-800 font-medium"
                placeholder="Enter your occupation"
                value={userData.occupation}
                onChangeText={(value) => handleInputChange('occupation', value)}
                autoCapitalize="words"
              />
            </View>

            {/* Monthly Income */}
            <View className="mb-0">
              <Text className="text-gray-700 text-sm font-semibold mb-2">Monthly Income (USD)</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-800 font-medium"
                placeholder="Enter your monthly income"
                value={userData.monthlyIncome}
                onChangeText={(value) => handleInputChange('monthlyIncome', value.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Account Actions */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-8">
            <Text className="text-gray-800 font-bold text-lg mb-4">Account Actions</Text>
            
            <TouchableOpacity 
            onPress={handleChangePassword}
            className="bg-blue-100 rounded-xl p-4 mb-3">
              <View className="flex-row items-center">
                <View className="bg-blue-500 rounded-full p-2 mr-3">
                  <Text className="text-lg">🔒</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold">Change Password</Text>
                  <Text className="text-gray-500 text-sm">Update your account password</Text>
                </View>
                <Text className="text-gray-400 text-lg">›</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-green-100 rounded-xl p-4 mb-3">
              <View className="flex-row items-center">
                <View className="bg-green-500 rounded-full p-2 mr-3">
                  <Text className="text-lg">📤</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold">Export Data</Text>
                  <Text className="text-gray-500 text-sm">Download your transaction data</Text>
                </View>
                <Text className="text-gray-400 text-lg">›</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleDeleteAccount}
              className="bg-red-100 rounded-xl p-4"
            >
              <View className="flex-row items-center">
                <View className="bg-red-500 rounded-full p-2 mr-3">
                  <Text className="text-lg">🗑️</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-red-600 font-semibold">Delete Account</Text>
                  <Text className="text-red-400 text-sm">Permanently remove your account</Text>
                </View>
                <Text className="text-red-400 text-lg">›</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;