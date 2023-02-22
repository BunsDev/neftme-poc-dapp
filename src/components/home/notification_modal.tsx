import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import ExitXIcon from '@assets/icons/exit_x.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  timestampText: {
    fontSize: 12,
    color: 'white',
    paddingTop: 5,
  },
  neftsReceivedText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationImage: {
    width: 68,
    height: 68,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 2,
  },
  imageContainer: {
    flex: 1,
  },
  buttonClose: {
    alignSelf: 'flex-end',
    paddingTop: 10,
    paddingRight: 10,
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
});

export type Props = {
  isVisible: boolean;
  setIsVisible: Function;
};

const NotificationModal: React.FC<Props> = ({ isVisible, setIsVisible }) => {
  return (
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
            <ExitXIcon height={25} width={25} />
          </TouchableOpacity>

          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: 'https://www.playtoearn.online/wp-content/uploads/2021/10/Bored-Ape-Yacht-Club-NFT-avatar.png',
                }}
                style={styles.notificationImage}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.neftsReceivedText}>NEFTs received</Text>
              <Text style={styles.timestampText}>Tokens on your wallet </Text>
              <Text style={styles.timestampText}>3 hours ago </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;
