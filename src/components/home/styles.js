import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: '#303040',
  },
  mainView: {
    marginLeft: 16,
  },
  header: {
    flexDirection: 'row',
    marginRight: 18,
  },
  subHeaderRight: {
    flex: 0.5,
  },
  subHeaderLeftContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  subHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 56,
  },
  bellIcon: {
    marginRight: 28,
  },
  notificationBadge: {
    backgroundColor: '#FD0025',
    width: 9,
    height: 9,
    position: 'absolute',
    borderRadius: 20,
    left: 15,
    top: -2,
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
});
