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
import { connect } from 'react-redux';
import CameraScreen from './CameraScreen';

class GetReady extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: 5,
      startGame: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ countdown: this.state.countdown - 1 });
    }, 1000);

    setTimeout(() => {
      this.setState({ startGame: true });
    }, 6000);
  }

  render() {
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
            <View style={styles.splashView}>
              <Image
                style={styles.splashImage}
                source={require('../assets/images/splash-battle.png')}
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
  splashView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
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
