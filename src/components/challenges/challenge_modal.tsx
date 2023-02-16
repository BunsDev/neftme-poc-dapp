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
import Button from '../library/button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 100,
    width: '100%',
  },
  modalView: {
    width: '80%',
    height: '70%',
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
  touchOutsideCloseModal2: {
    backgroundColor: '#FFF',
  },
  challengeText: {
    fontWeight: '500',
    fontSize: 21,
    color: '#FFF',
  },
  challengeTextContainer: {
    marginTop: '10%',
    marginLeft: '5%',
    marginBottom: '10%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#2B2F3A',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#FFF',
  },
  hiddenContainer: {
    flexDirection: 'row',
    marginTop: '8%',
    marginLeft: '5%',
    alignItems: 'center',
  },
  hiddenText: {
    fontWeight: '500',
    fontSize: 18,
    color: '#FFF',
  },
  switchButton: {
    marginLeft: '55%',
  },
  nextButton: {
    fontWeight: '700',
    fontSize: 16,
    alignContent: 'center',
    marginHorizontal: '5%',
    marginTop: '30%',
  },
});

export type Props = {
  isVisible: boolean;
  setIsVisible: Function;
};

const CentralChallengeModal: React.FC<Props> = ({
  isVisible,
  setIsVisible,
}) => {
  const [challengeDescription, setChallengeDescription] = useState('');
  const [hiddenEnabled, sethiddenEnabled] = useState(false);

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
                <Text style={styles.challengeText}>
                  Challenge @Make Dynamic
                </Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Search"
                onChange={(event) =>
                  setChallengeDescription(event.nativeEvent.text)
                }
                value={challengeDescription}
              />
              <View style={styles.hiddenContainer}>
                <Text style={styles.hiddenText}>Hidden</Text>
                <Switch
                  style={styles.switchButton}
                  trackColor={{ false: '#767577', true: '#f5dd4b' }}
                  thumbColor={hiddenEnabled ? '#3e3e3e' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => sethiddenEnabled(!hiddenEnabled)}
                  value={hiddenEnabled}
                />
              </View>
              <Button buttonStyle={styles.nextButton} text="Next" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default CentralChallengeModal;
