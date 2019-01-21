import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
// import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';
import HomeScreen from './screens/HomeScreen';

console.disableYellowBox = true;
const store = createStore(reducer);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && (
            <StatusBar barStyle="default" hidden={true} />
          )}
          <Provider store={store}>
            <HomeScreen />
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/images/pool-animation.gif'),
        require('./assets/images/1.png'),
        require('./assets/images/2.png'),
        require('./assets/images/3.png'),
        require('./assets/images/4.png'),
        require('./assets/images/5.png'),
        require('./assets/images/battle.png'),
        require('./assets/images/button-back.png'),
        require('./assets/images/button-how-to-play.png'),
        require('./assets/images/button-join-game.png'),
        require('./assets/images/button-minus.png'),
        require('./assets/images/button-plus.png'),
        require('./assets/images/button-rematch.png'),
        require('./assets/images/button-settings.png'),
        require('./assets/images/crosshairs.png'),
        require('./assets/images/droplet.png'),
        require('./assets/images/header-game-over.png'),
        require('./assets/images/header-get-ready.png'),
        require('./assets/images/header-how-to-play.png'),
        require('./assets/images/header-settings.png'),
        require('./assets/images/HIT.png'),
        require('./assets/images/how-to-play.png'),
        require('./assets/images/hydrant.png'),
        require('./assets/images/icon.png'),
        require('./assets/images/Pillbox-Media-Inc-Logo.png'),
        require('./assets/images/RELOAD.png'),
        require('./assets/images/splash-royale-logo.png'),
        require('./assets/images/splat1.png'),
        require('./assets/images/splat2.png'),
        require('./assets/images/splat3.png'),
        require('./assets/images/splat4.png'),
        require('./assets/images/watergun.png'),
        require('./assets/images/you-win.png'),
        require('./assets/images/you-lose.png'),
        require('./assets/sounds/battle.mp3'),
        require('./assets/sounds/countdown.mp3'),
        require('./assets/sounds/game-over-voice.mp3'),
        require('./assets/sounds/game-over.mp3'),
        require('./assets/sounds/get-ready.mp3'),
        require('./assets/sounds/hit.mp3'),
        require('./assets/sounds/reload-voice.mp3'),
        require('./assets/sounds/reload.mp3'),
        require('./assets/sounds/shoot-empty.mp3'),
        require('./assets/sounds/shoot.mp3'),
        require('./assets/sounds/splash-royale.mp3'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
