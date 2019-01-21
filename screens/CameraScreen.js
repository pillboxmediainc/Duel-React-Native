import React from 'react';
import {
  Text,
  View,
  Vibration,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Camera, Permissions, Constants, FaceDetector } from 'expo';
import { connect } from 'react-redux';
import { Audio } from 'expo';
import { socketFalse } from '../store/reducer';
import ShotIcons from '../components/ShotIcons';
import XYCoords from '../components/XYCoords';
import HitOrMiss from '../components/HitOrMiss';
import HitReload from '../components/HitReload';
import Win from './Win';
import Lose from './Lose';
import io from 'socket.io-client';

class CameraScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      faces: null,
      hit: null,
      hitCount: 0,
      isWinner: false,
      isLoser: false,
      shotsRemaining: null,
      opponentEmpty: false,
      centerX: null,
      centerY: null,
      faceX: null,
      faceY: null,
      reload: false,
      splat: 0,
      showSplat: false,
    };

    this.shootSound = new Expo.Audio.Sound();
    this.shootEmptySound = new Expo.Audio.Sound();
    this.reloadSound = new Expo.Audio.Sound();
    this.reloadVoiceSound = new Expo.Audio.Sound();
    this.hitSound = new Expo.Audio.Sound();

    this.socket = io('http://192.168.1.253:3000');
    // this.socket = io('https://ichallengeyoutoaduel.herokuapp.com');
  }

  async componentDidMount() {
    this.socket.on('join-game', () => {
      console.log('We read you loud and clear, Socket. Over.');
    });
    this.socket.on('youlose', () => {
      console.log('registered you lose from server');
      this.socket.disconnect(true);
      this.setState({ isLoser: true });
    });

    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
      this.setState({ shotsRemaining: this.props.shotsRemaining });

      await this.shootSound.loadAsync(require('../assets/sounds/shoot.mp3'));
      await this.shootEmptySound.loadAsync(
        require('../assets/sounds/shoot-empty.mp3')
      );
      await this.reloadSound.loadAsync(require('../assets/sounds/reload.mp3'));
      await this.reloadVoiceSound.loadAsync(
        require('../assets/sounds/reload-voice.mp3')
      );
      await this.hitSound.loadAsync(require('../assets/sounds/hit.mp3'));
    } catch (error) {
      console.error(error);
    }
  }

  setCenter = e => {
    this.setState({
      centerX: e.nativeEvent.layout.x.toFixed(0),
      centerY: e.nativeEvent.layout.y.toFixed(0),
    });
  };

  setFaceXY = face => {
    this.setState({
      faceX: face.nativeEvent.layout.x.toFixed(0),
      faceY: face.nativeEvent.layout.y.toFixed(0),
    });
  };

  handleFacesDetected = ({ faces }) => {
    if (faces.length === 1) {
      this.setState({ faces });
    }

    if (faces.length === 0) {
      this.setState({ faces: null });
    }
  };

  renderFace({ bounds, faceID, rollAngle, yawAngle }) {
    return (
      <View
        onLayout={this.setFaceXY}
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          // { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,

            left: bounds.origin.x,
            top: bounds.origin.y,
            // height: bounds.size.height + 200,
          },
        ]}
      >
        {/* <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text> */}
        {/* <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text> */}
      </View>
    );
  }

  renderFaces = () => (
    //   {this.state.faces ? this.state.faces.map(this.renderFace) : ''}
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces ? this.renderFace(this.state.faces[0]) : ''}
    </View>
  );

  fire = () => {
    if (
      this.state.shotsRemaining > 0 &&
      this.state.faces &&
      this.state.faceX < this.state.centerX &&
      this.state.faceY < this.state.centerY &&
      parseInt(this.state.faceX) +
        parseInt(this.state.faces[0].bounds.size.width.toFixed(0) * 2) >=
        this.state.centerX &&
      parseInt(this.state.faceY) +
        parseInt(this.state.faces[0].bounds.size.height.toFixed(0) + 400) >=
        this.state.centerY
    ) {
      // console.log('hit');

      Vibration.vibrate(100);
      this.hitSound.setPositionAsync(0);
      this.hitSound.playAsync();
      this.hitSound.setPositionAsync(0);
      this.setState({ hit: true, hitCount: this.state.hitCount + 1 });

      if (this.state.hitCount === this.props.hitsToWin - 1) {
        this.socket.emit('iwin');
        this.socket.disconnect(true);
        this.setState({ isWinner: true });
      }
      setTimeout(() => {
        this.setState({ hit: null });
      }, 1000);
    } else {
      // console.log('miss');
      this.setState({ hit: false });
    }
    if (this.state.shotsRemaining > 0) {
      this.shootSound.setPositionAsync(0);
      this.shootSound.playAsync();
      this.shootSound.setPositionAsync(0);
      this.setState({ splat: (this.state.splat + 1) % 4 });
      this.setState({ showSplat: true });

      setTimeout(() => {
        this.setState({ showSplat: false });
      }, 500);
      this.setState({ shotsRemaining: this.state.shotsRemaining - 1 });
    }

    if (this.state.shotsRemaining < 1) {
      this.shootEmptySound.setPositionAsync(0);
      this.shootEmptySound.playAsync();
      this.shootEmptySound.setPositionAsync(0);

      this.reloadVoiceSound.setPositionAsync(0);
      this.reloadVoiceSound.playAsync();
      this.reloadVoiceSound.setPositionAsync(0);
      this.setState({ reload: true });
      setTimeout(() => {
        this.setState({ reload: false });
      }, 600);
    }
  };

  async reload() {
    this.setState({ shotsRemaining: this.props.shotsRemaining });

    try {
      this.reloadSound.setPositionAsync(0);
      await this.reloadSound.playAsync();
      this.reloadSound.setPositionAsync(0);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <Text>
          In order to use this app please go to Settings and grant camera access
          to I Challenge You to a Duel
        </Text>
      );
    } else if (this.state.isWinner) {
      return <Win />;
    } else if (this.state.isLoser) {
      return <Lose />;
    } else {
      return (
        <View
          style={{
            // flex: 1,
            height: '100%',
            width: '100%',
          }}
        >
          {/* Camera */}
          <Camera
            style={styles.camera}
            type={this.state.type}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Mode.none,
              runClassifications: FaceDetector.Constants.Mode.none,
            }}
            onFacesDetected={this.handleFacesDetected}
          />
          {this.state.faces && this.state.faces.length
            ? this.renderFaces()
            : undefined}

          {/* XY DebuggingConsole */}
          {/* <XYCoords state={this.state} styles={styles} /> */}

          {/* Hit or Miss Text Render */}
          {/* <HitOrMiss state={this.state} styles={styles} /> */}

          {/* Hit Animated Gif */}
          {this.state.hit ? (
            <View style={styles.hitReloadView}>
              <Image
                style={styles.hitReloadImage}
                source={require('../assets/images/HIT.png')}
              />
            </View>
          ) : null}

          {/* Reload Animated Gif */}
          {this.state.reload ? (
            <View style={styles.hitReloadView}>
              <Image
                style={styles.hitReloadImage}
                source={require('../assets/images/RELOAD.png')}
              />
            </View>
          ) : null}

          {/* Crosshairs */}
          <TouchableOpacity
            onPress={() => this.fire()}
            style={styles.crosshairsView}
          >
            <Image
              style={styles.crosshairsImage}
              source={require('../assets/images/crosshairs.png')}
            />
            <View onLayout={this.setCenter} style={styles.centerPixel} />

            {/* Splat */}
            {this.state.showSplat && this.state.splat === 0 ? (
              <View>
                <Image
                  style={styles.splateImage1}
                  source={require('../assets/images/splat1.png')}
                />
              </View>
            ) : null}
            {this.state.showSplat && this.state.splat === 1 ? (
              <View>
                <Image
                  style={styles.splateImage2}
                  source={require('../assets/images/splat2.png')}
                />
              </View>
            ) : null}
            {this.state.showSplat && this.state.splat === 2 ? (
              <View>
                <Image
                  style={styles.splateImage3}
                  source={require('../assets/images/splat3.png')}
                />
              </View>
            ) : null}
            {this.state.showSplat && this.state.splat === 3 ? (
              <View>
                <Image
                  style={styles.splateImage4}
                  source={require('../assets/images/splat4.png')}
                />
              </View>
            ) : null}
          </TouchableOpacity>
          {/* End Game Button */}
          <TouchableOpacity
            style={styles.endGameButtonView}
            onPress={this.props.socketFalse}
          >
            <Text style={styles.endGameButtonText}>+</Text>
          </TouchableOpacity>

          {/* Score */}
          <View style={styles.scoreView} onPress={this.props.socketFalse}>
            <Text style={styles.scoreText}>
              Hits to Win: {this.props.hitsToWin - this.state.hitCount}
            </Text>
          </View>

          {/* Fire Button */}
          <TouchableOpacity
            style={styles.fireButtonView}
            onPress={() => this.fire()}
          >
            <Image
              style={styles.fireButtonImage}
              source={require('../assets/images/watergun.png')}
            />
          </TouchableOpacity>

          {/* Shot Icons */}
          <ShotIcons
            shotsRemaining={this.state.shotsRemaining}
            styles={styles}
          />

          {/* Fire Hydrant Icon */}
          <TouchableOpacity
            onPress={() => this.reload()}
            style={styles.hydrantView}
          >
            <Image
              style={styles.hydrantImage}
              source={require('../assets/images/hydrant.png')}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  xyCoords: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 30,
    left: 30,
  },
  faceBox: {
    position: 'absolute',
    top: 70,
    left: 30,
    backgroundColor: 'white',
  },
  hitOrMissView: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 150,
    left: 30,
  },
  hitOrMissText: {
    fontSize: 28,
    color: 'black',
  },
  face: {
    padding: -10,
    borderWidth: 1,
    borderRadius: 100,
    position: 'absolute',
    borderColor: 'red',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  // faceText: {
  //   color: '#32CD32',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   margin: 10,
  //   backgroundColor: 'transparent',
  // },
  facesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  textcolor: {
    color: 'black',
  },
  fireButtonView: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    backgroundColor: 'transparent',
  },
  fireButtonImage: {
    width: 225,
    height: 145,
    backgroundColor: 'transparent',
  },
  crosshairsView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  crosshairsImage: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'transparent',
  },
  centerPixel: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 1,
    height: 1,
    borderRadius: 1,
  },
  endGameButtonView: {
    position: 'absolute',
    top: -15,
    right: 0,
    backgroundColor: 'transparent',
  },
  endGameButtonText: {
    fontSize: 50,
    transform: [{ rotate: '45deg' }],
    color: '#e5262b',
  },
  scoreView: {
    position: 'absolute',
    top: -2,
    left: 3,
    backgroundColor: 'transparent',
  },
  scoreText: {
    fontSize: 28,
    color: '#0ea8fa',
  },
  dropletImage1: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    width: 30,
    height: 30,
  },
  dropletImage2: {
    position: 'absolute',
    bottom: 5,
    left: 35,
    width: 30,
    height: 30,
  },
  dropletImage3: {
    position: 'absolute',
    bottom: 5,
    left: 65,
    width: 30,
    height: 30,
  },
  dropletImage4: {
    position: 'absolute',
    bottom: 5,
    left: 95,
    width: 30,
    height: 30,
  },
  dropletImage5: {
    position: 'absolute',
    bottom: 5,
    left: 125,
    width: 30,
    height: 30,
  },
  dropletImage6: {
    position: 'absolute',
    bottom: 5,
    left: 155,
    width: 30,
    height: 30,
  },
  dropletImage7: {
    position: 'absolute',
    bottom: 5,
    left: 185,
    width: 30,
    height: 30,
  },
  dropletImage8: {
    position: 'absolute',
    bottom: 5,
    left: 215,
    width: 30,
    height: 30,
  },
  dropletImage9: {
    position: 'absolute',
    bottom: 5,
    left: 245,
    width: 30,
    height: 30,
  },
  dropletImage10: {
    position: 'absolute',
    bottom: 5,
    left: 275,
    width: 30,
    height: 30,
  },
  // hydrantView: {
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  // },
  hydrantImage: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 42,
    height: 100,
  },
  hitReloadView: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  hitReloadImage: {
    position: 'absolute',
    top: 40,
  },
  splatView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  splateImage1: {
    width: 65,
    height: 65,
    backgroundColor: 'transparent',
  },
  splateImage2: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  splateImage3: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  splateImage4: {
    width: 65,
    height: 65,
    backgroundColor: 'transparent',
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
    socketFalse: () => {
      dispatch(socketFalse());
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(CameraScreen);
