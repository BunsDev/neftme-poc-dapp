import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Loading, SectionHeader } from '@library';
import { fetchAllNFTs, selectNFTs } from '@features/nft';
import Nft from './nft';
import styles from './styles';

const Timeline = () => {
  const dispatch = useDispatch();
  const nftsStore = useSelector(selectNFTs);

  useEffect(() => {
    dispatch(fetchAllNFTs());
  }, []);

  const onRefreshClick = async () => {
    dispatch(fetchAllNFTs({ forceRefresh: true }));
  };

  return (
    <View style={styles.timelineContainer}>
      <SectionHeader title="Following" onSeeAllClick={onRefreshClick} containerStyle={styles.headerStyle} />
      <Loading visible={nftsStore.status === 'pending'} />
      {nftsStore.status === 'succeeded' && nftsStore.nfts.length ? (
        nftsStore.nfts.map((nft) => <Nft key={`nft_${nft.tokenId}`} nft={nft} />)
      ) : null}
    </View>
  );
};

export default Timeline;
