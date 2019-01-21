import React from 'react';
import { View, Text } from 'react-native';

export default class HitOrMiss extends React.Component {
  render() {
    return (
      <View style={this.props.styles.hitOrMissView}>
        <Text style={this.props.styles.hitOrMissText}>
          {`${this.props.state.hit ? 'hit' : 'miss'}`}
        </Text>
        <Text style={this.props.styles.hitOrMissText}>
          Hits: {this.props.state.hitCount}
        </Text>
        <Text style={this.props.styles.hitOrMissText}>
          shotsleft: {this.props.state.shotsRemaining}
        </Text>
      </View>
    );
  }
}
