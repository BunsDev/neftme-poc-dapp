import React, { useState } from 'react';
import {
  SafeAreaView,
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Constants from 'expo-constants';
import Accordion from 'react-native-collapsible/Accordion';
import * as FileSystem from 'expo-file-system';
import { useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Button } from '@library';
import AudioSlider from './audio_slider';
import OpenAudioIcon from '../../../../assets/icons/open_audio_arrow.svg';
import CloseAudioIcon from '../../../../assets/icons/close_audio_arrow.svg';

const CONTENT = [
  {
    title: 'Terms and Conditions',
    content:
      'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).',
  },
  {
    title: 'Privacy Policy',
    content:
      'A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.',
  },
  {
    title: 'Return Policy',
    content:
      'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
  },
];

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
});

const EditAudio = () => {
  // Ddefault active selector
  const [activeSections, setActiveSections] = useState([]);
  const route = useRoute();
  const [currentPosition, setCurrentPosition] = useState(0);
  const { playbackPosition, playbackDuration } = useState();
  const [soundObject, setSoundObject] = useState();
  const [statusObject, setStatusObject] = useState();
  const audioDir =
    FileSystem.documentDirectory + Constants.manifest.extra.localAudioDirectory;

  const setSections = (sections) => {
    // setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    // Accordion Header view
    console.log(isActive);
    console.log(section);
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        {isActive ? <OpenAudioIcon /> : <CloseAudioIcon />}
        <Text style={styles.headerText}>New Recording</Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, styles.active]}
        transition="backgroundColor"
      >
        <AudioSlider resource={route.params.nft.resource} />
        <Button text="Create NFT" onPress={() => {}} textStyle={{}} />
      </Animatable.View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.allRecordingsContainer}>
          <Text style={styles.allRecordings}>All Recordings</Text>
        </View>
        <View style={styles.divider} />
        <ScrollView>
          {/* Code for Accordion/Expandable List starts here */}
          <Accordion
            activeSections={activeSections}
            // for any default active section
            sections={CONTENT}
            // title and content of accordion
            touchableComponent={TouchableOpacity}
            // which type of touchable component you want
            // It can be the following Touchables
            // TouchableHighlight, TouchableNativeFeedback
            // TouchableOpacity , TouchableWithoutFeedback
            expandMultiple={true}
            // Do you want to expand mutiple at a time or single at a time
            renderHeader={renderHeader}
            // Header Component(View) to render
            renderContent={renderContent}
            // Content Component(View) to render
            duration={200}
            // Duration for Collapse and expand
            onChange={setSections}
            // setting the state of active sections
          />
          {/* Code for Accordion/Expandable List ends here */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditAudio;
