import React from 'react'
import { View } from "react-native";
import { ProgressBar} from "react-native-paper"


export default function Loading() {
  return (
    <View style={{flex: 1, justifyItems: 'center', padding: 50}}>
      <View style={{flex: 1}} />
      <View
        style={{
          flex: 1.5,
          justifyItems: 'flex-end',
          flexDirection: 'column',
        }}>
        <ProgressBar progress={0.5} color="#2196f3" indeterminate={true} />
      </View>
    </View>
  );
}
