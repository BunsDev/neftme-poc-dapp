import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { useSmartContract } from '@hooks';
import Constants from 'expo-constants';
import { convertFromNFTAmount } from '@utils/nft';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 40,
    backgroundColor: '#222128',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexWrap: 'wrap',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  card: {
    paddingHorizontal: 29.5,
    paddingVertical: 15.5,
    alignItems: 'center',
    borderRightColor: '#101012',
    borderRightWidth: 0.2,
    borderBottomColor: '#101012',
    borderBottomWidth: 0.2,
    width: '33.333%',
  },
  statText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#FCFCFC',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    textAlign: 'center',
  },
});

const Stats = ({ userWalletAddress }) => {
  const [userStats, setUserStats] = useState([
    {
      label: 'Total Sales',
      value: '-',
    },
    {
      label: "NFT's sold",
      value: '0',
    },
    {
      label: "NEFT's Staked",
      value: '0',
    },
    {
      label: 'Avg royalties',
      value: '0',
    },
    {
      label: "NFT's Supporters",
      value: '0',
    },
    {
      label: "NFT's Available",
      value: '0',
    },
  ]);
  const { getContractMethods } = useSmartContract();

  const getUserStats = async () => {
    if (!userWalletAddress) return;

    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeViewContractAddress,
    );
    try {
      const response = await contractMethods.getStatsByAddress(userWalletAddress).call();
      setUserStats([
        {
          label: 'Total Sales',
          value: '-',
        },
        {
          label: "NFT's sold",
          value: response[0],
        },
        {
          label: "NEFT's Staked",
          value: response[1],
        },
        {
          label: 'Avg royalties',
          value: `${convertFromNFTAmount(response[2])}%`,
        },
        {
          label: "NFT's Supporters",
          value: response[3],
        },
        {
          label: "NFT's Available",
          value: response[4],
        },
      ]);
    } catch (err) {
      // log error :) or not
    }
  };

  useEffect(() => {
    getUserStats();
  }, []);

  return (
    <View style={styles.container}>
      {userStats.map(({ label, value }) => (
        <View style={styles.card} key={label}>
          <Text style={styles.statText}>{value}</Text>
          <Text style={styles.statLabel}>{label}</Text>
        </View>
      ))}
    </View>
  );
};

Stats.defaultProps = {
  userWalletAddress: null,
};

Stats.propTypes = {
  userWalletAddress: PropTypes.string,
};

export default Stats;
