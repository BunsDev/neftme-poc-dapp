import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { NFTCommentsPropTypes } from '@utils/proptypes';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { fetchNFTByTokenID } from '@features/nft';
import GestureRecognizer from 'react-native-swipe-gestures';
import Modal from 'react-native-modal';
import { useGetCurrentUserQuery } from '@features/current_user';
import { ProfileImage } from '@library';
import CloseIcon from '@assets/icons/simple_close_icon.svg';
import SendCommentIcon from '@assets/icons/send_comment.svg';
import { addComment } from '@services/nft/nft_comment';
import Comment from './comment';
import styles from './styles';

const Comments = ({ comments, closeModal, nftTokenId }) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
  const [writeNewComment, setWriteNewComment] = useState(false);
  const newCommentRef = useRef(null);
  const { data: currentUser } = useGetCurrentUserQuery();

  useEffect(() => {
    if (writeNewComment && newCommentRef?.current) {
      newCommentRef.current.focus();
    }
  }, [writeNewComment]);

  const postComment = async () => {
    const response = await addComment(nftTokenId, newComment);
    if (!response) {
      Alert.alert('Error', 'Something went wrong. Please try again');
      return;
    }
    dispatch(fetchNFTByTokenID({ tokenId: nftTokenId, forceRefresh: true }));
    setNewComment('');
  };

  return (
    <GestureRecognizer onSwipeRight={closeModal}>
      <Modal
        isVisible
        avoidKeyboard
        style={styles.commentModal}
        customBackdrop={(
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={{ flex: 1, backgroundColor: '#000' }} />
          </TouchableWithoutFeedback>
        )}
      >
        <View style={styles.actionModalView}>
          <View style={styles.header}>
            <Text style={styles.title}>{`${comments.length} comments`}</Text>
            <TouchableOpacity>
              <Pressable onPress={closeModal}>
                <CloseIcon />
              </Pressable>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.commentsContainer}>
              {comments.map((comment) => <Comment comment={comment} key={`comment${comment.id}`} />)}
            </View>
          </ScrollView>
          {!writeNewComment && (
            <View style={styles.commentPlaceholderContainer}>
              <Pressable onPress={() => setWriteNewComment(true)}>
                <Text style={{ color: newComment ? '#FFF' : 'rgba(255,255,255,0.54)' }}>
                  {newComment || 'Add comment...'}
                </Text>
              </Pressable>
            </View>
          )}
          {writeNewComment && (
            <View style={styles.addCommentContainer}>
              <ProfileImage
                profileImage={currentUser?.profileImage}
                containerStyle={{
                  ...styles.profileImageCommentContainer,
                  backgroundColor: currentUser?.profileColor,
                }}
                imageStyle={styles.profilePhoto}
                avatarWidth={18}
                avatarHeight={18}
              />
              <TextInput
                ref={newCommentRef}
                underlineColorAndroid="transparent"
                keyboardType="default"
                value={newComment}
                multiline
                style={styles.newCommentTextInput}
                onChange={(event) => setNewComment(event.nativeEvent.text)}
              />
              <Pressable style={styles.justifyCenter} onPress={postComment}>
                <SendCommentIcon width={24} height={24} />
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
    </GestureRecognizer>
  );
};

Comments.propTypes = {
  // eslint-disable-next-line react/require-default-props
  comments: NFTCommentsPropTypes,
  closeModal: PropTypes.func.isRequired,
  nftTokenId: PropTypes.string.isRequired,
};

export default Comments;
