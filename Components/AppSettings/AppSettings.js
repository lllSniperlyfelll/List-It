import React from 'react';
import {View, Text} from 'react-native';
import {DataTable, Title, Surface} from 'react-native-paper';
import TutorialSettings from './TutorialSettings';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {createStackNavigator} from '@react-navigation/stack';

function RenderSettings(props) {
  return (
    <View style={{flex: 1, paddingTop: 10}}>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>
            <Title style={{color: 'grey', fontSize: 17}}>Show tutorial</Title>
          </DataTable.Cell>
          <DataTable.Cell
            style={{
              alignContent: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <TutorialSettings />
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }}>
        <Surface style={{ padding: 10,backgroundColor:"grey", width:"100%"}}>
          <Title style={{color: 'white', fontSize: 12}}>
            Developer : Sniperlyfe :-){'\n'}Git repo :
            github.com/lllSniperlyfelll/List-It
          </Title>
        </Surface>
      </View>
    </View>
  );
}

export default function AppSettings(props) {
  const AppSettingsStack = createStackNavigator();
  return (
    <AppSettingsStack.Navigator initialRouteName="App Settings">
      <AppSettingsStack.Screen
        name="App Settings"
        component={RenderSettings}
        options={{
          headerTitle: 'Settings',
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
              <EvilIcon name="gear" size={27} color="white" />
            </View>
          ),
        }}
      />
    </AppSettingsStack.Navigator>
  );
}
