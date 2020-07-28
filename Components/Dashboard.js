import React from 'react';
import {SafeAreaView, ScrollView, View, Text, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import ListCardComponent from './ListCards/ListCardComponent';

export default function Dashboard() {
  const DashboardStack = createStackNavigator();
  return (
    <View style={{flex: 1}}>
      <NavigationContainer sreenOptions={{}}>
        <DashboardStack.Navigator initialRouteName="ListCardComponent">
          <DashboardStack.Screen
            name="ListCardComponent"
            component={ListCardComponent}
            options={{
              headerShown: false
            }}
          />
        </DashboardStack.Navigator>
      </NavigationContainer>
    </View>
  );
}
