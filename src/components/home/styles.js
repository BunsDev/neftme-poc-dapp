import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainView: {
    marginLeft: 16,
  },
  header: {
    flexDirection: 'row',
  },
  subHeaderRight: {
    flex: 1,
  },
  subHeaderLeftContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: '5%',
  },
  subHeaderLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 130,
    height: 56,
  },
  profilePhoto: {
    width: 48,
    height: 48,
  },
  profileImageContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhotoPlaceholder: {
    backgroundColor: '#232630',
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonClose: {
    alignSelf: 'flex-end',
    paddingTop: 10,
    paddingRight: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
  },
});
