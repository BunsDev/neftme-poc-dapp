import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import BackIcon from '@assets/icons/back.svg';
import { useNavigation } from '@react-navigation/native';
import CentralChallengeModal from '../shared/challenge_modal';
import SetChallengeValueModal from '../shared/set_challenge_value_modal';
import ChallengeSuccessModal from '../shared/challenge_success_modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13131F',
  },
  backIcon: {
    marginTop: '13%',
    marginLeft: '5%',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF',
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  selected: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  individualText: {
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'column',
    marginTop: '13%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#2B2F3A',
    backgroundColor: '#2B2F3A',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#FFF',
  },
  aroundYouContainer: {
    alignSelf: 'center',
  },
});

const options = [
  {
    text: 'Search',
  },
  {
    text: 'Around You',
  },
  {
    text: 'Cross Path',
  },
];

export type Props = {};

const SelectUser: React.FC<Props> = () => {
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();

  // TODO - TEMPORARY Move the modal to the correct place
  const [modalVisible, setModalVisible] = useState(false);
  const [valueModalVisible, setvalueModalVisible] = useState(false);
  const [challengeSuccessModalVisible, setChallengeSuccessModalVisible] =
    useState(false);

  return (
    <View style={styles.container}>
      <CentralChallengeModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
      />
      <SetChallengeValueModal
        isVisible={valueModalVisible}
        setIsVisible={setvalueModalVisible}
      />
      <ChallengeSuccessModal
        isVisible={challengeSuccessModalVisible}
        setIsVisible={setChallengeSuccessModalVisible}
      />
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <BackIcon width={25} height={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {options.map((item: any, index) => (
          <TouchableOpacity
            onPress={() => setSelected(index)}
            style={styles.individualText}
            key={`option_${item.text}`}
          >
            <View
              key={`option_${item.text}`}
              style={selected === index ? styles.selected : null}
            >
              <Text key={`option_${item.text}`} style={[styles.textStyle]}>
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.searchContainer}>
        {selected === 0 ? (
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChange={(event) => setSearch(event.nativeEvent.text)}
            value={search}
          />
        ) : (
          <View>
            <View style={styles.aroundYouContainer}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={[styles.textStyle]}>
                  Set desc and hidden modal
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.aroundYouContainer}>
              <TouchableOpacity
                onPress={() => setvalueModalVisible(!modalVisible)}
              >
                <Text style={[styles.textStyle]}>
                  Set value and challenge modal
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.aroundYouContainer}>
              <TouchableOpacity
                onPress={() =>
                  setChallengeSuccessModalVisible(!challengeSuccessModalVisible)
                }
              >
                <Text style={[styles.textStyle]}>
                  Challenge Successful Modal
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.aroundYouContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('StartChallenge', {
                    screen: 'CommandCentre',
                    params: {},
                  })
                }
              >
                <Text style={[styles.textStyle]}>Go to Command Centre</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default SelectUser;
