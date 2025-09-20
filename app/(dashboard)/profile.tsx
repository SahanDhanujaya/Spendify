import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const Profile: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const router = useRouter();

  // Sample user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    joinDate: 'Member since Jan 2024',
    avatar: '👤',
    totalTransactions: 156,
    categoriesUsed: 8,
    avgMonthlySpending: 2450.50
  };

  const menuItems = [
    {
      section: 'Account',
      items: [
        { id: 'edit-profile', title: 'Edit Profile', icon: '✏️', action: () => handleEditProfile() },
        { id: 'change-password', title: 'Change Password', icon: '🔒', action: () => handleChangePassword() },
        { id: 'payment-methods', title: 'Payment Methods', icon: '💳', action: () => handlePaymentMethods() },
      ]
    },
    {
      section: 'Preferences',
      items: [
        { id: 'notifications', title: 'Push Notifications', icon: '🔔', toggle: true, value: notificationsEnabled, onToggle: setNotificationsEnabled },
        { id: 'biometric', title: 'Biometric Login', icon: '👆', toggle: true, value: biometricEnabled, onToggle: setBiometricEnabled },
        { id: 'dark-mode', title: 'Dark Mode', icon: '🌙', toggle: true, value: darkModeEnabled, onToggle: setDarkModeEnabled },
        { id: 'currency', title: 'Currency Settings', icon: '💰', action: () => handleCurrencySettings() },
      ]
    },
    {
      section: 'Data & Privacy',
      items: [
        { id: 'export-data', title: 'Export Data', icon: '📤', action: () => handleExportData() },
        { id: 'backup', title: 'Backup & Sync', icon: '☁️', action: () => handleBackup() },
        { id: 'privacy', title: 'Privacy Policy', icon: '🛡️', action: () => handlePrivacyPolicy() },
      ]
    },
    {
      section: 'Support',
      items: [
        { id: 'help', title: 'Help Center', icon: '❓', action: () => handleHelp() },
        { id: 'feedback', title: 'Send Feedback', icon: '💬', action: () => handleFeedback() },
        { id: 'about', title: 'About Spendify', icon: 'ℹ️', action: () => handleAbout() },
      ]
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Handler functions
  const handleEditProfile = () => {
    router.push('../../(profile)')
  };

  const handleChangePassword = () => {
    router.push('../../(profile)/changePassword')
  };

  const handlePaymentMethods = () => {
    console.log('Payment Methods');
  };

  const handleCurrencySettings = () => {
    console.log('Currency Settings');
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Your transaction data will be exported as a CSV file.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Export confirmed') }
      ]
    );
  };

  const handleBackup = () => {
    console.log('Backup & Sync');
  };

  const handlePrivacyPolicy = () => {
    console.log('Privacy Policy');
  };

  const handleHelp = () => {
    console.log('Help Center');
  };

  const handleFeedback = () => {
    console.log('Send Feedback');
  };

  const handleAbout = () => {
    console.log('About Spendify');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            router.push('../../(auth)/login');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View className="px-6 pt-4 mb-6">
        <Text className="text-2xl font-bold text-gray-800">Profile</Text>
        <Text className="text-gray-500 text-base">Manage your account and preferences</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* User Info Card */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-3xl p-6 shadow-sm">
            <View className="items-center mb-6">
              <View className="bg-gray-800 rounded-full p-6 mb-4">
                <Text className="text-4xl">{userData.avatar}</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-800">{userData.name}</Text>
              <Text className="text-gray-500 text-base mb-2">{userData.email}</Text>
              <Text className="text-gray-400 text-sm">{userData.joinDate}</Text>
            </View>

            {/* Stats Row */}
            <View className="flex-row justify-between pt-4 border-t border-gray-100">
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-gray-800">{userData.totalTransactions}</Text>
                <Text className="text-gray-500 text-sm">Transactions</Text>
              </View>
              
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-gray-800">{userData.categoriesUsed}</Text>
                <Text className="text-gray-500 text-sm">Categories</Text>
              </View>
              
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-gray-800">
                  {formatCurrency(userData.avgMonthlySpending).replace('$', '')}
                </Text>
                <Text className="text-gray-500 text-sm">Avg/Month</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} className="px-6 mb-6">
            <Text className="text-gray-800 font-bold text-lg mb-4">{section.section}</Text>
            
            <View className="bg-white rounded-2xl shadow-sm">
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  className={`flex-row items-center justify-between p-4 ${
                    itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                  onPress={item.action}
                  disabled={item.toggle}
                >
                  <View className="flex-row items-center flex-1">
                    <View className="bg-gray-100 rounded-full p-2 mr-4">
                      <Text className="text-lg">{item.icon}</Text>
                    </View>
                    <Text className="text-gray-800 font-medium text-base flex-1">
                      {item.title}
                    </Text>
                  </View>
                  
                  {item.toggle ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#E5E7EB', true: '#1F2937' }}
                      thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                    />
                  ) : (
                    <Text className="text-gray-400 text-lg">›</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Version Info */}
        <View className="px-6 mb-4">
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <View className="items-center">
              <Text className="text-gray-800 font-bold text-lg mb-2">Spendify</Text>
              <Text className="text-gray-500 text-sm">Version 1.0.0</Text>
              <Text className="text-gray-400 text-xs mt-1">Build 2024.001</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View className="px-6 pb-8">
          <TouchableOpacity 
            className="bg-red-500 rounded-2xl py-4 shadow-sm"
            onPress={handleLogout}
          >
            <Text className="text-white text-lg font-bold text-center">
              🚪 Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;