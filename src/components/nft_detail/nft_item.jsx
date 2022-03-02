import React from 'react';
import PropTypes from 'prop-types';
import { ProfilePicture } from '@library';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#2B2F3A',
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 20,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    color: '#FCFCFC',
    fontWeight: '600',
  },
});

const NftItem = ({ nft }) => (
  <View style={styles.itemContainer}>
    <ProfilePicture profilePictureUrl={nft.image} pictureStyle={styles.image} />
    <Text style={styles.name}>{nft.name}</Text>
  </View>
);

NftItem.propTypes = {
  nft: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default NftItem;
