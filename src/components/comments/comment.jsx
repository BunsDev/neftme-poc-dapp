import React from 'react';
import { NFTCommentPropTypes } from '@utils/proptypes';
import { Text, View } from 'react-native';
import { ProfileImage } from '@library';
import TimeAgo from 'javascript-time-ago';
import HeartIcon from '@assets/icons/heart.svg';
import { abbreviateNumber } from '@utils/numbers';
import styles from './styles';

const Comment = ({ comment }) => {
  const timeAgo = new TimeAgo('en-US');

  return (
    <View style={styles.commentcontainer}>
      <ProfileImage
        profileImage={comment.authorProfileImage}
        containerStyle={{
          ...styles.profileImageContainer,
          backgroundColor: comment.authorProfileColor,
        }}
        imageStyle={styles.profilePhoto}
        avatarWidth={18}
        avatarHeight={18}
      />
      <View style={styles.authorCommentContent}>
        <Text style={styles.authorText}>{comment.author}</Text>
        <View style={styles.commentContentWrapper}>
          <Text style={styles.commentText}>
            {comment.comment}
            {' '}
            <Text style={styles.timeText}>{timeAgo.format(new Date(comment.date), 'twitter')}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.likesContainer}>
        <HeartIcon width={14} height={12} />
        <Text style={styles.totalLikesText}>
          {
            comment.totalLikes > 999
              ? abbreviateNumber(comment.totalLikes, true) : comment.totalLikes
          }
        </Text>
      </View>
    </View>
  );
};

Comment.propTypes = {
  // eslint-disable-next-line react/require-default-props
  comment: NFTCommentPropTypes,
};

export default Comment;
