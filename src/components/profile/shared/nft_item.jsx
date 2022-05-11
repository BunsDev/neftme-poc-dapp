import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getNFTByTokenID } from '@services/nft';
import { NftCard } from '@library';
import { abbreviateNumber } from '@utils/numbers';
import { convertFromETH18 } from '@utils/nft';

const NftItem = ({ nft }) => {
  const [loaded, setLoaded] = useState(false);
  const [nftData, setNftData] = useState({
    tokenId: nft[0],
    totalStaked: abbreviateNumber(convertFromETH18(nft[1])),
    royalty: nft[2],
    totalSupporters: nft[3],
    ownerAddress: nft[4],
    creatorAddress: nft[5],
  });

  useEffect(() => {
    const fetchNft = async () => {
      // TODO: save on redux;
      const res = await getNFTByTokenID(nft[0]);
      setNftData((prevValue) => ({
        ...prevValue,
        title: res.title,
        image: res.image,
      }));
      setLoaded(true);
    };
    fetchNft();
  }, []);

  if (!loaded) return null;

  return <NftCard nft={nftData} />;
};

NftItem.propTypes = {
  nft: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NftItem;
