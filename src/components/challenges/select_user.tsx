import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import BackIcon from '@assets/icons/back.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B2F3A',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    width: '80%',
    height: '70%',
    backgroundColor: '#2B2F3A',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#555555',
  },
  buttonClose: {},
});

export type Props = {};

const SelectUser: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.centeredView}>
        <BackIcon width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

export default SelectUser;
