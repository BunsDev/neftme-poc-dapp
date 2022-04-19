import React from 'react';
import { View } from 'react-native';
import { Button } from '@library';
import { setData } from '@services/storage';
import { withOnboardingView } from '@hocs';
import styles from './styles';
import InstagramLogin from '../instagram_login';

const ChooseLogin = () => (
  <View style={styles.mainContainer}>
    <InstagramLogin />
    <Button
      text="Create new account"
      textStyle={styles.newAccountButtonText}
      buttonStyle={[styles.newAccountButton, styles.disabledButton]}
      onPress={() => { }}
    />
  </View>
);

export default withOnboardingView(
  async (navigation) => {
    await setData('guest_user', 'yes');
    navigation.navigate('Home');
  },
)(ChooseLogin);
