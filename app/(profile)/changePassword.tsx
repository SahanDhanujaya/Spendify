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
  Alert,
} from 'react-native';

const ChangePassword: React.FC = () => {
  const router = useRouter();
  
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (field: keyof typeof passwords, value: string) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));

    // Calculate password strength for new password
    if (field === 'newPassword') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 15;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = (strength: number): string => {
    if (strength < 30) return '#EF4444'; // Red
    if (strength < 60) return '#F59E0B'; // Orange
    if (strength < 80) return '#EAB308'; // Yellow
    return '#10B981'; // Green
  };

  const getPasswordStrengthText = (strength: number): string => {
    if (strength < 30) return 'Weak';
    if (strength < 60) return 'Fair';
    if (strength < 80) return 'Good';
    return 'Strong';
  };

  const validatePasswords = (): { isValid: boolean; error?: string } => {
    if (!passwords.currentPassword) {
      return { isValid: false, error: 'Please enter your current password' };
    }

    if (!passwords.newPassword) {
      return { isValid: false, error: 'Please enter a new password' };
    }

    if (passwords.newPassword.length < 8) {
      return { isValid: false, error: 'New password must be at least 8 characters long' };
    }

    if (passwords.newPassword === passwords.currentPassword) {
      return { isValid: false, error: 'New password must be different from current password' };
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      return { isValid: false, error: 'New passwords do not match' };
    }

    if (passwordStrength < 30) {
      return { isValid: false, error: 'Password is too weak. Please choose a stronger password' };
    }

    return { isValid: true };
  };

  const handleChangePassword = async () => {
    const validation = validatePasswords();
    
    if (!validation.isValid) {
      Alert.alert('Invalid Password', validation.error);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Password Changed',
        'Your password has been successfully updated. Please use your new password for future logins.',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    const hasChanges = passwords.currentPassword || passwords.newPassword || passwords.confirmPassword;
    
    if (hasChanges) {
      Alert.alert(
        'Discard Changes',
        'Are you sure you want to discard your changes?',
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

  const passwordRequirements = [
    { text: 'At least 8 characters', met: passwords.newPassword.length >= 8 },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(passwords.newPassword) },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(passwords.newPassword) },
    { text: 'Contains number', met: /[0-9]/.test(passwords.newPassword) },
    { text: 'Contains special character', met: /[^A-Za-z0-9]/.test(passwords.newPassword) },
  ];

  const isFormValid = validatePasswords().isValid;

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
          <Text className="text-xl font-bold text-gray-800">Change Password</Text>
          <View className="opacity-0">
            <Text className="text-sm">Placeholder</Text>
          </View>
        </View>

        <ScrollView 
          className="flex-1 px-6" 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Security Info */}
          <View className="bg-blue-100 rounded-2xl p-4 mb-6">
            <View className="flex-row items-center mb-2">
              <View className="bg-blue-500 rounded-full p-2 mr-3">
                <Text className="text-lg">🛡️</Text>
              </View>
              <Text className="text-blue-800 font-bold text-lg">Security Notice</Text>
            </View>
            <Text className="text-blue-700 text-sm leading-6">
              Choose a strong password to keep your financial data secure. Your password should be unique and not used on other accounts.
            </Text>
          </View>

          {/* Password Form */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <Text className="text-gray-800 font-bold text-lg mb-4">Password Information</Text>
            
            {/* Current Password */}
            <View className="mb-4">
              <Text className="text-gray-700 text-sm font-semibold mb-2">Current Password</Text>
              <View className="flex-row bg-gray-100 rounded-xl items-center">
                <TextInput
                  className="flex-1 px-4 py-3 text-base text-gray-800 font-medium"
                  placeholder="Enter your current password"
                  value={passwords.currentPassword}
                  onChangeText={(value) => handlePasswordChange('currentPassword', value)}
                  secureTextEntry={!showPasswords.current}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  className="px-4 py-3"
                  onPress={() => togglePasswordVisibility('current')}
                >
                  <Text className="text-xl">
                    {showPasswords.current ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* New Password */}
            <View className="mb-4">
              <Text className="text-gray-700 text-sm font-semibold mb-2">New Password</Text>
              <View className="flex-row bg-gray-100 rounded-xl items-center">
                <TextInput
                  className="flex-1 px-4 py-3 text-base text-gray-800 font-medium"
                  placeholder="Enter your new password"
                  value={passwords.newPassword}
                  onChangeText={(value) => handlePasswordChange('newPassword', value)}
                  secureTextEntry={!showPasswords.new}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  className="px-4 py-3"
                  onPress={() => togglePasswordVisibility('new')}
                >
                  <Text className="text-xl">
                    {showPasswords.new ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Password Strength Indicator */}
              {passwords.newPassword.length > 0 && (
                <View className="mt-3">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-gray-600 text-sm">Password Strength</Text>
                    <Text 
                      className="text-sm font-semibold"
                      style={{ color: getPasswordStrengthColor(passwordStrength) }}
                    >
                      {getPasswordStrengthText(passwordStrength)}
                    </Text>
                  </View>
                  <View className="bg-gray-200 rounded-full h-2">
                    <View 
                      className="rounded-full h-2"
                      style={{ 
                        width: `${passwordStrength}%`,
                        backgroundColor: getPasswordStrengthColor(passwordStrength)
                      }}
                    />
                  </View>
                </View>
              )}
            </View>

            {/* Confirm Password */}
            <View className="mb-0">
              <Text className="text-gray-700 text-sm font-semibold mb-2">Confirm New Password</Text>
              <View className="flex-row bg-gray-100 rounded-xl items-center">
                <TextInput
                  className="flex-1 px-4 py-3 text-base text-gray-800 font-medium"
                  placeholder="Confirm your new password"
                  value={passwords.confirmPassword}
                  onChangeText={(value) => handlePasswordChange('confirmPassword', value)}
                  secureTextEntry={!showPasswords.confirm}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  className="px-4 py-3"
                  onPress={() => togglePasswordVisibility('confirm')}
                >
                  <Text className="text-xl">
                    {showPasswords.confirm ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Password Requirements */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-8">
            <Text className="text-gray-800 font-bold text-lg mb-4">Password Requirements</Text>
            
            {passwordRequirements.map((requirement, index) => (
              <View key={index} className="flex-row items-center py-2">
                <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${
                  requirement.met ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  <Text className={`text-sm font-bold ${
                    requirement.met ? 'text-white' : 'text-gray-500'
                  }`}>
                    {requirement.met ? '✓' : '•'}
                  </Text>
                </View>
                <Text className={`text-base ${
                  requirement.met ? 'text-green-700' : 'text-gray-600'
                }`}>
                  {requirement.text}
                </Text>
              </View>
            ))}
          </View>

          {/* Change Password Button */}
          <TouchableOpacity 
            onPress={handleChangePassword}
            disabled={!isFormValid || isLoading}
            className={`rounded-2xl py-4 shadow-sm mb-6 ${
              isFormValid && !isLoading ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <Text className={`text-lg font-bold text-center ${
              isFormValid && !isLoading ? 'text-white' : 'text-gray-500'
            }`}>
              {isLoading ? 'Changing Password...' : 'Change Password'}
            </Text>
          </TouchableOpacity>

          {/* Security Tips */}
          <View className="bg-yellow-100 rounded-2xl p-4 mb-8">
            <View className="flex-row items-center mb-2">
              <Text className="text-2xl mr-2">💡</Text>
              <Text className="text-yellow-800 font-bold text-lg">Security Tips</Text>
            </View>
            <View className="space-y-2">
              <Text className="text-yellow-700 text-sm">• Use a unique password for your Spendify account</Text>
              <Text className="text-yellow-700 text-sm">• Consider using a password manager</Text>
              <Text className="text-yellow-700 text-sm">• Enable two-factor authentication if available</Text>
              <Text className="text-yellow-700 text-sm">• Never share your password with others</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePassword;