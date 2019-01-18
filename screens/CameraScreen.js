import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera, Permissions, Constants, FaceDetector } from 'expo';
import { connect } from 'react-redux';
import { socketFalse } from '../store/reducer';
class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    faceDetecting: true,
    faceDetected: false,
    faces: null,
    isFaceOnCrosshairs: true,
    isWinner: false,
    shotsRemaining: 3,
    opponentEmpty: false,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
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
    this.setState({ isFaceOnCrosshairs: !this.state.isFaceOnCrosshairs });

    if (this.state.isFaceOnCrosshairs) {
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
        <View style={{ flex: 1 }}>
          {/* Camera */}
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Mode.none,
              runClassifications: FaceDetector.Constants.Mode.none,
            }}
            onFacesDetected={this.handleFacesDetected}
          >
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
                {`${this.state.isFaceOnCrosshairs ? 'hit' : 'miss'}`}
              </Text>

              {/* Fire Button */}
              <TouchableOpacity
                style={styles.fireButton}
                onPress={() => this.fire()}
              >
                <Text style={styles.fireButtonText}> FIRE </Text>
              </TouchableOpacity>

              {/* End Game Button */}
              <TouchableOpacity
                style={styles.endGameButton}
                onPress={() => this.props.socketFalse()}
              >
                <Text style={styles.endGameButtonText}> END GAME </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.crosshairs}>
              <Image source={require('../assets/images/crosshairs.png')} />
            </View>
          </Camera>
          {this.state.faces && this.state.faces.length
            ? this.renderFaces()
            : undefined}
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
  // camera: {
  //   flex: 1,
  //   justifyContent: 'space-between',
  // },
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
  face: {
    padding: 10,
    borderWidth: 10,
    borderRadius: 200,
    position: 'absolute',
    borderColor: 'yellow',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  faceText: {
    color: '#32CD32',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
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
  fireButton: {
    position: 'absolute',
    bottom: 20,
    right: '50%',
  },
  fireButtonText: { fontSize: 28, marginBottom: 10, color: 'red' },
  crosshairs: {
    position: 'absolute',
    bottom: '50%',
    right: '50%',
    // left: 0,
    // top: 0,
  },
  endGameButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  endGameButtonText: { fontSize: 28, marginBottom: 10, color: 'white' },
  hitOrMissView: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  hitOrMissText: {
    fontSize: 28,
    color: 'white',
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
  };
};

export default connect(
  null,
  mapDispatch
)(CameraScreen);
