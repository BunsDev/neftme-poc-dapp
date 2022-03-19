import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import TokenIcon from '@assets/icons/token.svg';

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 8,
    width: '27%',
    maxWidth: 109,
    marginBottom: 10,
  },
  image: {
    height: 112,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tokenContainer: {
    flexDirection: 'row',
    backgroundColor: '#313141',
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  tokenValue: {
    fontSize: 12,
    color: '#FCFCFCB8',
    marginLeft: 4,
  },
});

const NftItem = ({ nft }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: nft.image }} style={styles.image} />
    {nft?.value && (
      <View style={styles.tokenContainer}>
        <TokenIcon width={17} height={17} />
        <Text style={styles.tokenValue}>{`${nft.value} NEFTS`}</Text>
      </View>
    )}
  </View>
);

NftItem.propTypes = {
  nft: PropTypes.shape({
    image: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
};

export default NftItem;
