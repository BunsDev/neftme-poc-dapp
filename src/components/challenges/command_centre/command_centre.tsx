import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import BackIcon from '@assets/icons/back.svg';
import ChallengeIcon from '@assets/icons/challenge_header_icon.svg';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import Challenge from '../../../model/challenge_model';
import ReceivedChallengeItem from './received_challenge_item';
import AcceptDeclineModal from './accept_decline_modal';
import {
  getChallengesSentByUser,
  getChallengesReceivedByUser,
} from '../../../services/challenge/challenge';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13131F',
  },
  receivedSentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '5%',
  },
  challengeTextAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  backIcon: {
    marginTop: '13%',
    marginLeft: '5%',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF',
  },
  challengeTextStyle: {
    fontSize: 25,
    fontWeight: '500',
    color: '#FFF',
    marginLeft: '5%',
  },
  textContainer: {
    flexDirection: 'column',
    marginTop: '2%',
  },
  selected: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  individualText: {
    paddingHorizontal: 20,
  },
  statusREText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFF',
    paddingHorizontal: '17%',
  },
  statusREContainer: {
    flexDirection: 'row',
    marginLeft: '35%',
    marginTop: '5%',
  },
  challengeItemContainer: {
    marginHorizontal: '5%',
    height: '10%',
  },
});

const options = [
  {
    text: 'Received',
  },
  {
    text: 'Sent',
  },
];

const CommandCentre: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const navigation = useNavigation<any>();

  const [modalVisible, setModalVisible] = useState(false);

  const c = new Challenge('luisneves0.5', 'luis', 'nft', 'Send nudes', 1, true);

  const receivedResponse = useQuery(['receivedChallenges'], () =>
    getChallengesReceivedByUser('17')
  );

  const sentResponse = useQuery(['sentChallenges'], () =>
    getChallengesSentByUser('17')
  );


  return (
    <View style={styles.container}>
      <AcceptDeclineModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        challenge={c}
      />
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <BackIcon width={25} height={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <View style={styles.challengeTextAndIconContainer}>
          <ChallengeIcon width={60} height={60} />
          <Text style={styles.challengeTextStyle}>Challenges</Text>
        </View>

        <View style={styles.receivedSentContainer}>
          {options.map((item: any, index) => (
            <TouchableOpacity
              onPress={() => setSelected(index)}
              style={styles.individualText}
              key={`option_${item.text}`}
            >
              <View
                key={`option_${item.text}`}
                style={selected === index ? styles.selected : null}
              >
                <Text key={`option_${item.text}`} style={[styles.textStyle]}>
                  {item.text}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statusREContainer}>
          <Text style={styles.statusREText}>status</Text>
          <Text style={styles.statusREText}>RE</Text>
        </View>
      </View>
      {/* TODO Change this to flat list when dynamic */}
      {selected === 0 ? <View /> : <View />}
      <View style={styles.challengeItemContainer}>
        <ReceivedChallengeItem
          challenge={c}
          isModalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </View>
  );
};

export default CommandCentre;
