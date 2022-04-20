import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useSmartContract } from '@hooks';
import { useChainCheck } from '@hooks';
import { Button, Loading } from '@library';
import { convertToETH18 } from '@utils/nft';
import Constants from 'expo-constants';
import GestureRecognizer from 'react-native-swipe-gestures';
import styles from './stake_modal_styles';

const STAKE_PERCENTAGES = [25, 50, 75, 100];
const NEFTS_TO_APPROVE = 5;

const StakeModal = ({ nftTokenId, stakeModalVisible, setStakeModalVisible }) => {
  const [tokensToStake, setTokensToStake] = useState('0');
  const [selectedPercentage, setSelectedPercentage] = useState(null);
  const [transactionApproved, setTransactionApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [neftBalance, setNeftBalance] = useState(0);
  const connector = useWalletConnect();
  const { getContractMethods } = useSmartContract();
  const { checkChain } = useChainCheck();

  const getNEFTBalance = async () => {
    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeErc20NEFTAddress,
    );
    return contractMethods.balanceOf(connector.accounts[0]).call({ from: connector.accounts[0] })
      .then((a) => { setNeftBalance(a * 10 ** -18); });
  };

  useEffect(async () => {
    setIsLoading(true);
    //checkChain();
    getNEFTBalance().then(() => setIsLoading(false));
  }, [connector]);

  const approveNeft = async () => {
    try {
      if (tokensToStake > 0) {
        setIsLoading(true);
        const contractMethods = await getContractMethods(
          Constants.manifest.extra.neftmeErc20NEFTAddress,
        );
        setIsLoading(false);
        contractMethods.approve(
          Constants.manifest.extra.neftmeErc721Address,
          convertToETH18(NEFTS_TO_APPROVE),
        ).send({ from: connector.accounts[0] })
          .then((receipt) => {
            setIsLoading(false);
            if (receipt?.status) {
              Alert.alert('Transaction approved, you can now stake your $NEFT');
              setTransactionApproved(true);
            } else {
              Alert.alert('Transaction not approved, please try again');
            }
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

  const stakeNEFT = async () => {
    try {
      if (tokensToStake > 0) {
        setIsLoading(true);
        const contractMethods = await getContractMethods(
          Constants.manifest.extra.neftmeErc721Address,
        );
        contractMethods.stake(
          Number(nftTokenId),
          convertToETH18(tokensToStake),
        ).send({ from: connector.accounts[0] })
          .then(() => {
            setIsLoading(false);
            Alert.alert('Your $NEFT were successfully staked');
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

  const onPercentagePress = (value) => {
    setTokensToStake(String(neftBalance * (value / 100)));
    setSelectedPercentage(value);
  };

  return (
    <GestureRecognizer onSwipeDown={() => setStakeModalVisible((prevValue) => !prevValue)}>
      <Modal
        animationType="slide"
        transparent
        visible={stakeModalVisible}
        onRequestClose={() => setStakeModalVisible((prevValue) => !prevValue)}
      >
        <Loading visible={isLoading} />
        <TouchableOpacity
          style={styles.stakeModal}
          activeOpacity={1}
          onPressOut={() => setStakeModalVisible((prevValue) => !prevValue)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <View style={styles.topBar} />
            <View style={styles.stakeModalView}>
              <TouchableWithoutFeedback>
                <View>
                  <Text style={styles.stakeTitle}>How much $NEFT you want to stake?</Text>
                  <View style={styles.stakeContainer}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      keyboardType="numeric"
                      style={styles.neftAmountText}
                      value={tokensToStake}
                      onChange={(event) => setTokensToStake(event.nativeEvent.text)}
                    />
                    <Text style={styles.availableNeftText}>{`Available: ${neftBalance} $NEFT`}</Text>
                  </View>
                  <View style={styles.percentageButtonsContainer}>
                    {STAKE_PERCENTAGES.map((p, index) => (
                      <Button
                        key={`percentage_${p}`}
                        primary={selectedPercentage === p}
                        buttonStyle={[
                          styles.stakePercentageButton,
                          index > 0 ? styles.stakePercentageButtonMargin : {},
                        ]}
                        onPress={() => onPercentagePress(p)}
                        text={`${p}%`}
                      />
                    ))}
                  </View>
                  <View style={styles.stakeButtonsActionContainer}>
                    <Button
                      primary={!transactionApproved}
                      buttonStyle={styles.stakeButtonAction}
                      onPress={approveNeft}
                      text="Approve"
                    />
                    <Button
                      primary={transactionApproved}
                      buttonStyle={[styles.stakeButtonAction, styles.marginLeft10]}
                      onPress={stakeNEFT}
                      text="Stake $NEFT"
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    </GestureRecognizer>
  );
};

StakeModal.propTypes = {
  nftTokenId: PropTypes.string.isRequired,
  stakeModalVisible: PropTypes.bool.isRequired,
  setStakeModalVisible: PropTypes.func.isRequired,
};

export default StakeModal;
