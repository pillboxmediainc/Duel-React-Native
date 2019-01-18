import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera, Permissions, Constants, FaceDetector } from 'expo';
import { connect } from 'react-redux';
import { socketFalse } from '../store/reducer';
class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    faces: null,
    hit: false,
    isWinner: false,
    shotsRemaining: 3,
    opponentEmpty: false,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

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
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,

            left: bounds.origin.x,
            top: bounds.origin.y,
            height: bounds.size.height + 200,
          },
        ]}
      >
        {/* <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text> */}
        {/* <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text> */}
      </View>
    );
  }

  renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces ? this.state.faces.map(this.renderFace) : ''}
    </View>
  );

  fire() {
    this.setState({ hit: !this.state.hit });

    if (this.state.hit) {
      console.log('hit');
    } else {
      console.log('miss');
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
              x:{' '}
              {this.state.faces && this.state.faces.length
                ? this.state.faces[0].bounds.origin.x.toFixed(0)
                : 'null'}
            </Text>
            <Text style={styles.textcolor}>
              y:{' '}
              {this.state.faces && this.state.faces.length
                ? this.state.faces[0].bounds.origin.y.toFixed(0)
                : `null`}
            </Text>
          </View>

          {/* Height and Width      */}
          <View style={styles.faceBox}>
            <Text style={styles.textcolor}>
              Heigth:{' '}
              {this.state.faces && this.state.faces.length
                ? this.state.faces[0].bounds.size.height.toFixed(0)
                : 'null'}
            </Text>
            <Text style={styles.textcolor}>
              Width:{' '}
              {this.state.faces && this.state.faces.length
                ? this.state.faces[0].bounds.size.width.toFixed(0)
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
            <View
              onLayout={event => {
                const layout = event.nativeEvent.layout;
                // console.log('height:', layout.height);
                // console.log('width:', layout.width);
                console.log('single-pixel x-coord:', layout.x.toFixed(0));
                console.log('single-pixel y-coord:', layout.y.toFixed(0));
              }}
              style={styles.centerPixel}
            />
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
            {/* <Text style={styles.fireButtonText}> FIRE </Text> */}
          </TouchableOpacity>

          {/* <View style={styles.testPixel} /> */}
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
    top: 110,
    left: 30,
  },
  hitOrMissText: {
    fontSize: 28,
    color: 'black',
  },
  face: {
    padding: 10,
    borderWidth: 10,
    borderRadius: 200,
    position: 'absolute',
    borderColor: 'yellow',
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
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  textcolor: {
    color: 'black',
  },
  fireButtonView: {
    position: 'absolute',
    alignItems: 'center',
    top: 410,
    width: '100%',
    backgroundColor: 'transparent',
  },
  fireButtonText: { fontSize: 28, color: 'red' },
  fireButtonImage: {
    width: 200,
    height: 200,
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
  };
};

export default connect(
  null,
  mapDispatch
)(CameraScreen);
