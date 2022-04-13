import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  skipContainer: {
    width: '100%',
    alignItems: 'flex-end',
    padding: 16,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#878787',
  },
  logoContainer: {
    marginTop: 31,
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 64,
  },
  newAccountButton: {
    backgroundColor: '#fff',
    width: 252,
    marginTop: 16,
  },
  newAccountButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  startTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 25,
  },
  startSubTitle: {
    marginTop: 8,
    marginHorizontal: 58,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 25,
    marginBottom: 0,
  },
  categoriesList: {
    backgroundColor: 'transparent',
  },
  saveButtonStyle: {
    marginTop: 30,
    paddingHorizontal: 57.5,
  },
  profilePhotoContainer: {
    marginTop: 36,
    width: 217,
    height: 217,
    backgroundColor: 'rgb(50, 50, 58)',
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhotoPlaceholder: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});
