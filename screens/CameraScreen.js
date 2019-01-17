import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Touchable,
  StyleSheet,
} from 'react-native';
import { Camera, Permissions, Constants, FaceDetector } from 'expo';

export default class CameraScreen extends React.Component {
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
            top: bounds.origin.y - 50,
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
            <View style={styles.topBar}>
              <Text style={styles.textcolor}>
                x:{' '}
                {this.state.faces && this.state.faces.length
                  ? this.state.faces[0].bounds.origin.x.toFixed(0)
                  : 0}
              </Text>
              <Text style={styles.textcolor}>
                y:{' '}
                {this.state.faces && this.state.faces.length
                  ? this.state.faces[0].bounds.origin.y.toFixed(0)
                  : 0}
              </Text>
            </View>

            <View style={styles.bottomBar}>
              <Text style={styles.textcolor}>
                Heigth:{' '}
                {this.state.faces && this.state.faces.length
                  ? this.state.faces[0].bounds.size.height.toFixed(0)
                  : 0}
              </Text>
              <Text style={styles.textcolor}>
                width:{' '}
                {this.state.faces && this.state.faces.length
                  ? this.state.faces[0].bounds.size.width.toFixed(0)
                  : 0}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  color: 'white',
                }}
              >
                {`${this.state.isFaceOnCrosshairs ? 'hit' : 'miss'}`}
              </Text>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end',
                }}
                onPress={() => this.fire()}
              >
                <Text
                  style={{ fontSize: 28, marginBottom: 10, color: 'white' }}
                >
                  {' '}
                  Fire{' '}
                </Text>
              </TouchableOpacity>
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
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight + 1,
  },
  bottomBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    color: '#008080',
  },
});
