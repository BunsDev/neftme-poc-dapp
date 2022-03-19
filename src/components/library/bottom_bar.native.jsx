import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeIcon from '@assets/icons/home.svg';
import CreateIcon from '@assets/icons/create_nft.svg';
import SearchIcon from '@assets/icons/search.svg';

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
  createNftIcon: {
    marginHorizontal: 75,
  },
});

const BottomBar = () => (
  <View style={styles.bottomBar}>
    <HomeIcon width={24} height={25} />
    <CreateIcon style={styles.createNftIcon} width={43.35} height={44} />
    <SearchIcon width={22.42} height={23.54} />
  </View>
);

export default BottomBar;
