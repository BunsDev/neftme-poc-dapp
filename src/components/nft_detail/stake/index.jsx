import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { useGetCurrentUserQuery } from '@features/current_user';
import { Button } from '@library';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useSmartContract } from '@hooks';
import StakeModal from '../action_modal';
import ActionButtons from './action_buttons';
import styles from './styles';

const Stake = ({
  fetchNftData, nftTokenId, owner, userStakedAmount,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [stakeModalVisible, setStakeModalVisible] = useState(false);
  const [neftBalance, setNeftBalance] = useState(0);
  const [tokensToStake, setTokensToStake] = useState('0');
  const connector = useWalletConnect();
  const { getContractMethods } = useSmartContract();
  const { data: currentUser } = useGetCurrentUserQuery();

  const getNEFTBalance = async () => {
    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeErc20NEFTAddress,
    );
    contractMethods.balanceOf(connector.accounts[0]).call()
      .then((balance) => {
        setNeftBalance(balance * 10 ** -18);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getNEFTBalance();
  }, [connector]);

  return (
    <>
      <Button
        buttonStyle={[
          styles.stakeButton,
          userStakedAmount === 0
            && owner.toLowerCase() === currentUser.walletAddress.toLowerCase()
            ? { flex: 1 } : {},
        ]}
        onPress={() => setStakeModalVisible(true)}
        text="Stake $NEFT"
        textStyle={styles.stakeText}
      />
      <StakeModal
        actionModalVisible={stakeModalVisible}
        inputSubTitle={`Available: ${neftBalance.toFixed(2)} $NEFT`}
        isLoading={isLoading}
        modalTitle="How much $NEFT do you want to stake?"
        neftBalance={neftBalance}
        setActionModalVisible={setStakeModalVisible}
        showPercentages
        tokensAmount={tokensToStake}
        setTokensAmount={setTokensToStake}
      >
        <ActionButtons
          fetchNftData={fetchNftData}
          nftTokenId={nftTokenId}
          setIsLoading={setIsLoading}
          setStakeModalVisible={setStakeModalVisible}
          tokensToStake={tokensToStake}
        />
      </StakeModal>
    </>
  );
};

Stake.propTypes = {
  fetchNftData: PropTypes.func.isRequired,
  nftTokenId: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  userStakedAmount: PropTypes.number.isRequired,
};

export default Stake;
