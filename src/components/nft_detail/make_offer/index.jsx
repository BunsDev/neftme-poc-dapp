import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useGetCurrentUserQuery } from '@features/current_user';
import { Button } from '@library';
import { convertFromETH18 } from '@utils/nft';
import { strIsEqual } from '@utils/words';
import { selectNFTsBids } from '@features/on_chain/nft';
import styles from './styles';
import ActionButtons from './action_buttons';
import CancelOffer from './cancel_offer';
import MakeOfferModal from '../action_modal';

const MakeOffer = ({ nftTokenId, owner, userStakedAmount }) => {
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [tokensToOffer, setTokensToOffer] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const { data: currentUser } = useGetCurrentUserQuery();
  const nftBids = useSelector(selectNFTsBids)[nftTokenId]?.bids;

  if (strIsEqual(owner, currentUser.walletAddress)) return null;

  const currentUserBid = nftBids?.data?.filter((b) => strIsEqual(b[0], currentUser.walletAddress));
  const lastBid = nftBids?.data?.[nftBids.data.length - 1];

  if (currentUserBid.length > 0) return <CancelOffer currentUserBid={currentUserBid[0]} />;
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
        inputSubTitle={lastBid ? `Last Offer: ${convertFromETH18(lastBid[2])} $NEFTS` : ''}
        isLoading={isLoading || nftBids?.loading === 'pending'}
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
