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
          <View style={styles.challengeButton}>
            <TouchableOpacity
              onPress={this.props.socketTrue}
              style={styles.helpLink}
            >
              <Text style={styles.challengeButtonText}>Challenge Opponent</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.acceptChallengeButton}>
            <TouchableOpacity
              onPress={this.props.socketTrue}
              style={styles.helpLink}
            >
              <Text style={styles.acceptChallengeButtonText}>
                Accept Challenge
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabBarInfoContainerTop}>
          <Text style={styles.tabBarInfoText}>I Challange You to a Duel!</Text>
        </View>

        <View style={styles.tabBarInfoContainerBottom}>
          <Text style={styles.tabBarInfoText}>
            Helpful information for User can go here.
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
  // developmentModeText: {
  //   marginBottom: 20,
  //   color: 'rgba(0,0,0,0.4)',
  //   fontSize: 14,
  //   lineHeight: 19,
  //   textAlign: 'center',
  // },
  contentContainer: {
    paddingTop: 30,
  },
  // welcomeContainer: {
  //   alignItems: 'center',
  //   marginTop: 10,
  //   marginBottom: 20,
  // },
  // welcomeImage: {
  //   width: 100,
  //   height: 80,
  //   resizeMode: 'contain',
  //   marginTop: 3,
  //   marginLeft: -10,
  // },
  // getStartedContainer: {
  //   alignItems: 'center',
  //   marginHorizontal: 50,
  // },
  // homeScreenFilename: {
  //   marginVertical: 7,
  // },
  // codeHighlightText: {
  //   color: 'rgba(96,100,109, 0.8)',
  // },
  // codeHighlightContainer: {
  //   backgroundColor: 'rgba(0,0,0,0.05)',
  //   borderRadius: 3,
  //   paddingHorizontal: 4,
  // },
  // gameTitle: {
  //   fontSize: 17,
  //   color: 'rgba(96,100,109, 1)',
  //   lineHeight: 24,
  //   textAlign: 'center',
  //   marginVertical: 90,
  // },
  tabBarInfoContainerTop: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoContainerBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  // navigationFilename: {
  //   marginTop: 5,
  // },
  challengeButton: {
    marginTop: 115,
    alignItems: 'center',
  },
  challengeButtonText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  acceptChallengeButton: {
    marginTop: 115,
    alignItems: 'center',
  },
  acceptChallengeButtonText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  // helpLink: {
  //   paddingVertical: 15,
  // },
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
