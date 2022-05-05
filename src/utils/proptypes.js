import PropTypes from 'prop-types';

export const ProfileDataDefaultProps = {
  bio: '',
  profileImage: '',
  walletAddress: '',
};

export const ProfileDataPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  isCurrentUserFollowing: PropTypes.bool.isRequired,
  bio: PropTypes.string,
  totalFollowers: PropTypes.string.isRequired,
  totalFollowing: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
  walletAddress: PropTypes.string,
  profileColor: PropTypes.string.isRequired,
}).isRequired;
