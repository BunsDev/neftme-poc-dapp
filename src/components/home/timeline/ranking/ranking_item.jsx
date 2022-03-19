import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-native';
import styles from './styles';

const tokenIcon = require('@assets/icons_web/token.png');

const RankingItem = ({ item }) => (
  <View style={styles.rakingItemContainer}>
    <Text style={styles.rankText}>{item.rank}</Text>
    <Image style={styles.rankProfilePhoto} source={{ uri: item.profilePhoto }} />
    <View>
      <Text style={styles.itemNameText}>{item.name}</Text>
      <View style={styles.stakeContainer}>
        <Image source={tokenIcon} style={{ width: 17, height: 17 }} />
        <Text style={styles.itemStakedText}>
          {`${item.staked} STAKED`}
        </Text>
      </View>
    </View>
  </View>
);

RankingItem.propTypes = {
  item: PropTypes.shape({
    rank: PropTypes.number.isRequired,
    profilePhoto: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    staked: PropTypes.string.isRequired,
  }).isRequired,
};

export default RankingItem;
