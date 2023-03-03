import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Switch,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inputContainer: {
    backgroundColor: 'rgba(0, 174, 240, 0.27)',
    borderRadius: 8,
    padding: 16,
    marginTop: '10%',
    flexDirection: 'row',
    marginHorizontal: '5%',
    height: '45%',
  },
  textInput: {
    fontWeight: '400',
    fontSize: 16,
    color: '#F8F8F8',
  },
  hiddenContainer: {
    flexDirection: 'row',
    marginTop: 100,
    marginHorizontal: '5%',
    alignItems: 'center',
  },
  hiddenText: {
    fontWeight: '500',
    fontSize: 18,
    color: '#FFF',
    paddingRight: '66%',
  },
  closeKeyboard: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#00AEF0',
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginTop: '15%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 16,
  },
});
const TextChallenge = () => {
  const [challengeText, setChallengeText] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const navigation = useNavigation<any>();

  const toggle = () => {
    setIsHidden(!isHidden);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.hiddenContainer}>
          <Text style={styles.hiddenText}>Hidden</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isHidden ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggle}
            value={isHidden}
          />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.inputContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.closeKeyboard}>
            <TextInput
              style={styles.textInput}
              value={challengeText}
              placeholder="Type your Challenge!"
              onChangeText={(text) => setChallengeText(text)}
              placeholderTextColor="rgba(248, 248, 248, 0.5)"
              keyboardType="default"
              textAlignVertical="top"
              multiline={true}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={navigation.navigate}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextChallenge;
