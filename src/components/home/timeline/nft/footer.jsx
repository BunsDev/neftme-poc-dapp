/* eslint-disable react/prop-types */
import React from 'react';
import { NFTPopTypes } from '@utils/proptypes';
import {
  Text, View,
} from 'react-native';
import { TruncatedText } from '@library';
import styles from './styles';
import Tokenomics from './tokenomics';
import SocialInfo from './social_info';

const NftFooter = ({ nft }) => (
  <>
    <SocialInfo nft={nft} />
    <Text style={styles.nftTitle}>{nft.title}</Text>
    <TruncatedText text={nft.description} textStyle={styles.nftDescription} />
    <View style={styles.horizontalLine} />
    <Tokenomics tokenId={nft.tokenId} />
  </>
);

NftFooter.propTypes = {
  // eslint-disable-next-line react/require-default-props
  nft: NFTPopTypes,
};

export default NftFooter;
