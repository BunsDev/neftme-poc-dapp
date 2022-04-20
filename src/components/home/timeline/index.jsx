import React, { useEffect, useState } from 'react';
import { getTimelineContent } from '@services/user';
import { View } from 'react-native';
import { SectionHeader } from '@library';
import Nft from './nft';
import Ranking from './ranking';
import styles from './styles';
import { useWalletConnect } from "@walletconnect/react-native-dapp";

const Timeline = () => {
  const [content, setContent] = useState([]);
  const connector = useWalletConnect();
  console.log("home");
  console.log(connector.chainId);

  useEffect(async () => {
    setContent(await getTimelineContent());
  }, []);

  const refreshClick = async () => {
    setContent(await getTimelineContent());
  };

  return (
    <View style={styles.timelineContainer}>
      <SectionHeader title="Following" onSeeAllClick={refreshClick} containerStyle={styles.headerStyle} />
      {content.map((c) => {
        if (c.type === 'NFT') {
          return <Nft key={`nft_${c.content.id}`} nft={c.content} />;
        }
        if (c.type === 'RANKING') {
          return <Ranking key={`ranking_${c.content.id}`} ranking={c.content} />;
        }
        return null;
      })}
    </View>
  );
};

export default Timeline;
