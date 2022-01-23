import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    marginTop: 54,
    marginLeft: 21,
  },
  header: {
    flexDirection: 'row',
    marginRight: 21,
  },
  subHeaderRight: {
    flex: 0.5,
  },
  subHeaderLeft: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logo: {
    width: 130,
    height: 56,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profilePhotoPlaceholder: {
    backgroundColor: '#232630',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  trendingContainer: {
    marginTop: '8%',
  },
  trendingTitleContainer: {
    flex: 0.5,
  },
  trendingTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  seeAllText: {
    color: '#B389FC',
    fontSize: 16,
    fontWeight: '500',
  },
  profilesList: {
    marginTop: '2%',
    flexDirection: 'row',
    height: 203,
  },
  profileItem: {
    width: '37%',
    backgroundColor: '#232630',
    marginRight: '3%',
    borderRadius: 16,
  },
  profileItemHeaderImage: {
    maxWidth: '100%',
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
  },
  timelineContainer: {
    marginTop: 98,
    marginRight: 21,
    height: 651,
    backgroundColor: '#232630',
  },
  postHeader: {
    flexDirection: 'row',
    marginTop: 31,
  },
  postProfilePhoto: {
    marginLeft: 16,
    marginRight: 16,
  },
  postHeaderTitle: {
    justifyContent: 'center',
  },
  postHeaderName: {
    color: '#FCFCFC',
    fontSize: 16,
    fontWeight: '600',
  },
  postHeaderFollowers: {
    color: '#FCFCFC',
    opacity: 0.72,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.75,
    lineHeight: 20,
  },
  postNFTPhoto: {
    maxWidth: '100%',
    marginTop: 22,
  },
});
