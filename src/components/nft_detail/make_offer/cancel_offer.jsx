import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { convertFromETH18 } from '@utils/nft';
import styles from './styles';

const CancelOffer = ({ currentUserBid }) => {
  const cancelOffer = async () => {
    // TODO: CANCEL MY BID;
  };

  return (
    <View style={styles.cancelOfferContainer}>
      <Text style={styles.offeredText}>{`You offered ${convertFromETH18(currentUserBid[2])} $NEFTS`}</Text>
      <TouchableOpacity onPress={cancelOffer}>
        <Text style={styles.cancelOfferButton}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

CancelOffer.propTypes = {
  currentUserBid: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  ).isRequired,
};

export default CancelOffer;
