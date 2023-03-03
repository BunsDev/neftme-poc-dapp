import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Switch,
  Image,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import PostChallenge from '../../../services/challenge/challenge';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13131F',
  },
  hiddenContainer: {
    flexDirection: 'row',
    marginTop: '10%',
    marginHorizontal: '5%',
    alignItems: 'center',
  },
  hiddenText: {
    fontWeight: '500',
    fontSize: 18,
    color: '#FFF',
    paddingRight: '66%',
  },
  contentContainer: {
    marginTop: '5%',
    flexDirection: 'column',
  },
  image: {
    height: 350,
    width: '100%',
  },
  textInput: {
    fontWeight: '400',
    fontSize: 16,
    color: '#F8F8F8',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 174, 240, 0.27)',
    borderColor: 'rgba(0, 174, 240, 1)',
    borderWidth: 1,
    borderRadius: 8,
    height: '15%',
  },
  inputContainer: {
    marginHorizontal: '5%',
    marginTop: '2%',
  },
  valueInput: {
    backgroundColor: 'rgba(0, 174, 240, 0.27)',
    borderRadius: 8,
    height: 40,
    width: '70%',
    borderWidth: 1,
    borderColor: 'rgba(0, 174, 240, 1)',
    fontWeight: '400',
    fontSize: 16,
    color: '#F8F8F8',
    marginLeft: 0,
    marginTop: '3%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#00AEF0',
    flexDirection: 'row',
    marginTop: '8%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 16,
    color: '#FFF',
  },
  valueText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  valueContainer: {
    marginTop: '5%',
    marginBottom: 0,
  },
});

export type Props = {};

const FinalizeChallenge: React.FC<Props> = () => {
  const navigation = useNavigation<any>();
  const [isHidden, setIsHidden] = useState(false);
  const [description, setDescription] = useState('');
  const [challengeValue, setChallengeValue] = useState('');
  const route = useRoute();
  const challenge = route?.params?.challenge;

  const toggle = () => {
    setIsHidden(!isHidden);
  };

  const createChallenge = async () => {
    challenge.setHidden(isHidden);
    challenge.setValue(Number.parseFloat(challengeValue));
    const r = await PostChallenge(challenge);
    if (r.success) {
      Alert.alert('Success!');
    } else {
      Alert.alert('Error!', r.error);
    }
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://www.playtoearn.online/wp-content/uploads/2021/10/Bored-Ape-Yacht-Club-NFT-avatar.png',
            }}
          />
        </TouchableWithoutFeedback>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={description}
            placeholder="Do you want to add a description?"
            onChangeText={(text) => setDescription(text)}
            placeholderTextColor="rgba(248, 248, 248, 0.5)"
            keyboardType="default"
            textAlignVertical="top"
            multiline={true}
          />
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>Value</Text>

            <TextInput
              style={styles.valueInput}
              value={`${challengeValue}`}
              onChangeText={(text) => setChallengeValue(text)}
              placeholderTextColor="rgba(248, 248, 248, 0.5)"
              keyboardType="numeric"
              placeholder="Value"
              textAlignVertical="top"
              multiline={true}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => createChallenge()}
          >
            <Text style={styles.buttonText}>Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FinalizeChallenge;
