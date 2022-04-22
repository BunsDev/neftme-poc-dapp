import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import TokenIcon from '@assets/icons/token.svg';
import styles from './styles';
import { useSmartContract } from '../../../../hooks';
import Constants from 'expo-constants';
import * as Math from 'mathjs'

const Tokenomics = ({ nft }) => {

  const [stakedAmount, setStakedAmount] = useState(0);
  const [supporterNumber, setSupporterNumber] = useState(0);
  const { getContractMethods } = useSmartContract();

  var SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

  function abbreviateNumber(number){
  
      // what tier? (determines SI symbol)
      var tier = Math.log10(Math.abs(number)) / 3 | 0;
  
      // if zero, we don't need a suffix
      if(tier == 0) return number;
  
      // get suffix and determine scale
      var suffix = SI_SYMBOL[tier];
      var scale = Math.pow(10, tier * 3);
  
      // scale the number
      var scaled = number / scale;
  
      // format number and add suffix
      return scaled.toFixed(1) + suffix;
  }


  const getNFTTotalStakedAmount = async () => {
    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeErc721Address,
    );
    try{
    contractMethods.nftTotalStaked(nft?.tokenId).call().then(
      a => {setStakedAmount(abbreviateNumber(a*10**-18))}
    )
    contractMethods.nftStakers(nft?.tokenId).call().then(
      a => {setSupporterNumber(a)}
    )
      
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
        <Text style={styles.neftsAmountStyle}>{`${stakedAmount}`}</Text>
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
