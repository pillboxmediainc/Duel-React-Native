import React from 'react';
import { View, Text, Image } from 'react-native';

export default class XYCoords extends React.Component {
  render() {
    return (
      <View style={this.props.styles.xyCoords}>
        {/* XY Coordinate Display */}
        <Text style={this.props.styles.textcolor}>
          CenterX:{' '}
          {this.props.state.faces && this.props.state.faces.length
            ? this.props.state.centerX
            : 'null'}
        </Text>
        <Text style={this.props.styles.textcolor}>
          TopLeftFaceX:{' '}
          {this.props.state.faces &&
          this.props.state.faces.length &&
          this.props.state.faceX
            ? this.props.state.faceX
            : 'null'}
        </Text>
        <Text style={this.props.styles.textcolor}>
          Width:{' '}
          {this.props.state.faces && this.props.state.faces.length
            ? this.props.state.faces[0].bounds.size.width.toFixed(0)
            : 'null'}
        </Text>
        {/* <Text style={this.props.styles.textcolor}>
            TopRightX:{' '}
            {this.props.state.faces && this.props.state.faces.length && this.props.state.faceX
              ? parseInt(this.props.state.faceX) +
                parseInt(this.props.state.faces[0].bounds.size.width.toFixed(0))
              : 'null'}
          </Text> */}
        <Text style={this.props.styles.textcolor}>
          CenterY:{' '}
          {this.props.state.faces && this.props.state.faces.length
            ? this.props.state.centerY
            : 'null'}
        </Text>
        <Text style={this.props.styles.textcolor}>
          TopLeftFaceY:{' '}
          {this.props.state.faces &&
          this.props.state.faces.length &&
          this.props.state.faceX
            ? this.props.state.faceY
            : 'null'}
        </Text>
        {/* <Text style={this.props.styles.textcolor}>
            BottomLeftY:{' '}
            {this.props.state.faces && this.props.state.faces.length && this.props.state.faceX
              ? parseInt(this.props.state.faceY) +
                parseInt(this.props.state.faces[0].bounds.size.height.toFixed(0))
              : 'null'}
          </Text> */}
        <Text style={this.props.styles.textcolor}>
          Height:{' '}
          {this.props.state.faces && this.props.state.faces.length
            ? this.props.state.faces[0].bounds.size.height.toFixed(0)
            : 'null'}
        </Text>
      </View>
    );
  }
}
