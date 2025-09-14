import React from 'react';
import { View } from 'react-native';
import './../global.css';
import Home from './index';  // ✅ Correct import

const _layout = () => {
  return (
    <View>
      <Home />
    </View>
  );
};

export default _layout;
