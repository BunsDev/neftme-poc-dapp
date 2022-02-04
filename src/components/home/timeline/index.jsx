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

  return (
    <View style={styles.timelineContainer}>
      <SectionHeader title="Following" onSeeAllClick={() => { }} containerStyle={styles.headerStyle} />
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
