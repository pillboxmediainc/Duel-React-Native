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
import { socketTrue } from '../store/reducer';
// import { WebBrowser } from 'expo';
// import { MonoText } from '../components/StyledText';

class ChallengeScreen extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  // static navigationOptions = {
  //   title: 'I Challenge You to a Duel',
  // };

  // challengeOpponent = () => {
  //   this.setState({ whatever: true });
  // };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Game Title */}
          <View style={styles.gameTitle}>
            <Text style={styles.tabBarInfoText}>
              I Challange You to a Duel! v1.0.0
            </Text>
          </View>

          {/* Challeng Opponent Button */}
          <TouchableOpacity
            onPress={this.props.socketTrue}
            style={styles.challengeButtonView}
          >
            <Text style={styles.challengeButtonText}>Challenge Opponent</Text>
          </TouchableOpacity>

          {/* Accept Challenge Button */}
          <TouchableOpacity
            onPress={this.props.socketTrue}
            style={styles.acceptChallengeButtonView}
          >
            <Text style={styles.acceptChallengeButtonText}>
              Accept Challenge
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomInfo}>
          <Text style={styles.tabBarInfoText}>
            Challenge an Opponent to a duel!
          </Text>
        </View>
      </View>
    );
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
