import React, { useState, useRef } from 'react';
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
import AudioDefaultImage from '@assets/audio_default_image.png';
import SocialInfo from './social_info';
import Tokenomics from './tokenomics';
import styles from './styles';

const Nft = ({ nft }) => {
  const navigation = useNavigation();
  const navigateToProfile = () =>
    navigation.navigate('CreatorProfile', { username: nft.username });
  const constants = Constants.manifest.extra;
  const [muted, setIsMuted] = useState(false);
  const video = useRef(null);
  const [videoStatus, setVideoStatus] = useState({});

  const audioNFTBuild = async () => {
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

    return (
      <TouchableOpacity
        onPress={status.isPlaying ? sound.playAsync() : sound.stopAsync()}
      >
        <Image source={AudioDefaultImage} style={styles.nftNFTPhoto} />
      </TouchableOpacity>
    );
  };

  const nftByType = () => {
    switch (nft.resourceType) {
      case constants.mediaType.image:
        return (
          <Image source={{ uri: nft.resource }} style={styles.nftNFTPhoto} />
        );
      case constants.mediaType.video:
        return (
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
            <TouchableOpacity
              style={styles.speakerVideoAudio}
              onPress={() => setIsMuted((prev) => !prev)}
            >
              <SpeakerIcon style={styles.speakerVideoAudio} />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      case constants.mediaType.audio:
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
      <View>
        {/* TODO: ADD Save Favorite feature;
        <SaveFavoriteIcon style={styles.saveFavoriteIcon} width={20} height={20} /> */}
        <Pressable
          onPress={() =>
            navigation.navigate('NFTDetail', { nftTokenId: nft.tokenId })
          }
        >
          <Image source={{ uri: nft.resource }} style={styles.nftNFTPhoto} />
        </Pressable>
      </View>
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
