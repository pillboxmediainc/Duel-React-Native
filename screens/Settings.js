import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChallengeScreen from './ChallengeScreen';
import { connect } from 'react-redux';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      back: false,
    };
  }

  renderChallengeScreen = () => {
    this.setState({ back: true });
  };

  render() {
    if (this.state.back) {
      return <ChallengeScreen />;
    }

    return (
      <View style={styles.mainView}>
        {/* Background Image */}
        <View style={styles.backgroundImage}>
          <Image
            style={styles.backgroundImage}
            source={require('../assets/images/pool-animation.gif')}
          />
        </View>

        {/* Settings Header */}
        <View style={styles.header}>
          <Image
            style={styles.header}
            source={require('../assets/images/header-settings.png')}
          />
        </View>

        {/* Back Button */}
        <TouchableOpacity
          onPress={this.renderChallengeScreen}
          style={styles.button}
        >
          <Image
            source={require('../assets/images/button-back.png')}
            style={styles.button}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#fcfcfc',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 10,
    width: 200,
    height: 62,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 10,
    width: 250,
    height: 250,
  },
});

// const mapState = state => {
//   return {
//     socketConnection: state.socketConnection,
//   };
// };

// const mapDispatch = dispatch => {
//   return {
//     socketTrue: () => {
//       dispatch(socketTrue());
//     },
//     joinGame: () => {
//       dispatch(joinGame());
//     },
//   };
// };

export default connect(
  null,
  null
)(Settings);
