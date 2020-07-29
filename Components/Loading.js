import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent:"center",
        justifyItems: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator animating={true} color="#2196F3" size="large" style={{alignSelf:"center"}} />
    </View>
  );
}
