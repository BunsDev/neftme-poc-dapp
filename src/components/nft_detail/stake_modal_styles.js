import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  stakeModal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  topBar: {
    marginHorizontal: 120,
    marginBottom: 10,
    height: 5,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  stakeModalView: {
    backgroundColor: '#2C2C39',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 18,
  },
  stakeTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  stakeContainer: {
    backgroundColor: '#41414A',
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  neftAmountText: {
    fontSize: 56,
    marginTop: 30,
    color: '#FFF',
    letterSpacing: 1,
  },
  availableNeftText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
    marginTop: 32,
    marginBottom: 30,
  },
  percentageButtonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  stakePercentageButton: {
    flex: 0.25,
  },
  stakePercentageButtonMargin: {
    marginLeft: 16,
  },
  stakeButtonsActionContainer: {
    flexDirection: 'row',
    marginTop: 32,
  },
  stakeButtonAction: {
    flex: 0.5,
  },
  marginLeft10: {
    marginLeft: 10,
  },
});
