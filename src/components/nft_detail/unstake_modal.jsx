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
import { Button, Loading } from '@library';
import { convertToETH18 } from '@utils/nft';
import Constants from 'expo-constants';
import GestureRecognizer from 'react-native-swipe-gestures';
import styles from './stake_modal_styles';

const STAKE_PERCENTAGES = [25, 50, 75, 100];

const UnstakeModal = ({ nftTokenId, unstakeModalVisible, setUnstakeModalVisible, stakedAmount }) => {

  const [tokensToUnstake, setTokensToUnstake] = useState('0');
  const [selectedPercentage, setSelectedPercentage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const connector = useWalletConnect();
  const { getContractMethods } = useSmartContract();

  useEffect(async () => {
    setIsLoading(true);
    setIsLoading(false);
  }, [connector]);

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
            setIsLoading(false) 
            Alert.alert('Success!','Your $NEFT were successfully unstaked',[{ text: 'Ok', onPress: setUnstakeModalVisible(false) }]);
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
    setTokensToUnstake(String(stakedAmount * (value / 100)));
    setSelectedPercentage(value);
  };

  return (
    <GestureRecognizer onSwipeDown={() => setUnstakeModalVisible((prevValue) => !prevValue)}>
      <Modal
        animationType="slide"
        transparent
        visible={unstakeModalVisible}
        onRequestClose={() => setUnstakeModalVisible((prevValue) => !prevValue)}
      >
        <Loading visible={isLoading} />
        <TouchableOpacity
          style={styles.stakeModal}
          activeOpacity={1}
          onPressOut={() => setUnstakeModalVisible((prevValue) => !prevValue)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <View style={styles.topBar} />
            <View style={styles.stakeModalView}>
              <TouchableWithoutFeedback>
                <View>
                  <Text style={styles.stakeTitle}>How much $NEFT do you want to unstake?</Text>
                  <View style={styles.stakeContainer}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      keyboardType="numeric"
                      style={styles.neftAmountText}
                      value={tokensToUnstake}
                      onChange={(event) => setTokensToUnstake(event.nativeEvent.text)}
                    />
                    <Text style={styles.availableNeftText}>{`Staked: ${stakedAmount} $NEFT`}</Text>
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
                      buttonStyle={[styles.unstakeButtonAction]}
                      onPress={unstakeNEFT}
                      text="Unstake $NEFT"
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

UnstakeModal.propTypes = {
  nftTokenId: PropTypes.string.isRequired,
  unstakeModalVisible: PropTypes.bool.isRequired,
  setUnstakeModalVisible: PropTypes.func.isRequired,
  stakedAmount : PropTypes.number.isRequired
};

export default UnstakeModal;
