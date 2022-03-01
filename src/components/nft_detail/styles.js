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
  tokenomicsContainer: {
    marginTop: 26,
    backgroundColor: '#2B2F3A',
    paddingTop: 16,
    borderRadius: 16,
    paddingBottom: 29,
    marginHorizontal: 16,
  },
  tokenomicsCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  tokenomicsBaseButton: {
    borderRadius: 8,
    paddingVertical: 13,
    marginRight: 5,
    flex: 0.5,
  },
  stakeButton: {
    backgroundColor: '#F6C138',
  },
  stakeText: {
    color: '#22222B',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  makeOfferButton: {
    backgroundColor: '#41414A',
  },
  makeOfferText: {
    color: '#FCFCFC',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
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
