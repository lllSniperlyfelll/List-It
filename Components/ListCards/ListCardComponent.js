import React from 'react';
import Cards from './Cards';
import CreateList from './CreateList';
import AppSettings from '../AppSettings/AppSettings';
import Logo from '../../assets/logo.png';
import {Text, View, Image} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {TouchableRipple, Button} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

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
            <View
              style={{
                flex: 1,
                padding: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Logo}
                style={{resizeMode: 'contain', height: 45, width: 45}}
              />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button
                style={{borderRadius: 1000, elevation: 0}}
                color="white"
                onPress={() => props.navigation.navigate('App Settings')}>
                <EvilIcon name="gear" size={27} color="white" />
              </Button>
            </View>
          ),
        }}
      />

      <cardListStack.Screen
        name="CreateLists"
        component={CreateList}
        options={{
          headerShown: false,
        }}
      />
      <cardListStack.Screen
        name="App Settings"
        component={AppSettings}
        options={{
          headerShown: false,
        }}
      />
    </cardListStack.Navigator>
  );
}
