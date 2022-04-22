import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import TokenIcon from '@assets/icons/token.svg';
import styles from './styles';
import { useSmartContract } from '../../../../hooks';
import Constants from 'expo-constants';

const Tokenomics = ({ nft }) => {

  const [stakedAmount, setStakedAmount] = useState(0);
  const { getContractMethods } = useSmartContract();

  const getNFTTotalStakedAmount = async () => {
    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeErc721Address,
    );
    try{
    return contractMethods.nftTotalStaked(nft?.tokenId).call()
      .then((a) => { setStakedAmount(a * 10 ** -18); });
    }catch(err){
      //log errors
    }
  };

  useEffect(async () => {
    getNFTTotalStakedAmount();
  }, []);

  return(
  <View style={styles.tokenomicsContainer}>
    <View style={styles.stakedContainer}>
      <TokenIcon width={34} height={34} />
      <View>
        <Text style={styles.stakedStyle}>staked</Text>
        <Text style={styles.neftsAmountStyle}>{`${stakedAmount} nefts`}</Text>
      </View>
    </View>
    <View style={styles.verticalLine} />
    <View style={styles.supportersContainer}>
      <Text style={styles.economicDetails}>
        <Text style={styles.fontWeight700}>{`${nft.profitPercentage}% `}</Text>
        <Text>goes to</Text>
      </Text>
      <Text style={[styles.economicDetails, styles.fontWeight700]}>{`- supporters`}</Text>
    </View>
  </View>);

};

Tokenomics.propTypes = {
  nft: PropTypes.shape({
    staked: PropTypes.number.isRequired,
    profitPercentage: PropTypes.string.isRequired,
    supporters: PropTypes.number.isRequired,
  }).isRequired,
};

export default Tokenomics;
