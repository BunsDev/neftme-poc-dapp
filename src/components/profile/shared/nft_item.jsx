import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { NftCard } from '@library';
import { abbreviateNumber } from '@utils/numbers';
import { convertFromETH18 } from '@utils/nft';
import { fetchNFTByTokenID, selectNFTTokenId } from '@features/nft';

const NftItem = ({ nft }) => {
  const dispatch = useDispatch();
  const nftData = useSelector((state) => selectNFTTokenId(state, nft[0]));

  useEffect(() => {
    dispatch(fetchNFTByTokenID({ tokenId: nft[0] }));
  }, []);

  if (!nftData || !nftData.image) return null;

  const nftParams = {
    creatorAddress: nft[5],
    image: nftData.image,
    ownerAddress: nft[4],
    royalty: nft[2],
    title: nftData.title,
    tokenId: nft[0],
    totalStaked: abbreviateNumber(convertFromETH18(nft[1])),
    totalSupporters: nft[3],
  };
  return <NftCard nft={nftParams} />;
};

NftItem.propTypes = {
  nft: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default React.memo(NftItem);
