import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: '#232630',
    marginBottom: 32,
    borderRadius: 16,
    marginRight: 16,
  },
  nftHeader: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  nftProfilePhoto: {
    marginLeft: 16,
    marginRight: 16,
    width: 48,
    height: 48,
    borderRadius: 60,
  },
  nftHeaderTitle: {
    justifyContent: 'center',
  },
  nftHeaderName: {
    color: '#FCFCFC',
    fontSize: 16,
    fontWeight: '600',
  },
  nftHeaderFollowers: {
    color: '#FCFCFC',
    opacity: 0.72,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.75,
    lineHeight: 20,
  },
  saveFavoriteIcon: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  nftNFTPhoto: {
    width: '100%',
    height: 342,
  },
  detailsContainer: {
    marginTop: 19,
    marginBottom: 18,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  detailCenter: {
    marginHorizontal: 25,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#FFFFFFB5',
  },
  detailText: {
    color: '#FFFFFFB5',
    marginLeft: 10,
  },
  nftTitle: {
    fontSize: 24,
    color: '#FCFCFC',
    fontWeight: '700',
    marginLeft: 16,
    lineHeight: 32,
  },
  nftDescription: {
    color: 'rgba(255, 255, 255, 0.71)',
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 16,
    lineHeight: 21,
  },
  readMoreText: {
    color: '#feda79',
    fontWeight: 'bold',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  tokenomicsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 22,
  },
  stakedContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  supportersContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
  stakedStyle: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '700',
    color: '#FCFCFC',
    opacity: 0.53,
    lineHeight: 19,
    marginLeft: 8,
  },
  neftsAmountStyle: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: '700',
    color: '#FCFCFC',
    lineHeight: 22,
    marginLeft: 8,
  },
  economicDetails: {
    color: '#FCFCFC',
    lineHeight: 21,
    fontSize: 15,
  },
  fontWeight700: {
    fontWeight: '700',
  },
});
