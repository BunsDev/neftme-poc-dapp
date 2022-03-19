import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const homeIcon = require('@assets/icons_web/home.png');
const createNftIcon = require('@assets/icons_web/create_nft.png');
const searchIcon = require('@assets/icons_web/search.png');

const styles = StyleSheet.create({
  bottomBar: {
    width: '100%',
    height: 78,
    backgroundColor: '#313141',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    width: 24,
    height: 25,
  },
  createNftIcon: {
    width: 43.35,
    height: 44,
    marginHorizontal: 75,
  },
  searchIcon: {
    width: 22.42,
    height: 23.54,
  },
});

const BottomBar = () => (
  <View style={styles.bottomBar}>
    <Image source={homeIcon} style={styles.homeIcon} />
    <Image source={createNftIcon} style={styles.createNftIcon} />
    <Image source={searchIcon} style={styles.searchIcon} />
  </View>
);

export default BottomBar;
