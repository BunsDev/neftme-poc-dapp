import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import BackIcon from '@assets/icons/back.svg';
import CentralChallengeModal from './challenge_modal';

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
    marginLeft: '20%',
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
];

export type Props = {};

const SelectUser: React.FC<Props> = () => {
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState('');

  // TEMPORARY
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <CentralChallengeModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
      />
      <TouchableOpacity style={styles.backIcon}>
        <BackIcon width={25} height={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {options.map((item: any, index) => (
          <TouchableOpacity
            onPress={() => setSelected(index)}
            style={styles.individualText}
            key={`option_${item.text}`}
          >
            <View key={`option_${item.text}`} style={selected === index ? styles.selected : null}>
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
          <View style={styles.aroundYouContainer}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.textStyle]}>Coming Soon!</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default SelectUser;
