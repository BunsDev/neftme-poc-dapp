import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import VideoNFT from './video/video_challenge';
import AudioNFT from './audio/audio_nft';
import ChallengeOptionItem from './challenge_option_item';
import challengeTypes from './challenge_types';
import TextChallenge from './text/text_challenge';

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

const WriteChallenge = () => {
  const [selectedChallengeType, setselectedChallengeType] = useState(
    challengeTypes[1]
  );
  const challengeTypeArray = Array.from(challengeTypes);

  const returnChallengeType = () => {
    switch (selectedChallengeType) {
      case challengeTypeArray[1]:
        return <TextChallenge />;
      case challengeTypeArray[0]:
        return <VideoNFT />;
      case challengeTypeArray[2]:
        return <AudioNFT />;
      default:
        return <VideoNFT />;
    }
  };

  return (
    <>
      {returnChallengeType()}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={challengeTypeArray}
        style={styles.menuContainer}
        renderItem={({ item, index }) => (
          <ChallengeOptionItem
            key={`icon_profile_${index}`}
            item={item}
            index={index}
            selectedChallengeTypeId={selectedChallengeType.id}
            setSelectedChallengeTypeId={setselectedChallengeType}
          />
        )}
      />
    </>
  );
};

export default WriteChallenge;
