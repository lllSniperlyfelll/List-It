import React, {Component} from 'react';
import {Text} from 'react-native';
import {Switch} from 'react-native-paper';
import {disableTutorials, enableTutorials} from '../Actions/ActionCreators';
import {connect} from 'react-redux';

class TutorialSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: true,
    };
  }

  componentDidMount() {
    if (
      this.props.tutorials.showTutorial !== undefined &&
      this.props.tutorials.showTutorial !== null
    ) {
      console.log(JSON.stringify(this.props.tutorials.showTutorial));
      this.setState({enable: this.props.tutorials.showTutorial});
    }
  }

  changeSettings() {
    const {enable} = this.state;
    const {showTutorial} = this.props.tutorials;
    if (enable === true) {
      this.props.disableTutorials();
    } else {
      this.props.enableTutorials();
    }
    this.setState({enable: !enable});
  }

  render() {
    const {enable} = this.state;
    return (
      <Switch
        value={enable}
        onValueChange={() => this.changeSettings()}
        color="crimson"
      />
    );
  }
}

const mapStateToProps = (state) => ({
  tutorials: state.tutorials,
});

const mapDispatchToProps = (dispatch) => ({
  enableTutorials: () => dispatch(enableTutorials()),
  disableTutorials: () => dispatch(disableTutorials()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorialSettings);
