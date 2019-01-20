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
import { socketFalse } from '../store/reducer';
import ChallengeScreen from './ChallengeScreen';

class Win extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restartGame: false,
    };
  }

  renderChallengeScreen = () => {
    this.setState({ restartGame: true });
  };

  render() {
    if (this.state.restartGame) {
      return <ChallengeScreen />;
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

          {/* Game Over Header */}
          <View style={styles.header}>
            <Image
              style={styles.header}
              source={require('../assets/images/header-game-over.png')}
            />
          </View>

          {/* Rematch Button */}
          <TouchableOpacity
            onPress={this.props.socketFalse}
            style={styles.button}
          >
            <Image
              source={require('../assets/images/button-rematch.png')}
              style={styles.button}
            />
          </TouchableOpacity>
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

const mapDispatch = dispatch => {
  return {
    socketFalse: () => {
      dispatch(socketFalse());
    },
    joinGame: () => {
      dispatch(joinGame());
    },
  };
};

export default connect(
  null,
  mapDispatch
)(Win);
