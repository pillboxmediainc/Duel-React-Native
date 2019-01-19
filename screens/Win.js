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

class Win extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: 5,
      restartGame: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ countdown: 4 });
    }, 1000);

    setTimeout(() => {
      this.setState({ countdown: 3 });
    }, 2000);
    setTimeout(() => {
      this.setState({ countdown: 2 });
    }, 3000);

    setTimeout(() => {
      this.setState({ countdown: 1 });
    }, 4000);

    setTimeout(() => {
      this.props.socketFalse();
    }, 5000);
  }

  render() {
    if (this.state.startGame) {
      return <CameraScreen />;
    } else {
      return (
        <View>
          <Text>Game Over</Text>
          <Text>You Win!</Text>
          <Text>Restarting in... {this.state.countdown}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  gameTitle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#66b3ff',
        shadowOffset: { height: -3 },
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        elevation: 30,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#c4c4c4',
    paddingVertical: 30,
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#66b3ff',
        shadowOffset: { height: -3 },
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        elevation: 30,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#c4c4c4',
    paddingVertical: 30,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
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
  acceptChallengeButtonView: {
    marginTop: 20,
    width: '100%',
    height: 100,
    backgroundColor: '#66b3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptChallengeButtonText: {
    fontSize: 14,
    color: '#2e78b7',
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
