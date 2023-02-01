import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, Text, TextInput } from 'react-native';
import { getData } from '@services/storage';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@library';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: '#21212b',
  },
  touchableOpacityStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  individualSettingView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  settingsFont: {
    paddingLeft: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    fontSize: 16,
  },
  bigText: {
    paddingLeft: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    fontSize: 22,
  },
  medText: {
    paddingLeft: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    fontSize: 18,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#F6C138',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '90%',
  },
});

const InviteCodeModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [newUser, setNewUser] = useState(true);
  const navigation = useNavigation();

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  useEffect(() => {
    (async () => {
      if ((await getData('requestInviteCode')) === 'true') {
        setNewUser(true);
      } else {
        setNewUser(false);
        navigation.navigate({
          name: 'Start',
          params: { screen: 'InfoScreen' },
        });
      }
    })();
  });

  return (
    newUser && (
      <View style={styles.container}>
        <Modal animationType="fade" transparent visible={isModalVisible}>
          <View style={styles.touchableOpacityStyle}>
            <View style={styles.individualSettingView}>
              <Text style={styles.bigText}>Welcome to NEFTME!</Text>
            </View>
            <View style={styles.individualSettingView}>
              <Text style={styles.medText}>You are just one step away!</Text>
            </View>
            <View style={styles.individualSettingView}>
              <Text style={styles.settingsFont}>
                Please insert your invite code to proceed!
              </Text>
            </View>

            <View style={styles.individualSettingView}>
              <TextInput style={styles.input} placeholder="AAAABBBB123" />
            </View>
            <View style={styles.individualSettingView}>
              <Button
                text="Submit"
                onPress={() => console.log('a')}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        </Modal>
      </View>
    )
  );
};

export default InviteCodeModal;
