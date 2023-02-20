import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import BackIcon from '@assets/icons/back.svg';
import ChallengeIcon from '@assets/icons/challenge_header_icon.svg';
import { useNavigation } from '@react-navigation/native';
import Challenge from '../../../model/challenge_model';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: '90%',
    width: '100%',
    borderRadius: 20,
    paddingTop: 20,
    flexDirection: 'row',
    marginTop: '5%',
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
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    marginLeft: '5%',
  },
  textContainer: {
    flexDirection: 'column',
    marginTop: '2%',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: '8%',
  },
  remainingTimeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: '18%',
  },
});

export type Props = {
  challenge: Challenge;
  isModalVisible: boolean;
  setModalVisible: Function;
};

const ReceivedChallengeItem: React.FC<Props> = ({
  challenge,
  setModalVisible,
  isModalVisible,
}) => {
  return (
    <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
      <View style={styles.container}>
        <Text style={styles.challengeTextStyle}>{challenge.getUser()}</Text>
        <Text style={styles.statusText}>pending</Text>
        <Text style={styles.remainingTimeText}>24H</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReceivedChallengeItem;
