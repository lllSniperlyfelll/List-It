import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Card, Surface, Title, List, Badge, Button} from 'react-native-paper';
import GroceryImage from '../../assets/grocery_card_image.jpg';
import TodoImage from '../../assets/todo_card_img.jpeg';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Loading from '../Loading';
import {deleteGroceryList, deleteTodoList} from '../Actions/ActionCreators';

class ViewList extends Component {
  state = {
    listId: null,
    listType: null,
    imageUrl: null,
    strikedItems: [],
    newAddedItemsList: null,
    closeSwipeout: true,
  };

  getSwipeoutsRightButtons = (elementId) => {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          <Button
            mode="contained"
            style={{
              color: 'transparent',
              backgroundColor: 'red',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}
            onPress={() => this.deleteItem(elementId)}>
            <Icon
              name="trash-o"
              size={20}
              color="white"
              style={{alignSelf: 'center'}}
            />
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          <Button
            mode="contained"
            style={{
              color: 'transparent',
              backgroundColor: 'crimson',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}
            onPress={() => this.unStrikeItem(elementId)}>
            <Icon
              name="times"
              size={20}
              color="white"
              style={{alignSelf: 'center'}}
            />
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          <Button
            mode="contained"
            style={{
              color: 'transparent',
              backgroundColor: '#4caf50',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}
            onPress={() => this.strikeItem(elementId)}>
            <Icon
              name="check"
              size={20}
              color="white"
              style={{alignSelf: 'center'}}
            />
          </Button>
        </View>
      </>
    );
  };

  getListItems() {
    const map = [];
    const {strikedItems, newAddedItemsList, closeSwipeout} = this.state;
    for (let item in newAddedItemsList) {
      const itemId = newAddedItemsList[item].id;
      const strikeTextStyle =
        strikedItems.filter((singleItem) => singleItem.id === itemId).length > 0
          ? 'line-through'
          : 'none';
      const swipeoutRightButtons = [
        {
          component: (
            <View style={{flex: 1, flexDirection: 'row-reverse'}}>
              {this.getSwipeoutsRightButtons(itemId)}
            </View>
          ),
          backgroundColor: 'transparent',
        },
      ];
      map.push(
        <Swipeout
          right={swipeoutRightButtons}
          close={closeSwipeout}
          backgroundColor="transparent"
          buttonWidth={200}
          autoClose={true}
          sensitivity={10}>
          <Card
            style={{marginBottom: 15}}
            key={itemId.toString()}
            onPress={() => this.setState({closeSwipeout: true})}>
            <Card.Content>
              <List.Item
                title={
                  <Text
                    style={{
                      color: 'grey',
                      textDecorationLine: strikeTextStyle,
                    }}>
                    {newAddedItemsList[item].name}
                  </Text>
                }
                style={{padding: 0}}
                titleNumberOfLines={50}
                left={() => this.listNumber(item)}
              />
            </Card.Content>
          </Card>
        </Swipeout>,
      );
    }
    return map;
  }

  componentDidMount() {
    const {listType} = this.props.routes.params;
    const {listId} = this.props.routes.state.routes[1].params;
    this.setState({
      listId,
      listType,
    });
    //alert(JSON.stringify(this.props.navigation));
    if (this.props.allGroceryLists && this.props.allTodoLists) {
      const {allGroceryLists, allTodoLists} = this.props;
      const imageUrl = listType === 'todo' ? TodoImage : GroceryImage;
      const selectedList = (listType === 'todo'
        ? allTodoLists.todoLists
        : allGroceryLists.groceryLists
      ).filter((lists) => lists.id === listId);
      //alert(JSON.stringify(selectedList));
      if (selectedList && selectedList.length > 0) {
        this.setState({
          imageUrl,
          newAddedItemsList: selectedList[0].listItems,
          listName: selectedList[0].name,
        });
      }
    }
  }

  /**
   * Added basic redux with static state
   * and no user IO
   */
  render() {
    if (this.state.newAddedItemsList) {
      const {imageUrl} = this.state;
      const {newAddedItemsList, listName, listId, listType} = this.state;
      return (
        <ScrollView>
          <View style={{flex: 1, padding: 5}}>
            <ImageBackground
              source={imageUrl}
              style={styles.backgroundImage}
              imageStyle={{borderRadius: 5}}>
              <Surface style={styles.conatinerOnImage}>
                <Title style={styles.listTitle}>{listName}</Title>
              </Surface>
            </ImageBackground>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.customDivider} />
          </View>
          <View style={{padding: 15}}>
            {this.getListItems()}

            <Button
              mode="contained"
              icon="delete"
              style={{backgroundColor: 'red', marginTop: 7, color: 'white'}}
              onPress={() => {
                listType === 'todo'
                  ? this.props.delTodoList(listId)
                  : this.props.delGroceryList(listId);
                this.props.navigation.navigate('create list', {listType});
              }}>
              Delete list
            </Button>
          </View>
        </ScrollView>
      );
    } else {
      return <Loading />;
    }
  }

  strikeItem(elementId) {
    const {strikedItems, closeSwipeout} = this.state;
    this.setState({
      strikedItems: [...strikedItems, {id: elementId}],
      closeSwipeout: true,
    });
  }

  unStrikeItem(elementId) {
    const {strikedItems, closeSwipeout} = this.state;
    if (strikedItems.length > 0) {
      this.setState({
        strikedItems: strikedItems.filter((item) => item.id !== elementId),
        closeSwipeout: true,
      });
    }
  }

  deleteItem(elementId) {
    const {newAddedItemsList} = this.state;
    this.setState({
      newAddedItemsList: newAddedItemsList.filter(
        (item) => item.id !== elementId,
      ),
    });
  }

  listNumber = (id) => {
    return (
      <Badge
        size={30}
        style={{
          alignSelf: 'center',
          backgroundColor:
            this.state.listType === 'todo' ? '#2196F3' : '#00C85E',
          color: 'white',
        }}>
        {new Number(id) + 1}
      </Badge>
    );
  };
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 5,
  },
  conatinerOnImage: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
  },
  listTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
    padding: 3,
  },
  dividerContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  customDivider: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    padding: 1,
    borderRadius: 5,
  },
});

const mapStateToProps = (state) => ({
  allTodoLists: state.todoLists,
  allGroceryLists: state.groceryLists,
});
const mapDispatchToProps = (dispatch) => ({
  delTodoList: (listId) => dispatch(deleteTodoList(listId)),
  delGroceryList: (listId) => dispatch(deleteGroceryList(listId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewList);
