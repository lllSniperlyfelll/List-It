import React, {Component} from 'react';
import {Text, ScrollView, View, Modal, Alert} from 'react-native';
import {
  TextInput,
  Divider,
  Button,
  Card,
  Title,
  List,
  Badge,
  FAB,
  Portal,
  Dialog,
  Banner,
  Avatar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {
  createNewTodoList,
  createNewGroceryList,
} from '../Actions/ActionCreators';

class NewList extends Component {
  state = {
    listType: null,
    nameOfTheList: null,
    modalVisibility: false,
    newItemToBeAdded: null,
    newAddedItemsList: [],
    newListId: null,
    showInfoOfApp: true
  };
  /**
   *{
   * id: idOfList as number,
   * name: Name of list,
   * createdOn: Date when list is created
   * listItems:[
   *    {
   *      id: id of each and every item in list,
   *      name: name of item in list
   *    }
   *  ]
   * }
   */

  componentDidMount() {
    const {listType, storedListLength} = this.props;
    if (listType) {
      this.setState({listType, newListId: storedListLength + 1});
    }
  }

  pushToReduxStore() {
    /**
     * This function must be called
     * when user clicks on save list
     * this will push the newAddedItemsList
     * in the current state to the redux store
     * as an object with two props
     * 1. Id -> long unique id of this list
     * 2. newAddedItemsList -> as the data
     */
    const {listType, nameOfTheList, newListId, newAddedItemsList} = this.state;
    if (nameOfTheList == null) {
      Alert.alert('Cannot save list', '\nThe list must have a name', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    } else if (newAddedItemsList.length <= 0) {
      Alert.alert('Cannot save list', '\nList must have atleast one item', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    } else {
      const newList = {
        id: newListId + 2,
        name: nameOfTheList,
        createdOn: new Date(),
        listItems: newAddedItemsList,
      };
      listType === 'todo'
        ? this.props.addNewTodoListToStore(newList)
        : this.props.addNewGroceryListToStore(newList);
      Alert.alert('List Saved', '\nYour list have been saved successfully', [
        {
          text: 'Ok',
          style: 'cancel',
          onPress: () => this.props.navigation.navigate('create list'),
        },
      ]);
    }
  }

  getHelp = (info) => {
    return (
      <Banner
        visible={this.state.showInfoOfApp}
        actions={[
          {
            label: '  Ok  ',
            onPress: () => this.setState({showInfoOfApp: false}),
          },
        ]}
        icon={() => (
          <Avatar.Icon
            icon="help"
            size={30}
            color="white"
            style={{backgroundColor: 'crimson'}}
          />
        )}>
        <Text style={{color: 'rgba(0,0,0,0.5)', fontWeight: 'bold'}}>
          {info}
        </Text>
      </Banner>
    );
    //return null;
  };

  updateIds = (list) => {
    for (let itr in list) {
      list[itr].id = itr;
    }
    return list;
  };
  removeItemFromList = (idOfItemToBeRemoved) => {
    const {newAddedItemsList} = this.state;
    const removedItemList = newAddedItemsList.filter(
      (item) => item.id !== idOfItemToBeRemoved,
    );
    this.setState({
      newAddedItemsList: this.updateIds(removedItemList),
    });
  };
  addItemToList = () => {
    const {newAddedItemsList, newItemToBeAdded} = this.state;
    if (newItemToBeAdded) {
      const newItem = {
        id: newAddedItemsList.length + 1,
        name: newItemToBeAdded,
      };
      this.setState({
        newAddedItemsList: [newItem, ...newAddedItemsList],
        newItemToBeAdded: null,
      });
    } else {
      alert('Empty item cannot be added to list');
    }
  };
  render() {
    //alert(JSON.stringify(this.state.newAddedItemsList))
    const {listType} = this.state;
    const modalTitle = listType === 'todo' ? 'Add new task' : 'Add new item';

    return (
      <>
        <Portal>
          <FAB
            style={{
              position: 'absolute',
              bottom: 22,
              left: 30,
              backgroundColor: 'crimson',
              elevation: 100,
            }}
            color="white"
            icon="plus"
            onPress={() => this.showModal()}
          />
        </Portal>
        <ScrollView>
          {this.getHelp("Add items in the list and alway's click save to save the list or you might lose your data")}
          <View style={{padding: 15}}>
            <TextInput
              label="Name your list ..."
              value={this.state.nameOfTheList}
              onChangeText={(text) => this.setState({nameOfTheList: text})}
            />
          </View>

          <View style={{padding: 15}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <Title
                  style={{
                    paddingBottom: 15,
                    color: 'grey',
                    alignSelf: 'flex-start',
                  }}>
                  Items in list
                </Title>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}>
                <Title
                  style={{
                    paddingBottom: 15,
                    color: 'grey',
                    alignSelf: 'flex-end',
                  }}>
                  <Button
                    mode="contained"
                    icon={() => <Icon name="save" color="white" size={17} />}
                    style={{
                      alignSelf: 'center',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      padding: 0,
                    }}
                    onPress={() => this.pushToReduxStore()}>
                    Save
                  </Button>
                </Title>
              </View>
            </View>
            {this.getListItems()}
          </View>

          <Modal
            visible={this.state.modalVisibility}
            animationType="fade"
            transparent={true}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Dialog visible={this.state.modalVisibility}>
                <Dialog.Title>{modalTitle}</Dialog.Title>
                <Dialog.Content>
                  <TextInput
                    label="Enter item name ..."
                    style={{backgroundColor: 'white'}}
                    onChangeText={(text) =>
                      this.setState({newItemToBeAdded: text})
                    }
                  />
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => this.showModal()}>Cancel</Button>
                  <Button
                    onPress={() => {
                      this.addItemToList();
                      this.showModal();
                    }}
                    style={{marginLeft: 8, marginRight: 4}}>
                    Add
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </View>
          </Modal>
        </ScrollView>
      </>
    );
  }

  showModal = () =>
    this.setState({
      modalVisibility: !this.state.modalVisibility,
    });
  getListItems() {
    const map = [];
    console.log(JSON.stringify(this.state.newAddedItemsList));
    for (let item in this.state.newAddedItemsList) {
      //console.log(item);
      map.push(
        <Card
          style={{marginBottom: 15}}
          key={(this.state.newAddedItemsList[item].id + 10).toString()}>
          <Card.Content>
            <List.Item
              title={
                <Text style={{color: 'grey'}}>
                  {this.state.newAddedItemsList[item].name}
                </Text>
              }
              style={{padding: 0}}
              titleNumberOfLines={50}
              left={() => this.listNumber(item)}
              right={() => (
                <Badge
                  style={{alignSelf: 'center'}}
                  onPress={() => {
                    this.removeItemFromList(
                      this.state.newAddedItemsList[item].id,
                    );
                  }}>
                  X
                </Badge>
              )}
            />
          </Card.Content>
        </Card>,
      );
    }
    return map;
  }

  listNumber = (id) => {
    return (
      <Badge
        size={30}
        style={{
          alignSelf: 'center',
          backgroundColor: '#2196F3',
          color: 'white',
        }}>
        {new Number(id) + 1}
      </Badge>
    );
  };
}

const mapDispatchToProps = (dispatch) => ({
  addNewTodoListToStore: (newList) => dispatch(createNewTodoList(newList)),
  addNewGroceryListToStore: (newList) =>
    dispatch(createNewGroceryList(newList)),
});

export default connect(null, mapDispatchToProps)(NewList);
