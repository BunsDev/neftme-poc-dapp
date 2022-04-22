import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: '#19191f',
  },
  backIcon: {
    position: 'absolute',
    left: 16,
    top: 58,
    zIndex: 1000,
  },
  image: {
    width: '100%',
    height: 494,
  },
  nftTitle: {
    fontSize: 24,
    color: '#FCFCFC',
    fontWeight: '700',
    marginLeft: 16,
    lineHeight: 32,
  },
  nftDescription: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  tokenomicsContainer: {
    marginTop: 26,
    backgroundColor: '#2B2F3A',
    paddingTop: 16,
    borderRadius: 16,
    paddingBottom: 16,
    marginHorizontal: 16,
  },
  tokenomicsCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  tokenomicsCardUnstake: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  stakeButton: {
    marginRight: 10,
    flex: 0.5,
  },
  unstakeButton: {
    marginLeft: 10,
    flex: 0.5,
  },
  stakeText: {
    color: '#22222B',
    fontWeight: 'bold',
  },
  makeOfferButton: {
    flex: 0.5,
    marginRight: 10,
    marginLeft: 10,
  },
  makeOfferButtonUnstake: {
    flex: 1,
  },
  makeOfferText: {
    color: '#FCFCFC',
    fontWeight: '500',
  },
  carouselContainer: {
    marginTop: 42,
    marginLeft: 16,
  },
  horizontalBar: {
    flex: 1,
    height: 1,
    marginHorizontal: 16,
    backgroundColor: '#52657366',
  },
  nftDetailView: {
    marginTop: 26,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
