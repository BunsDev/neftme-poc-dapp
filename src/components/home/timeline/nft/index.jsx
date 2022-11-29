import React, { useState, useRef, useEffect } from 'react';
import { NFTPropTypes } from '@utils/proptypes';
import { Image, Pressable, Text, View } from 'react-native';
// import SaveFavoriteIcon from '@assets/icons/save_favorite.svg';
import { useNavigation } from '@react-navigation/native';
import { ProfileImage, TruncatedText } from '@library';
import Constants from 'expo-constants';
import { pluralizeFollowers } from '@utils/words';
import { Video, Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SpeakerIcon from '@assets/icons/speaker.svg';
import MutedSpeakerIcon from '@assets/icons/muted_speaker.svg';
import SocialInfo from './social_info';
import Tokenomics from './tokenomics';
import styles from './styles';

const audioDefaultImage = require('@assets/audio_default_image.png');

const Nft = ({ nft }) => {
  const navigation = useNavigation();
  const navigateToProfile = () =>
    navigation.navigate('CreatorProfile', { username: nft.username });
  const constants = Constants.manifest.extra;
  const [muted, setIsMuted] = useState(false);
  const video = useRef(null);
  const [videoStatus, setVideoStatus] = useState({});
  const [audioInfo, setAudio] = useState({ soundObj: {}, statusObj: {} });

  const getAudio = async () => {
    // This setting is needed because otherwise the IOS system
    // will only play sound via the phone call speaker, and not the bottom ones
    // Big thanks to that guy on Github with the same issue
    await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

    const source = { uri: nft.resource };
    const initialStatus = {
      shouldPlay: false,
      rate: 1.0,
      volume: 1.0,
    };

    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus
    );
    const object = { soundObj: sound, statusObj: status };
    setAudio(object);
  };
  useEffect(() => {
    if (nft.resource_type === constants.mediaType.sound) {
      getAudio();
    }
  }, []);

  const audioNFTBuild = () => {
    if (audioInfo.soundObj) {
      return (
        <TouchableOpacity onPress={() => audioInfo.soundObj.replayAsync()}>
          <Image source={audioDefaultImage} style={styles.nftNFTPhoto} />
        </TouchableOpacity>
      );
    }
  };

  const videoNFTBuild = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            videoStatus.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        >
          <Video
            ref={video}
            source={{ uri: nft.resource }}
            isLooping
            isMuted={muted}
            style={styles.nftNFTPhoto}
            onPlaybackStatusUpdate={(newStatus) =>
              setVideoStatus(() => newStatus)
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.speakerVideoAudio}
          onPress={() => setIsMuted((prev) => !prev)}
          disallowInterruption={true}
        >
          {muted ? <SpeakerIcon /> : <MutedSpeakerIcon />}
        </TouchableOpacity>
      </>
    );
  };

  const imageNFTBuild = () => {
    return <Image source={{ uri: nft.resource }} style={styles.nftNFTPhoto} />;
  };

  const nftByType = () => {
    switch (nft.resource_type) {
      case constants.mediaType.image:
        return imageNFTBuild();
      case constants.mediaType.video:
        return videoNFTBuild();
      case constants.mediaType.sound:
        return audioNFTBuild();
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.nftHeader}>
        <Pressable onPress={navigateToProfile}>
          <ProfileImage
            profileImage={nft.profilePhoto}
            containerStyle={{
              ...styles.profileImageContainer,
              backgroundColor: nft.profileColor,
            }}
            imageStyle={styles.nftProfilePhoto}
            avatarWidth={30}
            avatarHeight={30}
          />
        </Pressable>
        <View style={styles.nftHeaderTitle}>
          <Text style={styles.nftHeaderName}>{nft.name}</Text>
          <Text style={styles.nftHeaderFollowers}>{`${
            nft.followers
          } ${pluralizeFollowers(nft.followers)}`}</Text>
        </View>
      </View>
      {/* TODO: ADD Save Favorite feature;
        <SaveFavoriteIcon style={styles.saveFavoriteIcon} width={20} height={20} /> */}
      {/* <Pressable
          onPress={() =>
            navigation.navigate('NFTDetail', { nftTokenId: nft.tokenId })
          }
        > */}
      {nftByType()}
      {/* </Pressable> */}
      <SocialInfo nft={nft} />
      <TruncatedText text={nft.description} textStyle={styles.nftDescription} />
      <View style={styles.horizontalLine} />
      <Tokenomics tokenId={nft.tokenId} />
    </View>
  );
};

Nft.propTypes = {
  nft: NFTPropTypes,
};

export default Nft;
