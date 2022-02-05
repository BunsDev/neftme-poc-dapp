import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainerStyle: {
    marginTop: 36,
    marginBottom: 24,
  },
  profilesList: {
    flexDirection: 'row',
    height: 203,
    width: '100%',
  },
  profilesListPlaceholder: {
    backgroundColor: '#232630',
    width: '100%',
    justifyContent: 'center',
  },
  profileItem: {
    width: 145,
    height: 203,
    backgroundColor: '#232630',
    marginRight: 11,
    borderRadius: 16,
  },
  profileItemHeaderImage: {
    width: 145,
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  profileItemName: {
    color: '#FCFCFC',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '32%',
  },
  profileItemFollowers: {
    fontSize: 14,
    color: '#FCFCFC',
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 8,
  },
  profileItemUserPhoto: {
    position: 'absolute',
    left: '25%',
    top: '31%',
    width: 67,
    height: 67,
    borderRadius: 44,
  },
});
