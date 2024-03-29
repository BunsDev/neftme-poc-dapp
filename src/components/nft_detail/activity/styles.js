import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  itemContainer: {
    backgroundColor: '#2B2F3A',
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 20,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    color: '#FCFCFC',
    fontWeight: '600',
  },
  description: {
    color: '#FCFCFC',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.75,
    paddingTop: 10,
  },
  descriptionNumber: {
    color: '#FCFCFC',
    opacity: 20,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.75,
    paddingTop: 10,
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    flexGrow: 0,
  },
  address: {
    color: '#FCFCFC',
    fontWeight: '400',
    opacity: 70,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.75,
    paddingTop: 10,
  },
  tokenomicsContainer: {
    marginTop: 26,
    backgroundColor: '#2B2F3A',
    paddingTop: 16,
    borderRadius: 16,
    paddingBottom: 16,
    marginHorizontal: 16,
  },
  reviewText: {
    fontWeight: '700',
    fontSize: 14,
    color: 'rgba(254, 212, 76, 1)',
    paddingRight: 10,
  },
  reviewBox: {
    flexDirection: 'column',
    marginBottom: 8,
    borderRadius: 16,
  },
  reviewButton: {
    flex: 1,
    alignItems: 'flex-end',
    top: 0,
    alignSelf: 'flex-start',
    marginTop: 14,
  },
});
