import React, { useState, useRef, useEffect } from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
// import SaveFavoriteIcon from '@assets/icons/save_favorite.svg';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import {
  Video,
  Audio,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from 'expo-av';
import SpeakerIcon from '@assets/icons/speaker.svg';
import MutedSpeakerIcon from '@assets/icons/muted_speaker.svg';
import CommentIcon from '@assets/icons/comment_icon.svg';
import LikeIcon from '@assets/icons/like_icon.svg';
import { TruncatedText } from '../../../library';
import SocialInfo from '../nft/social_info';
import Challenge from '../../../../model/challenge_model';
import NFTModelClass from '../../../../model/nft_model';

const audioDefaultImage = require('@assets/audio_default_image.png');

export type Props = {
  challenge: Challenge;
};

interface ISoundInfo {
  soundObj: Audio.Sound;
  soundStatus: AVPlaybackStatus;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#FFF',
    height: 500,
    marginVertical: 5,
  },
  nftDescription: {
    color: 'rgba(255, 255, 255, 0.71)',
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 16,
    marginTop: 8,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  imageOverlay: {
    flex: 1,
    borderRadius: 10,
  },
  imageOverlayContainer: {
    position: 'absolute',
    width: '20%',
    height: '20%',
    marginTop: '8%',
    marginLeft: '5%',
  },
  insideImages: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
});

const ChallengeItem: React.FC<Props> = ({ challenge }) => {
  const navigation = useNavigation<any>();
  const navigateToProfile = () =>
    navigation.navigate('CreatorProfile', {
      username: challenge.getUserChallenged(),
    });
  const constants = Constants.expoConfig?.extra;
  const [muted, setIsMuted] = useState(false);
  const video = useRef<Video>(null);
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatusSuccess>();
  const [audioInfo, setAudio] = useState<ISoundInfo>();
  const [challengeNFT, setChallengeNFT] = useState<NFTModelClass | null>(null);
  const [selected, setSelected] = useState<boolean>(true);

  useEffect(() => {
    const getAudio = async () => {
      const source = { uri: challengeNFT?.getResource() as string };
      const initialStatus = {
        shouldPlay: false,
        rate: 1.0,
        volume: 1.0,
      };

      const { sound, status } = await Audio.Sound.createAsync(
        source,
        initialStatus
      );

      const object = { soundObj: sound, soundStatus: status };
      setAudio(object);
    };

    if (challengeNFT?.getResourceType() === constants?.mediaType.sound) {
      Audio.setAudioModeAsync({ allowsRecordingIOS: false });
      getAudio();
    }
  }, [challengeNFT, constants?.mediaType.sound]);

  const audioNFTBuild = () => {
    if (audioInfo?.soundObj) {
      return (
        <TouchableOpacity onPress={() => audioInfo.soundObj.replayAsync()}>
          <Image source={audioDefaultImage} />
        </TouchableOpacity>
      );
    }
  };

  const videoNFTBuild = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            videoStatus?.isPlaying
              ? video?.current != null && video.current.pauseAsync()
              : video?.current != null && video.current.playAsync()
          }
        >
          <Video
            ref={video}
            source={{ uri: challengeNFT?.getResource() as string }}
            isLooping
            isMuted={muted}
            // style={styles.nftNFTPhoto}
            onPlaybackStatusUpdate={(newStatus) =>
              setVideoStatus(() => newStatus as AVPlaybackStatusSuccess)
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          // style={styles.speakerVideoAudio}
          onPress={() => setIsMuted((prev) => !prev)}
        >
          {muted ? <SpeakerIcon /> : <MutedSpeakerIcon />}
        </TouchableOpacity>
      </View>
    );
  };

  const imageNFTBuild = () => {
    return (
      <Image
        source={{ uri: challengeNFT?.getResource() as string }}
        style={styles.image}
      />
    );
  };

  const nftByType = () => {
    switch (challengeNFT?.getResourceType() as string) {
      case constants?.mediaType.image:
        return imageNFTBuild();
      case constants?.mediaType.video:
        return videoNFTBuild();
      case constants?.mediaType.sound:
        return audioNFTBuild();
    }
  };

  const switchImages = () => {
    setSelected(!selected);
  };

  // TODO make dynamic

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: selected
            ? 'https://www.playtoearn.online/wp-content/uploads/2021/10/Bored-Ape-Yacht-Club-NFT-avatar.png'
            : 'https://picsum.photos/200/300',
        }}
        style={selected ? styles.image : styles.imageOverlay}
      />
      <View style={styles.imageOverlayContainer}>
        <TouchableWithoutFeedback
          onPress={() => switchImages()}
          style={selected ? styles.imageOverlay : styles.image}
        >
          <Image
            source={{
              uri: selected
                ? 'https://picsum.photos/200/300'
                : 'https://www.playtoearn.online/wp-content/uploads/2021/10/Bored-Ape-Yacht-Club-NFT-avatar.png',
            }}
            style={styles.insideImages}
          />
        </TouchableWithoutFeedback>
      </View>
      {nftByType()}
      {/* </TouchableOpacity>
      <SocialInfo nft={challengeNFT} />
      <TruncatedText
        text={challengeNFT?.getDescription() as string}
        textStyle={styles.nftDescription}
      /> */}
    </View>
  );
};

export default ChallengeItem;
