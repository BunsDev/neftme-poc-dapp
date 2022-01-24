import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: '#141316',
  },
  mainView: {
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
    borderRadius: 45,
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
    marginLeft: 11,
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
  timelineContainer: {
    marginTop: 98,
    marginRight: 21,
  },
  headerContainer: {
    backgroundColor: '#232630',
    marginBottom: 69,
    borderRadius: 16,
    paddingTop: 31,
    paddingBottom: 12,
  },
  postHeader: {
    flexDirection: 'row',
  },
  postProfilePhoto: {
    marginLeft: 16,
    marginRight: 16,
    width: 48,
    height: 48,
    borderRadius: 60,
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
    width: '100%',
    height: 342,
    marginTop: 22,
  },
  detailsContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
  },
  postTitle: {
    fontSize: 24,
    color: '#FCFCFC',
    fontWeight: '700',
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mediaIcons: {
    marginLeft: 10,
  },
  postDescription: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '400',
    marginHorizontal: 16,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  stakedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EEB02A',
    borderWidth: 1,
    paddingVertical: 3,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  stakedStyle: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '700',
    color: '#FCFCFC',
    lineHeight: 32,
    marginLeft: 4,
  },
  economicDetails: {
    marginHorizontal: 16,
    marginTop: 4,
    textAlign: 'center',
    color: '#FCFCFC',
    lineHeight: 32,
    fontSize: 15,
  },
});
