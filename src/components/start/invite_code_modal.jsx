import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@library';
import { postInvite } from '@services/invite';

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
  const navigation = useNavigation();
  const [code, setCode] = useState('');

  const submitCode = async () => {
    const r = await postInvite(code);
    navigation.navigate({
      name: 'Start',
      params: { screen: 'InfoScreen' },
    });
  };

  const onChangeHandler = (event) => {
    setCode(event.target.value);
  };

  return (
    <View style={styles.container}>
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
          <TextInput
            style={styles.input}
            placeholder="AAAABBBB1234"
            onChange={onChangeHandler}
            value={code}
          />
        </View>
        <View style={styles.individualSettingView}>
          <Button
            text="Submit"
            onPress={() => submitCode(code)}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

export default InviteCodeModal;
