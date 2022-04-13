import React, { useState } from 'react';
import {
  ActivityIndicator, Alert, Modal, View,
} from 'react-native';
import { Button } from '@library';
import InstagramAssetIcon from '@assets/icons/instagram_coloured.svg';
import { useNavigation } from '@react-navigation/native';
import InstagramModal from './login_modal';
import styles from './styles';

const InstagramIcon = (props) => <InstagramAssetIcon width={29} height={29} {...props} />;

const InstagramLogin = () => {
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const navigation = useNavigation();

  const onLoginSuccess = () => {
    setShowLoading(false);
    navigation.navigate('Start', {
      screen: 'Wallet',
    });
  };

  const onLoginFailure = () => {
    setShowLoading(false);
    Alert.alert('Login', 'Something went wrong. Please try again', [
      { text: 'OK', onPress: () => { } },
    ]);
  };

  return (
    <>
      {showLoading && (
        <Modal
          transparent
          animationType="none"
          visible
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator animating color="white" size="large" />
            </View>
          </View>
        </Modal>
      )}
      <Button
        text="Log in with Instagram"
        textStyle={styles.instagramButtonText}
        buttonStyle={styles.instagramButton}
        onPress={() => setShowInstagramModal(true)}
        Icon={InstagramIcon}
        iconStyle={styles.instagramIcon}
      />
      <InstagramModal
        modalVisible={showInstagramModal}
        setModalVisible={setShowInstagramModal}
        setShowLoading={setShowLoading}
        onLoginSuccess={onLoginSuccess}
        onLoginFailure={onLoginFailure}
      />
    </>
  );
};

export default InstagramLogin;
