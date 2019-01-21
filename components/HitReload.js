import React from 'react';
import { View, Image } from 'react-native';

export default class HitReload extends React.Component {
  render() {
    return (
      <View>
        {/* Hit Icon */}
        {this.props.hit ? (
          <View style={this.props.styles.hitReloadView}>
            <Image
              style={this.props.styles.hitReloadImage}
              source={require('../assets/images/HIT.png')}
            />
          </View>
        ) : null}

        {/* Reload Icon */}
        {/* {this.props.hit ? (
          <View style={this.props.styles.dropletView}>
            <Image
              style={this.props.styles.dropletImage1}
              source={require('../assets/images/droplet.png')}
            />
          </View>
        ) : null} */}
      </View>
    );
  }
}
