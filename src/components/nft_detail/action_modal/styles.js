import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  actionModal: {
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
  actionModalView: {
    backgroundColor: '#2C2C39',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 18,
  },
  actionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  actionContainer: {
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
  actionPercentageButton: {
    flex: 0.25,
  },
  actionPercentageButtonMargin: {
    marginLeft: 16,
  },
});
