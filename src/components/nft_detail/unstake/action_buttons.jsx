import React from 'react';
import { Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { Button } from '@library';
import { convertToETH18 } from '@utils/nft';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useSmartContract } from '@hooks';
import styles from './styles';

const ActionButtons = ({
  fetchNftData, nftTokenId, setIsLoading, setUnstakeModalVisible, tokensToUnstake,
}) => {
  const connector = useWalletConnect();
  const { getContractMethods } = useSmartContract();

  const unstakeNEFT = async () => {
    try {
      if (tokensToUnstake > 0) {
        setIsLoading(true);
        const contractMethods = await getContractMethods(
          Constants.manifest.extra.neftmeErc721Address,
        );

        contractMethods.unstake(
          Number(nftTokenId),
          convertToETH18(tokensToUnstake),
        ).send({ from: connector.accounts[0] })
          .then(() => {
            setIsLoading(false);
            Alert.alert('Success!', 'Your $NEFT were successfully unstaked', [{
              text: 'Ok',
              onPress: () => {
                fetchNftData();
                setUnstakeModalVisible(false);
              },
            }]);
          })
          .catch(() => {
            setIsLoading(false);
            Alert.alert('Something went wrong, please try again');
          });
      }
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Something went wrong, please try again');
    }
  };

  return (
    <View style={styles.stakeButtonsActionContainer}>
      <Button
        buttonStyle={styles.unstakeButtonAction}
        onPress={unstakeNEFT}
        text="Unstake $NEFT"
      />
    </View>
  );
};

ActionButtons.propTypes = {
  fetchNftData: PropTypes.func.isRequired,
  nftTokenId: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setUnstakeModalVisible: PropTypes.func.isRequired,
  tokensToUnstake: PropTypes.string.isRequired,
};

export default ActionButtons;
