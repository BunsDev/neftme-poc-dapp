import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator, Alert, Modal, View,
} from 'react-native';
import { Button } from '@library';
import InstagramModal from './login_modal';
import styles from './styles';

const InstagramLogin = ({ navigation }) => {
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const onLoginSuccess = () => {
    setShowLoading(false);
    navigation.navigate('Home');
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
        text="SIGN IN WITH INSTAGRAM"
        buttonStyle={styles.instagramButton}
        onPress={() => setShowInstagramModal(true)}
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

InstagramLogin.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default InstagramLogin;
