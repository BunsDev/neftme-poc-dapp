import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import Button from '../../library/button';
import Challenge from '../../../model/challenge_model';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '20%',
  },
  modalView: {
    width: '80%',
    height: '55%',
    backgroundColor: '#2B2F3A',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#2B2F3A',
  },
  touchOutsideCloseModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeText: {
    fontWeight: '500',
    fontSize: 21,
    color: '#FFF',
  },
  challengeTextContainer: {
    marginTop: '10%',
    marginLeft: '5%',
    marginBottom: '5%',
  },
  nextButton: {
    fontWeight: '700',
    fontSize: 16,
    width: '50%',
    marginHorizontal: '2%',
  },
  challengeDescContainer: {
    borderWidth: 1,
    marginHorizontal: '5%',
    borderRadius: 11,
    padding: '5%',
  },
  acceptDeclineContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginTop: '10%',
    justifyContent: 'center',
    paddingTop: '5%',
  },
});

export type Props = {
  isVisible: boolean;
  setIsVisible: Function;
  challenge: Challenge;
};

const AcceptDeclineModal: React.FC<Props> = ({
  isVisible,
  setIsVisible,
  challenge,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(!isVisible);
      }}
    >
      <TouchableOpacity
        onPress={() => setIsVisible(!isVisible)}
        style={styles.touchOutsideCloseModal}
      >
        <TouchableWithoutFeedback>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.challengeTextContainer}>
                <Text style={styles.challengeText}>{challenge.getUser()}</Text>
              </View>
              <View style={styles.challengeTextContainer}>
                <Text style={styles.challengeText}>
                  {challenge.getValue()} NEFT
                </Text>
              </View>
              <View style={styles.challengeDescContainer}>
                <Text style={styles.challengeText}>
                  {challenge.getDescription()}
                </Text>
              </View>
              <View style={styles.acceptDeclineContainer}>
                <Button buttonStyle={styles.nextButton} text="Accept" />
                <Button buttonStyle={styles.nextButton} text="Decline" />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default AcceptDeclineModal;
