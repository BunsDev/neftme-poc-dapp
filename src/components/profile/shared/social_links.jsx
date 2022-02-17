import React from 'react';
import { StyleSheet, View } from 'react-native';
import FacebookIcon from '@assets/icons/facebook.svg';
import InstagramIcon from '@assets/icons/instagram.svg';
import TwitterIcon from '@assets/icons/twitter.svg';

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
      <FacebookIcon width={21} height={19.88} />
    </View>
    <View style={{ marginRight: 41 }}>
      <InstagramIcon width={19.25} height={18.23} />
    </View>
    <TwitterIcon width={19.87} height={15.38} />
  </View>
);

export default SocialLinks;
