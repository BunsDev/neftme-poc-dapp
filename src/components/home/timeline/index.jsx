import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Loading, SectionHeader } from '@library';
import { fetchAllNFTs, selectNFTs } from '@features/nft';
import Nft from './nft';
import styles from './styles';
import ChallengeItem from './challenges/challenge';

const Timeline = () => {
  const dispatch = useDispatch();
  const nftsStore = useSelector(selectNFTs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllNFTs({ forceRefresh: true }));
  }, [dispatch]);

  useEffect(() => {
    if (nftsStore?.status === 'succeeded') {
      // setTimeout(() => setIsLoading(false), 500);
    }
  }, [nftsStore]);

  const onRefreshClick = async () => {
    dispatch(fetchAllNFTs({ forceRefresh: true }));
  };

  return (
    <View style={styles.timelineContainer}>
      <SectionHeader title="Following" onSeeAllClick={onRefreshClick} containerStyle={styles.headerStyle} />
      <Loading visible={isLoading} />
      <ChallengeItem nft={{}} />
      <ChallengeItem nft={{}} />
      <ChallengeItem nft={{}} />
      <ChallengeItem nft={{}} />

      {nftsStore.status === 'succeeded' && nftsStore.nfts.length ? (
        nftsStore.nfts.map((nft) => <ChallengeItem key={`nft_${nft.tokenId}`} nft={nft} />)
      ) : null}
    </View>
  );
};

export default Timeline;
