import React from 'react';
import {Text, View} from 'react-native';
import Cards from './Cards';
import CreateList from './CreateList';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ListCardComponent(props) {
  const cardListStack = createStackNavigator();
  return (
    <cardListStack.Navigator initialRouteName="Card Lists">
      <cardListStack.Screen
        name="Card Lists"
        component={Cards}
        options={{
          headerTitle: 'Welcome to List It',
          headerStyle: {
            backgroundColor: '#2196f3',
            elevation: 6,
          },
          headerTintColor: '#2196F3',
          headerTitleStyle: {
            color: 'white',
          },
          headerLeft: () => (
            <View style={{paddingLeft: 25}}>
              <Icon name="tablet-dashboard" size={30} color="white" />
            </View>
          ),
        }}
      />
      <cardListStack.Screen
        name="CreateLists"
        component={CreateList}
        options={{
          headerShown:false
        }}
      />
    </cardListStack.Navigator>
  );
}
