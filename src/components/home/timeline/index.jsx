import React, {
  useEffect, useState, useRef,
} from 'react';
import {
  View, Animated,
} from 'react-native';
import {
  Value,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { Loading, SectionHeader } from '@library';
import { fetchAllNFTs, selectNFTs } from '@features/nft';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  PinchGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import Post from '../../shared/components/Post.tsx';
import styles from './styles';

import { FOOTER_HEIGHT } from '../../shared/components/Footer.tsx';
import { HEADER_HEIGHT } from '../../shared/components/Header.tsx';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function Timeline() {
  const dispatch = useDispatch();
  const nftsStore = useSelector(selectNFTs);
  const [isLoading, setIsLoading] = useState(true);

  // THIS BLOCK OF CODE IS FOR ZOOMING IN IMAGE
  const scrollView = useRef < ScrollView > (null);
  // This animation value needs to come from Vanilla Animated
  const y = new Animated.Value(0);
  const insets = useSafeAreaInsets();
  const paddingTop = HEADER_HEIGHT + insets.top;
  const paddingBottom = FOOTER_HEIGHT + insets.bottom;
  const items = nftsStore.nfts.map((nft) => ({
    nft,
    state: new Value(State.UNDETERMINED),
    pinchRef: useRef < PinchGestureHandler > (null),
  }));
  const pinchRefs = items.map(({ pinchRef }) => pinchRef);
  const t = useRef(null);

  useEffect(() => {
    dispatch(fetchAllNFTs());
  }, []);

  useEffect(() => {
    if (nftsStore?.status === 'succeeded') {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [nftsStore]);

  const onRefreshClick = async () => {
    dispatch(fetchAllNFTs({ forceRefresh: true }));
  };

  // TODO FALTA ADICIONAR O REF AO ANIMATED SCROLL VIEW  ref={scrollView}
  return (
    <View style={styles.timelineContainer}>
      <SectionHeader
        title="Following"
        onSeeAllClick={onRefreshClick}
        containerStyle={styles.headerStyle}
      />
      <Loading visible={isLoading} />
      <AnimatedScrollView
        ref={t}
        pinchGestureEnabled={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        waitFor={pinchRefs}
        simultaneousHandlers={pinchRefs}
        contentContainerStyle={{
          paddingTop,
          paddingBottom,
        }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
          useNativeDriver: true,
        })}
      >
        {nftsStore.status === 'succeeded' && nftsStore.nfts.length
          ? (items.map(({ nft, state, pinchRef }) => (
            <Post
              key={`nft_${nft.tokenId}`}
              nft={nft}
              {...{
                state, scrollView, pinchRef, pinchRefs,
              }}
            />
          ))) : null }
      </AnimatedScrollView>
    </View>
  );
}
