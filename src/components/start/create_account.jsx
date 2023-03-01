import React, { useRef, useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Button,
  Loading,
  StatusBar,
} from '@library';
import { createAccount } from '@services/user';
import { LinearGradient } from 'expo-linear-gradient';
import { CommonActions, useNavigation } from '@react-navigation/native';
import styles from './styles';

const CreateAccount = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const refEmail = useRef();
  const refPassword = useRef();

  const onFormSubmit = async () => {
    if (!username || !email || !password) {
      return;
    }

    setIsLoading(true);
    const response = await createAccount(username, email, password);
    if (response?.success !== true) {
      setIsLoading(false);
      Alert.alert('Something went wrong, please try again');
      return;
    }
    setIsLoading(false);
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{
        name: 'Start',
        params: { screen: 'Wallet' },
      }],
    }));
  };

  return (
    <View style={styles.flex1}>
      <StatusBar />
      <LinearGradient
        colors={['#303040', '#141316']}
        start={[0, 0]}
        end={{ x: 0, y: 1 }}
        style={styles.flex1}
      >
        {isLoading && <Loading />}
        <View style={[styles.flex1, styles.createAccountContainer]}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.subtitleWelcome}>Sign up to get started.</Text>
          <View style={[styles.flex1, styles.signUpFormContainer]}>
            <View>
              <Text style={styles.fieldLabel}>Username</Text>
              <TextInput
                autoCapitalize="none"
                style={styles.fieldInput}
                value={username}
                onChangeText={setUsername}
                onSubmitEditing={() => refEmail.current.focus()}
              />
            </View>
            <View style={styles.marginTop16}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                autoCapitalize="none"
                style={styles.fieldInput}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                ref={refEmail}
                onSubmitEditing={() => refPassword.current.focus()}
              />
            </View>
            <View style={styles.marginTop16}>
              <Text style={styles.fieldLabel}>Password</Text>
              <TextInput
                style={styles.fieldInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                ref={refPassword}
                onSubmitEditing={onFormSubmit}
              />
            </View>
            <Button
              buttonStyle={[styles.createAccountButton]}
              text="Create Account"
              onPress={onFormSubmit}
              textStyle={styles.colorWhite}
              disabled={true}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default CreateAccount;
