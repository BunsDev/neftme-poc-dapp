import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const facebookIcon = require('@assets/icons_web/facebook.png');
const instagramIcon = require('@assets/icons_web/instagram.png');
const twitterIcon = require('@assets/icons_web/twitter.png');

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const SocialLinks = () => (
  <View style={styles.container}>
    <View style={{ marginRight: 41 }}>
      <Image source={facebookIcon} style={{ width: 21, height: 19.88 }} />
    </View>
    <View style={{ marginRight: 41 }}>
      <Image source={instagramIcon} style={{ width: 19.25, height: 18.23 }} />
    </View>
    <Image source={twitterIcon} style={{ width: 19.87, height: 15.38 }} />
  </View>
);

export default SocialLinks;
