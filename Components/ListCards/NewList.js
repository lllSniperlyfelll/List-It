import React, {Component} from 'react';
import {Text, ScrollView, View, Modal} from 'react-native';
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
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

export default class NewList extends Component {
  state = {
    nameOfTheList: '',
    modalVisibility: false,
    newItemToBeAdded: null,
    newAddedItemsList: [
      {
        id: 1,
        name:
          'item item itemitemitemitem itemitemitemitem temitemitem itemitemitemitem',
        description: 'some discreption to the given item',
      },
      {
        id: 3,
        name: 'item',
        description: 'some discreption to the given item',
      },
      {
        id: 4,
        name: 'item',
        description: 'some discreption to the given item',
      },
      {
        id: 5,
        name: 'item',
        description: 'some discreption to the given item',
      },
    ],
  };

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
    alert('Saved');
  }
  removeItemFromList = (idOfItemToBeRemoved) => {
    const {newAddedItemsList} = this.state;
    const removedItemList = newAddedItemsList.filter(
      (item) => item.id !== idOfItemToBeRemoved,
    );
    this.setState({
      newAddedItemsList: removedItemList,
    });
  };
  addItemToList = () => {
    const {newAddedItemsList, newItemToBeAdded} = this.state;
    if (newItemToBeAdded) {
      const newItem = {
        id: newAddedItemsList.length + 2,
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
    const {listType} = this.props.route.params;
    const modalTitle = listType === 'todo' ? 'New task' : 'New item';

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
          <View style={{padding: 15}}>
            <TextInput
              label="Name your list ..."
              mode="outlined"
              value={this.state.nameOfTheList}
              onChangeText={(text) => this.setState({nameOfTheList: text})}
            />
          </View>
          <View style={{paddingTop: 10, paddingBottom: 10}}>
            <Divider style={{backgroundColor: 'grey'}} />
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
                    color="white"
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
                padding: 15,
              }}>
              <Card style={{padding: 2, elevation: 10}}>
                <Card.Title title={modalTitle} />
                <Card.Content>
                  <TextInput
                    label="Enter item name ..."
                    mode="outlined"
                    onChangeText={(text) =>
                      this.setState({newItemToBeAdded: text})
                    }
                  />
                </Card.Content>
                <Card.Actions
                  style={{
                    textAign: 'right',
                    justifyContent: 'flex-end',
                    paddingTop: 15,
                  }}>
                  <Button onPress={() => this.showModal()}>Cancel</Button>
                  <Button
                    onPress={() => {
                      this.addItemToList();
                      this.showModal();
                    }}>
                    Add
                  </Button>
                </Card.Actions>
              </Card>
            </View>
          </Modal>
        </ScrollView>
      </>
    );
  }
  showModal = () => {
    this.setState({
      modalVisibility: !this.state.modalVisibility,
    });
  };
  getListItems() {
    const map = [];
    for (let item in this.state.newAddedItemsList) {
      console.log(item);
      map.push(
        <Card
          style={{marginBottom: 15}}
          key={this.state.newAddedItemsList[item].id.toString()}>
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
        {id}
      </Badge>
    );
  };
}
