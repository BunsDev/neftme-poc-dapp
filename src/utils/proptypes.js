import PropTypes from 'prop-types';

export const ProfileDataDefaultProps = {
  bio: '',
  profileImage: '',
  walletAddress: '',
};

export const ProfileDataPropTypes = PropTypes.shape({
  bio: PropTypes.string,
  id: PropTypes.number.isRequired,
  isCurrentUserFollowing: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  profileColor: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
  totalFollowers: PropTypes.string.isRequired,
  totalFollowing: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  walletAddress: PropTypes.string,
}).isRequired;

export const NFTPopTypes = PropTypes.shape({
  comments: PropTypes.number.isRequired,
  currentUserLike: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  profileColor: PropTypes.string.isRequired,
  profilePhoto: PropTypes.string,
  profitPercentage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tokenId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}).isRequired;
