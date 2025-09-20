import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import '../global.css';
  
const _layout = () => {
  return (
    <View className="flex-1">
      <Slot/>
      
    </View>
  )
}

export default _layout;