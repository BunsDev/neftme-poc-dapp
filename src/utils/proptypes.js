import PropTypes from 'prop-types';

export const ProfileDataDefaultProps = {
  bio: '',
  profileImage: '',
  walletAddress: '',
};

export const ProfileDataPropTypes = PropTypes.shape({
  bio: PropTypes.string,
  followers: PropTypes.string.isRequired,
  following: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
  walletAddress: PropTypes.string,
  profileColor: PropTypes.string.isRequired,
}).isRequired;
