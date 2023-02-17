import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import BackIcon from '@assets/icons/back.svg';
import ChallengeIcon from '@assets/icons/challenge_header_icon.svg';
import { useNavigation } from '@react-navigation/native';
import Challenge from '../../../model/challenge_model';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: '10%',
    width: '85%',
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
    color: '#000',
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
});

export type Props = {
  challenge: Challenge;
};

const ReceivedChallengeItem: React.FC<Props> = ({ challenge }) => {
  const [selected, setSelected] = useState(0);
  const navigation = useNavigation<any>();

  // TODO - TEMPORARY Move the modal to the correct place
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
        <Text style={styles.challengeTextStyle}>{challenge.getUser()}</Text>
    </View>
  );
};

export default ReceivedChallengeItem;
