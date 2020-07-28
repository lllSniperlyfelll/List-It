import React, {Component} from 'react';
import {Text, View, FlatList, ScrollView} from 'react-native';
import {
  List,
  Title,
  Surface,
  Button,
  TouchableRipple,
  Card,
  Badge,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {createStackNavigator} from '@react-navigation/stack';
import NewList from './NewList';
import ViewList from './ViewList';
import {connect} from 'react-redux';
import Loading from '../Loading';

/**
 * This component will show already created lists
 * and the option to create new list
 */
class CreateListUI extends Component {
  state = {
    btnColor: '#4caf50',
    alreadyCreatedLists: null,
    listType: null,
  };

  getColor = () => {
    const colors = ['#2196F3', 'crimson', '#4caf50', '#009688', '#673ab7'];
    return colors[parseInt(Math.floor(Math.random() * colors.length))];
  };

  renderNoList = () => (
    <>
      <Surface
        style={{
          flex: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="frowno" size={50} color="#e5e5e5" />
        <Title
          style={{
            color: '#e5e5e5',
            fontSize: 25,
            textAlign: 'center',
            paddingTop: 10,
          }}>
          No Lists created
        </Title>
      </Surface>
      <Surface
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          textAlign: 'center',
          flex: 1,
          paddingTop: 10,
        }}>
        <TouchableRipple>
          <Button
            mode="contained"
            style={{
              backgroundColor: this.state.btnColor,
              margin: 15,
              padding: 8,
            }}
            icon="plus"
            onPress={() =>
              this.props.navigation.navigate('new list', {
                listType: this.state.listType,
              })
            }>
            New list
          </Button>
        </TouchableRipple>
      </Surface>
    </>
  );

  listNumber = (id) => {
    return (
      <Badge
        size={30}
        style={{
          alignSelf: 'center',
          backgroundColor: this.getColor(),
          color: 'white',
        }}>
        {id}
      </Badge>
    );
  };

  renderListItems = ({item, index}) => {
    return (
      <>
        <TouchableRipple
          style={{padding: 10, paddingBottom: 2}}
          key={item.id.toString()}>
          <Card>
            <List.Accordion
              title={item.name}
              left={() => this.listNumber(item.id.toString())}>
              <List.Item
                title={<Text style={{color: 'grey'}}>View</Text>}
                style={{padding: 0}}
                left={() => <List.Icon icon="eye" color="#009688" />}
                onPress={() =>
                  this.props.navigation.navigate('View List', {
                    listId: item.id
                  })
                }
              />
              <List.Item
                title={
                  <Text
                    style={{
                      color: 'grey',
                    }}>{`Create on: ${new Date().toDateString()}`}</Text>
                }
                left={() => <List.Icon icon="calendar" color="#2196F3" />}
                style={{padding: 0, color: 'green'}}
                onPress={() => alert('Creared on details')}
              />
              <List.Item
                title={<Text style={{color: 'grey'}}>Delete</Text>}
                style={{padding: 0}}
                left={() => <List.Icon icon="delete" color="red" />}
                onPress={() => alert('Delete')}
              />
            </List.Accordion>
          </Card>
        </TouchableRipple>
      </>
    );
  };

  renderAlreadyPresentList = (listToRender) => {
    return (
      <>
        <FlatList
          data={listToRender}
          renderItem={this.renderListItems}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Button
            mode="contained"
            style={{
              backgroundColor: this.state.btnColor,
              margin: 15,
              padding: 8,
            }}
            icon="plus"
            onPress={() =>
              this.props.navigation.navigate('new list', {
                listType: this.state.listType,
              })
            }>
            New list
          </Button>
        </View>
      </>
    );
  };

  componentDidMount() {
    const {listType} = this.props;
    const btnColor = listType === 'todo' ? '#e91e63' : '#4caf50';
    this.setState({listType, btnColor});
    if (this.props.listToRender) {
      //alert(this.props.listToRender)
      this.setState({
        alreadyCreatedLists: this.props.listToRender,
        listType,
      });
    }
  }

  render() {
    if (this.state.alreadyCreatedLists) {
      const {alreadyCreatedLists} = this.state;
      const list =
        alreadyCreatedLists.length > 0
          ? this.renderAlreadyPresentList(this.state.alreadyCreatedLists)
          : this.renderNoList();
      return (
        <>
          <View
            style={{
              flex: 1,
            }}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}>
              {list}
            </ScrollView>
          </View>
        </>
      );
    } else {
      return <Loading />;
    }
  }
}
function CreateList(props) {
  if (props.allTodoLists && props.allGroceryLists) {
    //alert(JSON.stringify(props.allGroceryLists));
    const createListStack = createStackNavigator();
    const {listType} = props.route.params;
    const title = `Your ${listType === 'todo' ? 'todo' : 'grocery'} lists`;
    return (
      <createListStack.Navigator initialRouteName="create list">
        <createListStack.Screen
          name="create list"
          component={() => (
            <CreateListUI
              listType={listType}
              listToRender={
                listType === 'todo'
                  ? props.allTodoLists.todoLists
                  : props.allGroceryLists.groceryLists
              }
              navigation={props.navigation}
            />
          )}
          options={() => ({
            title,
            headerStyle: {
              backgroundColor: '#2196f3',
              elevation: 6,
            },
            headerTintColor: 'white',
          })}
        />
        <createListStack.Screen
          name="new list"
          component={() => <NewList {...props} />}
          options={{
            headerTitle: 'Create new list',
            headerStyle: {
              backgroundColor: '#2196f3',
              elevation: 6,
            },
            headerTintColor: 'white',
          }}
        />
        <createListStack.Screen
          name="View List"
          component={() => <ViewList routes={props.route} />}
          options={{
            headerTitle: 'View list',
            headerStyle: {
              backgroundColor: '#2196f3',
              elevation: 6,
            },
            headerTintColor: 'white',
          }}
        />
      </createListStack.Navigator>
    );
  } else {
    return <Loading />;
  }
}

const mapStateToProps = (state) => ({
  allTodoLists: state.todoLists,
  allGroceryLists: state.groceryLists,
});

export default connect(mapStateToProps)(CreateList);
