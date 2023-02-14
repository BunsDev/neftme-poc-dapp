import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import ExitXIcon from '@assets/icons/exit_x.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    width: '80%',
    height: '70%',
    backgroundColor: '#2B2F3A',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#555555',
  },
  buttonClose: {},
});

export type Props = {
  isVisible: boolean;
  setIsVisible: Function;
};

const CentralChallengeModal: React.FC<Props> = ({
  isVisible,
  setIsVisible,
}) => {
  return (
    <GestureRecognizer
      onSwipeDown={() => setIsVisible((prevValue: boolean) => !prevValue)}
    >
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(!isVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setIsVisible(!isVisible)}
            >
              <ExitXIcon />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureRecognizer>
  );
};

export default CentralChallengeModal;
