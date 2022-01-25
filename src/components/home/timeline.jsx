import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getTimelineContent } from '@services/user';
import styles from './styles';
import Post from './post';

const Timeline = () => {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    setPosts(await getTimelineContent());
  }, []);

  return (
    <View style={styles.timelineContainer}>
      {posts.map((p) => <Post key={`post_${p.id}`} post={p} />)}
    </View>
  );
};

export default Timeline;
