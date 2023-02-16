import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button } from '@library';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import DiscardTrashIcon from '@assets/icons/discard_photo.svg';
import PlayIcon from '@assets/icons/play.svg';
import PauseIcon from '@assets/icons/pause.svg';
import OpenAudioIcon from '@assets/icons/open_audio_arrow.svg';
import CloseAudioIcon from '@assets/icons/close_audio_arrow.svg';
import ForwardTenSecondsIcon from '@assets/icons/forward_ten_seconds.svg';
import OneTimeSpeedIcon from '@assets/icons/one_time_speed.svg';
import BackTenSecondsIcon from '@assets/icons/back_ten_seconds.svg';
import { Audio } from 'expo-av';
import { getDurationFormatted } from '../../../utils/time';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212b',
    paddingTop: 30,
  },
  header: {
    backgroundColor: '#21212b',
    padding: 10,
  },
  headerText: {
    textAlign: 'left*',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    color: '#FFF',
  },
  content: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  active: {
    backgroundColor: '#21212b',
  },
  inactive: {
    backgroundColor: '#21212b',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#21212b',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
  sliderStyle: {
    width: 40,
    height: 40,
  },
  allRecordings: {
    fontWeight: '500',
    fontSize: 25,
    color: '#FFFFFF',
  },
  allRecordingsContainer: {
    marginLeft: 30,
    marginTop: 10,
  },
  divider: {
    borderBottomColor: 'rgba(255, 255, 255, 0.4)',
    borderBottomWidth: 1,
    marginTop: 50,
  },
  nameAndArrow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  editButton: {
    color: 'rgba(255, 255, 255, 0.4)',
    marginLeft: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  durationText: {
    fontWeight: '500',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  headerDurationText: {
    marginLeft: 115,
  },
});

// TODO MUDAR SOUND PARA USE REF

const EditAudio = () => {
  const [activeSections, setActiveSections] = useState([]);
  // const soundRef = React.useRef(new Audio.Sound());
  const [content, setContent] = useState([
    { audioName: '', audioURI: '', soundObject: {}, duration: '' },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  const audioDir =
    FileSystem.documentDirectory + Constants.expoConfig.extra.localAudioDirectory;

  const loadContent = async () => {
    try {
      const dirContent = await FileSystem.readDirectoryAsync(audioDir);

      const tempContent = dirContent.map(async (fileName) => {
        const fileURI = audioDir + fileName;
        const source = { uri: fileURI };
        const initialStatus = {
          shouldPlay: false,
          rate: 1.0,
          volume: 1.0,
        };
        // IF nft was recorded now, we already have duration
        if (route.params?.nft) {
          try {
            const { sound } = await Audio.Sound.createAsync(
              source,
              initialStatus
            );
            return {
              audioName: fileName,
              audioURI: fileURI,
              soundObject: sound,
              duration: route.params?.nft?.extraResource,
            };
          } catch (err) {
            // console.log(err);
          }
        } else {
          try {
            const { sound, status } = await Audio.Sound.createAsync(
              source,
              initialStatus
            );

            return {
              audioName: fileName,
              audioURI: fileURI,
              soundObject: sound,
              duration: getDurationFormatted(status.durationMillis),
            };
          } catch (err) {
            // console.log(err);
          }
        }
      });
      Promise.all(tempContent).then((res) => {
        setContent(res);
      });
    } catch (err) {
      // console.log(err);
    }
  };

  const deleteFile = (uri) => {
    FileSystem.deleteAsync(uri);
    setContent(content.filter((sound) => sound.audioURI !== uri));
  };

  useEffect(() => {
    loadContent();
  }, []);

  const setSections = (sections) => {
    // setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    const name = section.audioName.split('.')[0];
    return (
      <Animatable.View
        duration={200}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View style={styles.divider} />
        <View style={styles.nameAndArrow}>
          {isActive ? <OpenAudioIcon /> : <CloseAudioIcon />}
          <TextInput style={styles.headerText} value={name} />
          <TouchableOpacity>
            <Text style={styles.editButton}>(edit)</Text>
          </TouchableOpacity>
          <Text style={[styles.durationText, styles.headerDurationText]}>
            {section.duration}
          </Text>
        </View>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    /* const initialStatus = {
      shouldPlay: false,
      rate: 1.0,
      volume: 1.0,
    };
    soundRef.current.loadAsync(section.audioURI, initialStatus, false); */
    return (
      <Animatable.View
        duration={200}
        style={[styles.content, styles.active]}
        transition="backgroundColor"
      >
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <OneTimeSpeedIcon />
          </TouchableOpacity>

          <TouchableOpacity>
            <BackTenSecondsIcon />
          </TouchableOpacity>

          <TouchableOpacity
            /* onPress={
              isPlaying
                ? soundRef.current.replayAsync()
                : soundRef.current.pauseAsync()
            } */
            onPress={() => section.soundObject.replayAsync()}
          >
            {!isPlaying ? <PlayIcon /> : <PauseIcon />}
          </TouchableOpacity>

          <TouchableOpacity>
            <ForwardTenSecondsIcon />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteFile(section.audioURI)}>
            <DiscardTrashIcon />
          </TouchableOpacity>
        </View>
        <Button
          text="Create NFT"
          onPress={() =>
            navigation.navigate('CreateNFT', {
              screen: 'CreateNFTDetails',
              params: {
                resource: section.audioURI,
                resourceType: Constants.expoConfig.extra.mediaType.sound,
                duration: section.duration,
              },
            })
          }
          textStyle={{}}
        />
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.allRecordingsContainer}>
        <Text style={styles.allRecordings}>All Recordings</Text>
      </View>
      <ScrollView>
        <Accordion
          activeSections={activeSections}
          sections={content}
          touchableComponent={TouchableOpacity}
          expandMultiple={false}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={200}
          onChange={setSections}
        />
      </ScrollView>
    </View>
  );
};

export default EditAudio;
