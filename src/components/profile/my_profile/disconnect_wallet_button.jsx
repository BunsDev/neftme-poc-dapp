import React from 'react';
import { ProfileDataDefaultProps, ProfileDataPropTypes } from '@utils/proptypes';
import { StyleSheet } from 'react-native';
import { Button } from '@library';
import { useNavigation } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const styles = StyleSheet.create({
  myStatsStyle: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  myStatsText: {
    marginLeft: 8,
  },
});

const DisconnectWalletButton = () => {
  const navigation = useNavigation();
  const connector = useWalletConnect();

  const disconnectAndNavigate = () => {
    try {
      connector.killSession();
      navigation.navigate({
        name: 'Start',
        params: { screen: 'Wallet' },
      });
    } catch (err) {
      // console.log('something went wrong while disconnecting wallet');
    }
  };

  return (
    <Button
      primary={false}
      buttonStyle={styles.myStatsStyle}
      onPress={() => disconnectAndNavigate()}
      text="Disconnect Wallet"
      textStyle={styles.myStatsText}
    />
  );
};

DisconnectWalletButton.defaultProps = ProfileDataDefaultProps;
DisconnectWalletButton.propTypes = ProfileDataPropTypes;

export default DisconnectWalletButton;
