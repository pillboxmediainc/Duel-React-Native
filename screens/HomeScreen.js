import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ProgressViewIOS,
  TouchableOpacity,
  View,
} from 'react-native';
// import { WebBrowser } from 'expo';
// import { MonoText } from '../components/StyledText';
import ChallengeScreen from './ChallengeScreen';
import GetReady from './GetReady';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      progress: 0,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ progress: this.state.progress + 0.0075 });
    }, 10);

    setTimeout(() => {
      this.setState({ loading: false });
    }, 2700);
  }

  componentWillUnmount() {
    clearInterval();
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.mainView}>
          <View style={styles.logoAndLoading}>
            <Image
              style={styles.logo}
              source={require('../assets/images/Pillbox-Media-Inc-Logo.png')}
            />
            <ProgressViewIOS
              style={styles.progressBar}
              trackTintColor="black"
              progressViewStyle="default"
              progress={this.state.progress}
            />
            {/* <Text style={styles.loading}>Loading...</Text> */}
          </View>
          <View style={styles.copyRight}>
            <Text>&copy;2019 Pillbox Media, Inc.</Text>
          </View>
        </View>
      );
    }
    if (!this.props.socketConnection) {
      return <ChallengeScreen />;
    } else {
      return <GetReady />;
    }
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  mainView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#fcfcfc',
    alignItems: 'center',
  },
  logoAndLoading: {
    alignItems: 'center',
    position: 'absolute',
    top: 100,
  },
  logo: {
    width: 250,
    height: 150,
  },
  loading: {},
  copyRight: {
    position: 'absolute',
    bottom: 5,
  },
  progressBar: {
    paddingTop: 50,
    width: 100,
    transform: [{ scaleX: 1.0 }, { scaleY: 2.5 }],
  },
});

const mapState = state => {
  return {
    socketConnection: state.socketConnection,
  };
};

// const mapDispatch = dispatch => {
//   return {
//     socketTrue: () => {
//       dispatch(socketTrue());
//     },
//   };
// };

export default connect(
  mapState,
  null
)(HomeScreen);
