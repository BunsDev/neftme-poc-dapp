import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import TokenIcon from '@assets/icons/token.svg';
import Constants from 'expo-constants';
import { abbreviateNumber } from '@utils/numbers';
import styles from './styles';
import { useSmartContract } from '../../../../hooks';

const Tokenomics = ({ nft }) => {
  const [stakedAmount, setStakedAmount] = useState(0);
  const [supporterNumber, setSupporterNumber] = useState(0);
  const { getContractMethods } = useSmartContract();

  const getNFTTotalStakedAmount = async () => {
    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeErc721Address,
    );
    try {
      contractMethods.nftTotalStaked(nft?.tokenId).call().then(
        (a) => { setStakedAmount(abbreviateNumber(a * 10 ** -18, true)); },
      );
      contractMethods.nftStakers(nft?.tokenId).call().then(
        (a) => { setSupporterNumber(a); },
      );
    } catch (err) {
      // log errors
    }
  };

  useEffect(() => {
    getNFTTotalStakedAmount();
  }, []);

  return (
    <View style={styles.tokenomicsContainer}>
      <View style={styles.stakedContainer}>
        <TokenIcon width={34} height={34} />
        <View>
          <Text style={styles.stakedStyle}>staked</Text>
          <Text style={styles.neftsAmountStyle}>{stakedAmount}</Text>
        </View>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.supportersContainer}>
        <Text style={styles.economicDetails}>
          <Text style={styles.fontWeight700}>{`${nft.profitPercentage}% `}</Text>
          <Text>goes to</Text>
        </Text>
        <Text style={[styles.economicDetails, styles.fontWeight700]}>{`${supporterNumber} supporters`}</Text>
      </View>
    </View>
  );
};

Tokenomics.propTypes = {
  nft: PropTypes.shape({
    tokenId: PropTypes.string.isRequired,
    staked: PropTypes.number.isRequired,
    profitPercentage: PropTypes.string.isRequired,
    supporters: PropTypes.number.isRequired,
  }).isRequired,
};

export default Tokenomics;
