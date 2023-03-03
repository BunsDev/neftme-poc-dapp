import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import BackIcon from '@assets/icons/back.svg';
import { useQuery } from '@tanstack/react-query';
import AutoComplete from 'react-native-autocomplete-input';
import { useNavigation } from '@react-navigation/native';
import { ProfileImage } from '../../library';
import CentralChallengeModal from '../shared/challenge_modal';
import SetChallengeValueModal from '../shared/set_challenge_value_modal';
import ChallengeSuccessModal from '../shared/challenge_success_modal';
import { searchUserByPrompt } from '../../../services/user';
import Challenge from '../../../model/challenge_model';

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
    marginHorizontal: '5%',
  },

  aroundYouContainer: {
    alignSelf: 'center',
  },
  resultItem: {
    backgroundColor: '#13131F',
    paddingVertical: 10,
    height: 85,
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: '5%',
  },
  nftProfilePhoto: {
    width: 48,
    height: 48,
    borderRadius: 60,
  },
  searchBar: {
    borderWidth: 0,
  },
  listContainer: {
    borderWidth: 0,
  },
  input: {
    height: 40,
    borderWidth: 0,
    backgroundColor: '#2B2F3A',
    borderRadius: 10,
    paddingHorizontal: '3%',
    color: '#FFF',
  },
});

const typeOtions = [
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
  const navigation = useNavigation<any>();

  // TODO - TEMPORARY Move the modal to the correct place
  const [modalVisible, setModalVisible] = useState(false);
  const [valueModalVisible, setvalueModalVisible] = useState(false);
  const [challengeSuccessModalVisible, setChallengeSuccessModalVisible] =
    useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useQuery(['allUsers', searchInput], () => searchUserByPrompt(searchInput), {
    onSuccess(data) {
      setFilteredUsers(data);
    },
    staleTime: 5 * 1000,
  });

  const renderInput = () => (
    <TextInput
      autoCapitalize="none"
      style={styles.input}
      placeholder="Search"
      onChangeText={(text) => setSearchInput(text)}
    />
  );

  const navigateToWriteChallenge = (username: string) => {
    const c = new Challenge('', username, '', '', 0, false);

    navigation.navigate('WriteChallenge', {
      challenge: c,
    });
  };

  const renderList = () => (
    <FlatList
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      data={filteredUsers}
      bounces={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item?.username}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigateToWriteChallenge(item?.username)}
          style={styles.resultItem}
        >
          <ProfileImage
            profileImage={item?.profile_image}
            imageStyle={styles.nftProfilePhoto}
            avatarWidth={30}
            avatarHeight={30}
          />
          <Text style={styles.resultText}>{item?.username}</Text>
        </TouchableOpacity>
      )}
    />
  );

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
        {typeOtions.map((item: any, index) => (
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
          <AutoComplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.searchBar}
            inputContainerStyle={styles.input}
            listContainerStyle={styles.listContainer}
            // Data to show in suggestion
            data={filteredUsers}
            // Default value if you want to set something in input
            placeholderTextColor="#000"
            placeholder="Search"
            // Onchange of the text changing the state of the query
            // Which will trigger the findFilm method
            // To show the suggestions
            renderTextInput={renderInput}
            renderResultList={renderList}
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
