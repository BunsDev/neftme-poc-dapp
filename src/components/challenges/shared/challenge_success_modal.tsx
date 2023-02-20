import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import ChallengeIcon from '@assets/icons/challenge_header_icon.svg';
import NeftmeWrittenLogo from '@assets/icons/neftme_written_logo.svg';
import ExitXIcon from '@assets/icons/exit_x.svg';
import { useNavigation } from '@react-navigation/native';

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
  challengeIcon: {
    alignItems: 'center',
    marginTop: '10%',
  },
  exitXIcon: {
    marginLeft: '5%',
    marginTop: '5%',
  },
});

export type Props = {
  isVisible: boolean;
  setIsVisible: Function;
};

const ChallengeSuccessModal: React.FC<Props> = ({
  isVisible,
  setIsVisible,
}) => {
  const navigation = useNavigation();

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
              <TouchableOpacity
                style={styles.exitXIcon}
                onPress={() => navigation.goBack()}
              >
                <ExitXIcon height={25} width={25} />
              </TouchableOpacity>
              <View style={styles.challengeIcon}>
                <ChallengeIcon width={80} height={80} />
              </View>
              <View style={styles.challengeIcon}>
                <Text style={styles.challengeText}>Challenge Sent!</Text>
              </View>
              <View style={styles.challengeIcon}>
                <NeftmeWrittenLogo width={230} height={230} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ChallengeSuccessModal;
