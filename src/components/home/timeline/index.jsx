import React, { useEffect, useState } from 'react';
import { getTimelineContent } from '@services/user';
import { View } from 'react-native';
import { SectionHeader } from '@library';
import Nft from './nft';
import Ranking from './ranking';
import styles from './styles';

const Timeline = () => {
  const [content, setContent] = useState([]);

  useEffect(async () => {
    setContent(await getTimelineContent());
  }, []);

  const refreshClick = async () => {
    setContent(await getTimelineContent());
  };

  const setNft = (nft) => {
    // TODO: Move to redux;
    const newContent = Array.from(content).map((c) => (
      c.content.id !== nft.id ? c : ({
        type: 'NFT',
        content: nft,
      })));
    setContent(newContent);
  };

  return (
    <View style={styles.timelineContainer}>
      <SectionHeader title="Following" onSeeAllClick={refreshClick} containerStyle={styles.headerStyle} />
      {content.map((c) => {
        if (c.type === 'NFT') {
          return <Nft key={`nft_${c.content.id}`} nft={c.content} setNft={setNft} />;
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
