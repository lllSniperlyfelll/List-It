import React, {Component} from 'react';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
//import { Alert } from "react-native";

export default class SocialShare extends Component {
  constructor(props) {
    super(props);
    this.state = {listToShare: null, nameOflist: null};
  }

  componentDidMount() {
    if (this.props.listToShare && this.props.nameOfList) {
      const {listToShare, nameOfList} = this.props;
      this.setState({
        listToShare: listToShare.map((item) => item.name),
        nameOfList,
      });
    }
  }

  getShareableList() {
    const {listToShare, nameOfList} = this.state;
    let sharebleList = nameOfList + '\n';
    let counter = 1;
    for (let itr in listToShare) {
      sharebleList += counter.toString() + '. ' + listToShare[itr] + '\n';
      counter += 1;
    }
    return sharebleList;
  }

  shareTo() {
    const sharingOptions = {
      title: this.state.nameOflist,
      message: this.getShareableList(),
    };
    Share.open(sharingOptions)
      .then((resp) => console.log('Shared'))
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <Button
        style={this.props.style}
        mode="contained"
        icon={() => <Icon name="share-alt" color="white" size={20} />}
        onPress={() => this.shareTo()}>
        share
      </Button>
    );
  }
}
