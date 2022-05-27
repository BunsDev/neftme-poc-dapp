import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { useGetCurrentUserQuery } from '@features/current_user';
import { Button } from '@library';
import { useSmartContract } from '@hooks';
import { convertFromETH18 } from '@utils/nft';
import styles from './styles';
import ActionButtons from './action_buttons';
import MakeOfferModal from '../action_modal';

const MakeOffer = ({ nftTokenId, owner, userStakedAmount }) => {
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [tokensToOffer, setTokensToOffer] = useState('0');
  const [lastBid, setLastBid] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { getContractMethods } = useSmartContract();
  const { data: currentUser } = useGetCurrentUserQuery();

  useEffect(() => {
    const fetchLastBid = async () => {
      try {
        if (owner.toLowerCase() !== currentUser.walletAddress.toLowerCase()) {
          const contractMethods = await getContractMethods(
            Constants.manifest.extra.neftmeErc721Address,
          );
          const response = await contractMethods
            .getBids(nftTokenId)
            .call();
          if (response?.[0]?.[0]?.[2] !== '0') setLastBid(response?.[0]?.[0]?.[2]);
        }
      } catch (err) {
        // log error :) or not
      }
    };
    fetchLastBid();
  }, []);

  if (owner.toLowerCase() === currentUser.walletAddress.toLowerCase()) return null;

  return (
    <>
      <Button
        primary={false}
        buttonStyle={userStakedAmount > 0 ? styles.makeOfferButton : styles.secondButton}
        onPress={() => setShowOfferModal(true)}
        text="Make an Offer"
        textStyle={styles.makeOfferText}
      />
      <MakeOfferModal
        actionModalVisible={showOfferModal}
        inputSubTitle={lastBid !== undefined ? `Last Offer: ${convertFromETH18(lastBid)} $NEFT` : ''}
        isLoading={isLoading}
        modalTitle="How much $NEFT do you want to offer?"
        neftBalance={0}
        setActionModalVisible={setShowOfferModal}
        showPercentages={false}
        tokensAmount={tokensToOffer}
        setTokensAmount={setTokensToOffer}
      >
        <ActionButtons
          nftTokenId={nftTokenId}
          setIsLoading={setIsLoading}
          setShowOfferModal={setShowOfferModal}
          tokensToOffer={tokensToOffer}
        />
      </MakeOfferModal>
    </>
  );
};

MakeOffer.propTypes = {
  nftTokenId: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  userStakedAmount: PropTypes.number.isRequired,
};

export default MakeOffer;
