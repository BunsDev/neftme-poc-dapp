import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inputContainer: {
    backgroundColor: 'rgba(0, 174, 240, 0.27)',
    borderRadius: 8,
    padding: 16,
    marginTop: '30%',
    flexDirection: 'row',
    marginHorizontal: '5%',
    height: '45%',
  },
  textInput: {
    fontWeight: '400',
    fontSize: 16,
    color: '#F8F8F8',
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

export type Props = {};

const TextChallenge: React.FC<Props> = () => {
  const [challengeText, setChallengeText] = useState('');
  const navigation = useNavigation<any>();
  const route = useRoute();
  const challenge = route?.params?.challenge;

  const nextStep = () => {
    challenge.setDescription(challengeText);
    navigation.navigate('FinalizeChallenge', { challenge });
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.button} onPress={() => nextStep()}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextChallenge;
