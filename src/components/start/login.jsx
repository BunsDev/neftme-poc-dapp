import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Alert } from 'react-native';
import { Button } from '@library';
import { doLogin } from '@services/login';
import styles from './styles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginSubmit = async () => {
    const response = await doLogin(email, password);
    if (response.success) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Login', 'Something went wrong. Please try again', [
        { text: 'OK', onPress: () => { } },
      ]);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.emailInput}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.emailInput}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholder="Password"
      />
      <Button text="Login" onPress={onLoginSubmit} buttonStyle={styles.loginButton} />
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
