import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera, Permissions, Constants, FaceDetector } from 'expo';
import { connect } from 'react-redux';
import { socketFalse } from '../store/reducer';
import ShotIcons from '../components/ShotIcons';

class CameraScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      faces: null,
      hit: null,
      isWinner: false,
      shotsRemaining: this.props.shotsRemaining,
      opponentEmpty: false,
      centerX: null,
      centerY: null,
      faceX: 'string',
      faceY: 'string',
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
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
    // <View style={styles.facesContainer} pointerEvents="none">
    //   {this.state.faces ? this.state.faces.map(this.renderFace) : ''}
    // </View>
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces ? this.renderFace(this.state.faces[0]) : ''}
    </View>
  );

  fire() {
    if (
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
      this.setState({ hit: true });
    } else {
      // console.log('miss');
      this.setState({ hit: false });
    }

    this.setState({ shotsRemaining: this.state.shotsRemaining - 1 });
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

          {/* XY Coordinate Display */}
          <View style={styles.xyCoords}>
            <Text style={styles.textcolor}>
              CenterX:{' '}
              {this.state.faces && this.state.faces.length
                ? this.state.centerX
                : 'null'}
            </Text>
            <Text style={styles.textcolor}>
              TopLeftFaceX:{' '}
              {this.state.faces && this.state.faces.length && this.state.faceX
                ? this.state.faceX
                : 'null'}
            </Text>
            <Text style={styles.textcolor}>
              Width:{' '}
              {this.state.faces && this.state.faces.length
                ? this.state.faces[0].bounds.size.width.toFixed(0)
                : 'null'}
            </Text>
            {/* <Text style={styles.textcolor}>
              TopRightX:{' '}
              {this.state.faces && this.state.faces.length && this.state.faceX
                ? parseInt(this.state.faceX) +
                  parseInt(this.state.faces[0].bounds.size.width.toFixed(0))
                : 'null'}
            </Text> */}
            <Text style={styles.textcolor}>
              CenterY:{' '}
              {this.state.faces && this.state.faces.length
                ? this.state.centerY
                : 'null'}
            </Text>
            <Text style={styles.textcolor}>
              TopLeftFaceY:{' '}
              {this.state.faces && this.state.faces.length && this.state.faceX
                ? this.state.faceY
                : 'null'}
            </Text>
            {/* <Text style={styles.textcolor}>
              BottomLeftY:{' '}
              {this.state.faces && this.state.faces.length && this.state.faceX
                ? parseInt(this.state.faceY) +
                  parseInt(this.state.faces[0].bounds.size.height.toFixed(0))
                : 'null'}
            </Text> */}
            <Text style={styles.textcolor}>
              Height:{' '}
              {this.state.faces && this.state.faces.length
                ? this.state.faces[0].bounds.size.height.toFixed(0)
                : 'null'}
            </Text>
          </View>

          {/* Hit or Miss Text Render */}
          <View style={styles.hitOrMissView}>
            <Text style={styles.hitOrMissText}>
              {`${this.state.hit ? 'hit' : 'miss'}`}
            </Text>
          </View>

          {/* Crosshairs */}
          <View style={styles.crosshairsView}>
            <Image
              style={styles.crosshairsImage}
              source={require('../assets/images/crosshairs.png')}
            />
            <View onLayout={this.setCenter} style={styles.centerPixel} />
          </View>

          {/* End Game Button */}
          <TouchableOpacity
            style={styles.endGameButtonView}
            onPress={() => this.props.socketFalse()}
          >
            <Text style={styles.endGameButtonText}> Home </Text>
          </TouchableOpacity>

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
    // flex: 1,
    // justifyContent: 'space-between',
  },
  xyCoords: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 30,
    left: 30,
    // flexDirection: 'row',
    // justifyContent: 'space-bet',
    // paddingTop: Constants.statusBarHeight + 1,
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
    // bottom: 0,
    // right: 0,
    // left: 0,
    // top: 0,
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
  fireButtonText: { fontSize: 28, color: 'red' },
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
  // testPixel: {
  //   position: 'absolute',
  //   top: 284,
  //   left: 160,
  //   backgroundColor: 'yellow',
  //   width: 4,
  //   height: 4,
  //   borderRadius: 1,
  // },
  endGameButtonView: {
    position: 'absolute',
    alignItems: 'center',
    top: 20,
    width: '100%',
    backgroundColor: 'transparent',
  },
  endGameButtonText: { fontSize: 28, color: 'white' },
  dropletView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
});

const mapState = state => {
  return {
    shotsRemaining: state.shotsRemaining,
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
