import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-native';
import styles from './styles';

const tokenIcon = require('@assets/icons_web/token.png');

const Tokenomics = ({ nft }) => (
  <View style={styles.tokenomicsContainer}>
    <View style={styles.stakedContainer}>
      <Image source={tokenIcon} style={{ width: 34, height: 34 }} />
      <View>
        <Text style={styles.stakedStyle}>staked</Text>
        <Text style={styles.neftsAmountStyle}>{`${nft.staked} nefts`}</Text>
      </View>
    </View>
    <View style={styles.verticalLine} />
    <View style={styles.supportersContainer}>
      <Text style={styles.economicDetails}>
        <Text style={styles.fontWeight700}>{`${nft.profitPercentage}% `}</Text>
        <Text>goes to</Text>
      </Text>
      <Text style={[styles.economicDetails, styles.fontWeight700]}>{` ${nft.supporters} supporters`}</Text>
    </View>
  </View>
);

Tokenomics.propTypes = {
  nft: PropTypes.shape({
    staked: PropTypes.number.isRequired,
    profitPercentage: PropTypes.number.isRequired,
    supporters: PropTypes.number.isRequired,
  }).isRequired,
};

export default Tokenomics;
