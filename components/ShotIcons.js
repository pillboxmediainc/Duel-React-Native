import React from 'react';
import { View, Image } from 'react-native';

export default class ShotIcons extends React.Component {
  render() {
    return (
      <View>
        {/* Droplet 1 */}
        {this.props.shotsRemaining > 0 ? (
          <View style={this.props.styles.dropletView}>
            <Image
              style={this.props.styles.dropletImage1}
              source={require('../assets/images/droplet.png')}
            />
          </View>
        ) : null}

        {/* Droplet 2 */}
        {this.props.shotsRemaining > 1 ? (
          <View style={this.props.styles.dropletView}>
            <Image
              style={this.props.styles.dropletImage2}
              source={require('../assets/images/droplet.png')}
            />
          </View>
        ) : null}

        {/* Droplet 3 */}
        {this.props.shotsRemaining > 2 ? (
          <View style={this.props.styles.dropletView}>
            <Image
              style={this.props.styles.dropletImage3}
              source={require('../assets/images/droplet.png')}
            />
          </View>
        ) : null}

        {/* Droplet 4 */}
        {this.props.shotsRemaining > 3 ? (
          <View style={this.props.styles.dropletView}>
            <Image
              style={this.props.styles.dropletImage4}
              source={require('../assets/images/droplet.png')}
            />
          </View>
        ) : null}

        {/* Droplet 5 */}
        {this.props.shotsRemaining > 4 ? (
          <View style={this.props.styles.dropletView}>
            <Image
              style={this.props.styles.dropletImage5}
              source={require('../assets/images/droplet.png')}
            />
          </View>
        ) : null}

        {/* Droplet 6 */}
        {this.props.shotsRemaining > 5 ? (
          <View style={this.props.styles.dropletView}>
            <Image
              style={this.props.styles.dropletImage6}
              source={require('../assets/images/droplet.png')}
            />
          </View>
        ) : null}

        {/* Droplet 7 */}
        {this.props.shotsRemaining > 6 ? (
          <View style={this.props.styles.dropletView}>
            <Image
              style={this.props.styles.dropletImage7}
              source={require('../assets/images/droplet.png')}
            />
          </View>
        ) : null}

        {/* Droplet 8 */}
        {this.props.shotsRemaining > 7 ? (
          <View style={this.props.styles.dropletView}>
            <Image
              style={this.props.styles.dropletImage8}
              source={require('../assets/images/droplet.png')}
            />
          </View>
        ) : null}

        {/* Droplet 9 */}
        {this.props.shotsRemaining > 8 ? (
          <View style={this.props.styles.dropletView}>
            <Image
              style={this.props.styles.dropletImage9}
              source={require('../assets/images/droplet.png')}
            />
          </View>
        ) : null}

        {/* Droplet 10 */}
        {this.props.shotsRemaining > 9 ? (
          <View style={this.props.styles.dropletView}>
            <Image
              style={this.props.styles.dropletImage10}
              source={require('../assets/images/droplet.png')}
            />
          </View>
        ) : null}
      </View>
    );
  }
}
