import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@library';
import ActionButtons from './action_buttons';
import UnstakeModal from '../action_modal';
import styles from './styles';

const Stake = ({
  fetchNftData, nftTokenId, userStakedAmount,
}) => {
  const [unstakeModalVisible, setUnstakeModalVisible] = useState(false);
  const [tokensToUnstake, setTokensToUnstake] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  if (userStakedAmount === 0) return null;

  return (
    <>
      <Button
        buttonStyle={styles.secondButton}
        onPress={() => setUnstakeModalVisible(true)}
        text="Unstake $NEFT"
        textStyle={styles.stakeText}
      />
      <UnstakeModal
        actionModalVisible={unstakeModalVisible}
        inputSubTitle={`Staked: ${userStakedAmount} $NEFT`}
        isLoading={isLoading}
        modalTitle="How much $NEFT do you want to unstake?"
        neftBalance={userStakedAmount}
        setActionModalVisible={setUnstakeModalVisible}
        showPercentages
        tokensAmount={tokensToUnstake}
        setTokensAmount={setTokensToUnstake}
      >
        <ActionButtons
          fetchNftData={fetchNftData}
          nftTokenId={nftTokenId}
          setIsLoading={setIsLoading}
          setUnstakeModalVisible={setUnstakeModalVisible}
          tokensToUnstake={tokensToUnstake}
        />
      </UnstakeModal>
    </>
  );
};

Stake.propTypes = {
  fetchNftData: PropTypes.func.isRequired,
  nftTokenId: PropTypes.string.isRequired,
  userStakedAmount: PropTypes.number.isRequired,
};

export default Stake;
