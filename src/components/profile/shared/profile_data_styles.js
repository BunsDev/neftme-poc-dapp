import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 180,
    marginLeft: 16,
  },
  profilePicture: {
    borderWidth: 3,
    borderColor: '#222222',
  },
  name: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 18,
    color: '#FCFCFC',
    marginTop: 10,
  },
  wallet: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
    color: '#FFFFFF',
    marginTop: 10,
  },
  socialContainer: {
    alignItems: 'flex-end',
  },
  followsContainer: {
    flexDirection: 'row',
    marginTop: 41.5,
  },
  followers: {
    marginRight: 51,
  },
  totalFollow: {
    color: '#FCFCFC',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
  },
  followLabel: {
    color: '#FFFFFF',
    opacity: 0.6,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 13,
    textAlign: 'center',
  },
  following: {
    marginRight: 35.5,
  },
  shareContainer: {
    flexDirection: 'row',
    paddingHorizontal: 38,
    paddingVertical: 6,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#FCFCFC',
    marginRight: 33,
    borderRadius: 16,
    marginTop: 24,
  },
  shareText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '700',
    color: '#FCFCFC',
  },
  bioContainer: {
    marginTop: 36.5,
    marginHorizontal: 16,
  },
  bioText: {
    fontSize: 24,
    color: '#FCFCFC',
  },
  profileImageContainer: {
    padding: 24,
  },
  profileImageStyles: {
    width: 112,
    height: 112,
  },
});
