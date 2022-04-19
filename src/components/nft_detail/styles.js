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
  stakeButton: {
    marginRight: 10,
    flex: 0.5,
  },
  stakeText: {
    color: '#22222B',
    fontWeight: 'bold',
  },
  makeOfferButton: {
    flex: 0.5,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonClose: {
    alignSelf: 'flex-end',
    paddingTop: 10,
    paddingRight: 10,
  },
  stakeTitle: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 16,
    lineHeight: 21,
  },
  stakeContainer: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#41414A',
    borderRadius: 10,
    marginLeft: '5%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stakePercentageButton: {
    borderRadius: 8,
    paddingVertical: 13,
    flex: 0.25,
    backgroundColor: '#41414A',
    marginTop: 10,
    margin: 5,
  },
  stakePercentageButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  stakeButtonAction: {
    borderRadius: 8,
    paddingVertical: 13,
    margin: '1%',
    marginTop: 20,
    flex: 1,
    backgroundColor: '#F6C138',
  },
});
