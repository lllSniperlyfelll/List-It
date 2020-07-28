import React, {Component} from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Cards extends Component {


  pushToCrateNewLists = (navigation, listType) => {
    navigation.navigate('CreateLists', {listType});
  }
  render() {
    const {navigation} = this.props
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
          }}>
          <View style={CardsStyles.cardContainer}>
            <Card
              style={CardsStyles.cardStyle}
              onPress={() => this.pushToCrateNewLists(navigation, 'todo')}>
              <Card.Cover source={require('../../assets/todo_card_img.jpeg')} />
              <Card.Content style={{color: 'black'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>
                    <Icon name="check-circle" size={20} color="#2196f3" />
                  </View>
                  <View style={{flex: 11, justifyContent: 'flex-start'}}>
                    <Title style={CardsStyles.cardTitle}>Todo list</Title>
                  </View>
                </View>
                <Paragraph style={CardsStyles.cardDescription}>
                  Create a todo list of the tasks you need to get done
                </Paragraph>
              </Card.Content>
            </Card>
          </View>
          <View style={CardsStyles.cardContainer}>
            <Card
              style={CardsStyles.cardStyle}
              onPress={() => this.pushToCrateNewLists(navigation, 'grocery')}>
              <Card.Cover
                source={require('../../assets/grocery_card_image.jpg')}
              />
              <Card.Content style={{color: 'black'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>
                    <Icon name="storefront" size={20} color="#00C85E" />
                  </View>
                  <View style={{flex: 11, justifyContent: 'flex-start'}}>
                    <Title style={CardsStyles.cardTitle}>Grocery list</Title>
                  </View>
                </View>

                <Paragraph style={CardsStyles.cardDescription}>
                  Never ever forget what you have to buy from store
                </Paragraph>
              </Card.Content>
            </Card>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const CardsStyles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: 'black',
  },
  cardDescription: {
    color: 'grey',
    fontSize: 15,
  },
  cardStyle: {
    elevation: 5,
    backgroundColor: 'white',
    marginBottom: 10,
    width: '100%',
  },
});
