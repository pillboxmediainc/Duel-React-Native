import React from 'react';
import { Image, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { socketTrue } from '../store/reducer';
import Settings from './Settings';
import HowToPlay from './HowToPlay';

class ChallengeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      howToPlay: false,
      settings: false,
    };
  }

  renderHowToPlay = () => {
    this.setState({ howToPlay: true });
  };

  renderSettings = () => {
    this.setState({ settings: true });
  };

  render() {
    if (this.state.howToPlay) {
      return <HowToPlay />;
    }

    if (this.state.settings) {
      return <Settings />;
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

        {/* Splash Royale Logo */}
        <View style={styles.logo}>
          <Image
            style={styles.logo}
            source={require('../assets/images/splash-royale-logo.png')}
          />
        </View>

        <View style={styles.buttonContainer}>
          {/* Join Game Button */}
          <TouchableOpacity
            onPress={this.props.socketTrue}
            style={styles.button1}
          >
            <Image
              source={require('../assets/images/button-join-game.png')}
              style={styles.button1}
            />
          </TouchableOpacity>

          {/* How to Play Button */}
          <TouchableOpacity
            onPress={() => this.renderHowToPlay()}
            style={styles.button2}
          >
            <Image
              source={require('../assets/images/button-how-to-play.png')}
              style={styles.button2}
            />
          </TouchableOpacity>

          {/* Settings Button */}
          <TouchableOpacity
            onPress={() => this.renderSettings()}
            style={styles.button3}
          >
            <Image
              source={require('../assets/images/button-settings.png')}
              style={styles.button3}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeButtonView: {
    marginTop: 175,
    width: '100%',
    height: 100,
    backgroundColor: '#66b3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeButtonText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  logo: {
    position: 'absolute',
    top: 10,
    width: 250,
    height: 250,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    position: 'absolute',
    marginTop: 40,
    width: 200,
    height: 62,
  },
  button2: {
    position: 'absolute',
    marginTop: 120,
    width: 200,
    height: 62,
  },
  button3: {
    position: 'absolute',
    marginTop: 200,
    width: 200,
    height: 62,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

const mapState = state => {
  return {
    socketConnection: state.socketConnection,
  };
};

const mapDispatch = dispatch => {
  return {
    socketTrue: () => {
      dispatch(socketTrue());
    },
    joinGame: () => {
      dispatch(joinGame());
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(ChallengeScreen);
