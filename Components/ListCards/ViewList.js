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

export default class ViewList extends Component {
  state = {
    listId: null,
    listType: null,
    imageUrl: null,
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
      {
        id: 6,
        name: 'item',
        description: 'some discreption to the given item',
      },
      {
        id: 7,
        name: 'item',
        description: 'some discreption to the given item',
      },
      {
        id: 8,
        name: 'item',
        description: 'some discreption to the given item',
      },
    ],
  };

  componentDidMount() {
    const {listType} = this.props.routes.params;
    const {listId} = this.props.routes.state.routes[1].params;
    const imageUrl = listType === 'todo' ? TodoImage : GroceryImage;
    this.setState({
      listId,
      listType,
      imageUrl,
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
        {id}
      </Badge>
    );
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
            />
          </Card.Content>
        </Card>,
      );
    }
    return map;
  }

  render() {
    const {imageUrl} = this.state;
    return (
      <ScrollView>
        <View style={{flex: 1, padding: 5}}>
          <ImageBackground
            source={imageUrl}
            style={styles.backgroundImage}
            imageStyle={{borderRadius: 5}}>
            <Surface style={styles.conatinerOnImage}>
              <Title style={styles.listTitle}>Monday List</Title>
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
            onPress={() => alert('delete list')}>
            Delete list
          </Button>
        </View>
      </ScrollView>
    );
  }
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
