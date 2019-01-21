import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChallengeScreen from './ChallengeScreen';
import { connect } from 'react-redux';
import {
  increaseShots,
  decreaseShots,
  increaseHits,
  decreaseHits,
} from '../store/reducer';

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

  conditionalIncreaseShots = () => {
    if (this.props.shotsRemaining < 9) {
      this.props.increaseShots();
    }
  };

  conditionalDecreaseShots = () => {
    if (this.props.shotsRemaining > 1) {
      this.props.decreaseShots();
    }
  };

  conditionalIncreaseHits = () => {
    if (this.props.hitsToWin < 100) {
      this.props.increaseHits();
    }
  };

  conditionalDecreaseHits = () => {
    if (this.props.hitsToWin > 1) {
      this.props.decreaseHits();
    }
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

        {/* Slate Image */}
        <View style={styles.slateView}>
          <Image
            style={styles.slateImage}
            source={require('../assets/images/settings-background.png')}
          />
        </View>

        <View style={styles.buttonContainer}>
          {/* Number of Hits */}
          <Text style={styles.hitsText}>
            Number of Hits to Win: {this.props.hitsToWin}
          </Text>
          <TouchableOpacity
            onPress={this.conditionalIncreaseHits}
            style={styles.hitsPlus}
          >
            <Image
              source={require('../assets/images/button-plus.png')}
              style={styles.hitsPlus}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.conditionalDecreaseHits}
            style={styles.hitsMinus}
          >
            <Image
              source={require('../assets/images/button-minus.png')}
              style={styles.hitsMinus}
            />
          </TouchableOpacity>

          {/* Number of Shots */}

          <Text style={styles.shotsText}>
            Number of Shots: {this.props.shotsRemaining}
          </Text>
          <TouchableOpacity
            onPress={this.conditionalIncreaseShots}
            style={styles.shotsPlus}
          >
            <Image
              source={require('../assets/images/button-plus.png')}
              style={styles.shotsPlus}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.conditionalDecreaseShots}
            style={styles.shotsMinus}
          >
            <Image
              source={require('../assets/images/button-minus.png')}
              style={styles.shotsMinus}
            />
          </TouchableOpacity>
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
    top: 0,
    width: 250,
    height: 250,
  },
  slateView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  slateImage: {
    position: 'absolute',
    top: 162,
    width: 320,
    height: 330,
  },
  settingsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsView: {
    top: 10,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  hitsText: {
    position: 'absolute',
    marginTop: 180,
    color: '#ccfffe',
    fontWeight: 'bold',
  },
  invisible: {
    position: 'absolute',
    marginTop: 0,
    width: 200,
    height: 62,
  },
  hitsPlus: {
    position: 'absolute',
    marginTop: 100,
    width: 200,
    height: 62,
  },
  hitsMinus: {
    position: 'absolute',
    marginTop: 130,
    width: 200,
    height: 62,
  },
  shotsText: {
    position: 'absolute',
    marginTop: 325,
    color: '#ccfffe',
    fontWeight: 'bold',
  },
  shotsPlus: {
    position: 'absolute',
    marginTop: 170,
    width: 200,
    height: 62,
  },
  shotsMinus: {
    position: 'absolute',
    marginTop: 200,
    width: 200,
    height: 62,
  },
});

const mapState = state => {
  return {
    shotsRemaining: state.shotsRemaining,
    hitsToWin: state.hitsToWin,
  };
};

const mapDispatch = dispatch => {
  return {
    increaseShots: () => {
      dispatch(increaseShots());
    },
    decreaseShots: () => {
      dispatch(decreaseShots());
    },
    increaseHits: () => {
      dispatch(increaseHits());
    },
    decreaseHits: () => {
      dispatch(decreaseHits());
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(Settings);
