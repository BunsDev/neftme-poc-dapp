import React, { useState } from 'react';
import { Dimensions, StyleSheet, FlatList } from 'react-native';
import VideoNFT from './video/video_nft';
import ImageNFT from './image/image_nft';
import AudioNFT from './audio/audio_nft';
import nftOptions from './nft_options';
import NFTOptionItem from './nft_option_item';

const styles = StyleSheet.create({
  menuContainer: {
    paddingTop: 7,
    paddingLeft: '12%',
    marginTop: 630,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
});

const MainGallery = () => {
  const [selectedNFTOption, setSelectedNFTOption] = useState(nftOptions[1]);
  const nftOptionArray = Array.from(nftOptions);

  const returnNFTOption = () => {
    switch (selectedNFTOption) {
      case nftOptionArray[1]:
        return <ImageNFT />;
      case nftOptionArray[0]:
        return <VideoNFT />;
      case nftOptionArray[2]:
        return <AudioNFT />;
      default:
        return <ImageNFT />;
    }
  };

  return (
    <>
      {returnNFTOption()}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={nftOptionArray}
        style={styles.menuContainer}
        renderItem={({ item, index }) => (
          <NFTOptionItem
            key={`icon_profile_${index}`}
            item={item}
            index={index}
            selectedNFTOptionId={selectedNFTOption.id}
            setSelectedNFTOption={setSelectedNFTOption}
          />
        )}
      />
    </>
  );
};

export default MainGallery;
