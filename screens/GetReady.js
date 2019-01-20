import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Audio } from 'expo';
import { connect } from 'react-redux';
import CameraScreen from './CameraScreen';

let interval;

class GetReady extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: 6,
      startGame: false,
    };

    this.countdownSound5 = new Expo.Audio.Sound();
    this.countdownSound4 = new Expo.Audio.Sound();
    this.countdownSound3 = new Expo.Audio.Sound();
    this.countdownSound2 = new Expo.Audio.Sound();
    this.countdownSound1 = new Expo.Audio.Sound();
    this.battleSound = new Expo.Audio.Sound();
  }

  async componentDidMount() {
    // Load Sounds
    try {
      await this.countdownSound5.loadAsync(
        require('../assets/sounds/countdown.mp3')
      );
      await this.countdownSound4.loadAsync(
        require('../assets/sounds/countdown.mp3')
      );
      await this.countdownSound3.loadAsync(
        require('../assets/sounds/countdown.mp3')
      );
      await this.countdownSound2.loadAsync(
        require('../assets/sounds/countdown.mp3')
      );
      await this.countdownSound1.loadAsync(
        require('../assets/sounds/countdown.mp3')
      );
      await this.battleSound.loadAsync(require('../assets/sounds/battle.mp3'));
    } catch (error) {
      // An error occurred!
    }

    // Countdown timers
    setTimeout(() => {
      this.setState({ countdown: this.state.countdown - 1 });
      interval = setInterval(() => {
        this.setState({ countdown: this.state.countdown - 1 });
      }, 1);

      setTimeout(() => {
        this.setState({ startGame: true });
      }, 6);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  render() {
    // if (this.state.countdown === 5) {
    //   this.countdownSound5.playAsync();
    // }
    // if (this.state.countdown === 4) {
    //   this.countdownSound4.playAsync();
    // }
    // if (this.state.countdown === 3) {
    //   this.countdownSound3.playAsync();
    // }
    // if (this.state.countdown === 2) {
    //   this.countdownSound2.playAsync();
    // }
    // if (this.state.countdown === 1) {
    //   this.countdownSound1.playAsync();
    // }
    // if (this.state.countdown === 0) {
    //   this.battleSound.playAsync();
    // }

    if (this.state.startGame) {
      return <CameraScreen />;
    } else {
      return (
        <View style={styles.mainView}>
          {/* Background Image */}
          <View style={styles.backgroundImage}>
            <Image
              style={styles.backgroundImage}
              source={require('../assets/images/pool-animation.gif')}
            />
          </View>

          {/* Get Ready Header */}

          {this.state.countdown !== 0 ? (
            <View style={styles.headerView}>
              <Image
                style={styles.headerImage}
                source={require('../assets/images/header-get-ready.png')}
              />
            </View>
          ) : null}

          {/* Countdown */}
          {this.state.countdown === 5 ? (
            <View style={styles.countdownView}>
              <Image
                style={styles.countdownImage}
                source={require('../assets/images/5.png')}
              />
            </View>
          ) : null}

          {this.state.countdown === 4 ? (
            <View style={styles.countdownView}>
              <Image
                style={styles.countdownImage}
                source={require('../assets/images/4.png')}
              />
            </View>
          ) : null}

          {this.state.countdown === 3 ? (
            <View style={styles.countdownView}>
              <Image
                style={styles.countdownImage}
                source={require('../assets/images/3.png')}
              />
            </View>
          ) : null}
          {this.state.countdown === 2 ? (
            <View style={styles.countdownView}>
              <Image
                style={styles.countdownImage}
                source={require('../assets/images/2.png')}
              />
            </View>
          ) : null}
          {this.state.countdown === 1 ? (
            <View style={styles.countdownView}>
              <Image
                style={styles.countdownImage}
                source={require('../assets/images/1.png')}
              />
            </View>
          ) : null}
          {this.state.countdown === 0 ? (
            <View style={styles.battleView}>
              <Image
                style={styles.battleImage}
                source={require('../assets/images/battle.png')}
              />
            </View>
          ) : null}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    position: 'absolute',
    top: 50,
    width: 300,
    height: 300,
  },
  countdownView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownImage: {
    position: 'absolute',
    top: 200,
    width: 300,
    height: 300,
  },
  battleView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  battleImage: {
    // position: 'absolute',
    // top: 200,
    width: 360,
    height: 180,
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
)(GetReady);
