import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera, Permissions, Constants, FaceDetector } from 'expo';
import { connect } from 'react-redux';
import { socketFalse } from '../store/reducer';
import ShotIcons from '../components/ShotIcons';
import XYCoords from '../components/XYCoords';
import HitOrMiss from '../components/HitOrMiss';
import HitReload from '../components/HitReload';
import Win from './Win';

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
      shotsRemaining: null,
      opponentEmpty: false,
      centerX: null,
      centerY: null,
      faceX: null,
      faceY: null,
      reload: false,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    this.setState({ shotsRemaining: this.props.shotsRemaining });
    console.log('build complete');
  }

  componentDidUpdate() {
    // console.log('center x:', this.state.centerX);
    // console.log('center y:', this.state.centerY);
    // console.log('face x:', this.state.faceX);
    // console.log('face y:', this.state.faceY);
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

  fire() {
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
      this.setState({ hit: true, hitCount: this.state.hitCount + 1 });
      setTimeout(() => {
        this.setState({ hit: null });
      }, 600);
    } else {
      // console.log('miss');
      this.setState({ hit: false });
    }
    if (this.state.shotsRemaining > 0) {
      this.setState({ shotsRemaining: this.state.shotsRemaining - 1 });
    }

    if (this.state.shotsRemaining < 1) {
      this.setState({ reload: true });
      setTimeout(() => {
        this.setState({ reload: false });
      }, 600);
    }
  }

  reload() {
    this.setState({ shotsRemaining: this.props.shotsRemaining });
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
    } else if (this.state.hitCount === this.props.hitsToWin) {
      return <Win />;
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
                source={require('../assets/images/HIT.gif')}
              />
            </View>
          ) : null}

          {/* Reload Animated Gif */}
          {this.state.reload ? (
            <View style={styles.hitReloadView}>
              <Image
                style={styles.hitReloadImage}
                source={require('../assets/images/RELOAD.gif')}
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
            style={styles.hydrantView}
            onPress={() => this.reload()}
          >
            <Image
              onPress={this.reload}
              style={styles.hydrantImage}
              source={require('../assets/images/firehydrant.png')}
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
    width: 3,
    height: 3,
    borderRadius: 2,
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
    width: 21,
    height: 50,
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
