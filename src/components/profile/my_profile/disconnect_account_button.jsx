import React from 'react';
import { ProfileDataDefaultProps, ProfileDataPropTypes } from '@utils/proptypes';
import { StyleSheet } from 'react-native';
import { Button } from '@library';
import { useNavigation } from '@react-navigation/native';
import { removeData } from '../../../services/storage';

const styles = StyleSheet.create({
  myStatsStyle: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  myStatsText: {
    marginLeft: 8,
  },
});

/**
 * NOT BEING USED ANYMORE - NO NEED TO MAINTAIN
* ##################################################################################################
*/
const DisconnectWalletButton = () => {
  const navigation = useNavigation();

  const disconnectAndNavigate = () => {
    try {
      // TODO call remove session from DB request
      removeData('auth_token');
      navigation.navigate({
        name: 'Start',
        params: { screen: 'ChooseLogin' },
      });
    } catch (err) {
      // console.log('something went wrong while logging out');
    }
  };

  return (
    <Button
      primary={false}
      buttonStyle={styles.myStatsStyle}
      onPress={() => disconnectAndNavigate()}
      text="Logout"
      textStyle={styles.myStatsText}
    />
  );
};

DisconnectWalletButton.defaultProps = ProfileDataDefaultProps;
DisconnectWalletButton.propTypes = ProfileDataPropTypes;

export default DisconnectWalletButton;
