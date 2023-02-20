import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from '../../library/button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 100,
    width: '100%',
  },
  modalView: {
    width: '80%',
    height: '70%',
    backgroundColor: '#2B2F3A',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#2B2F3A',
  },
  touchOutsideCloseModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchOutsideCloseModal2: {
    backgroundColor: '#FFF',
  },
  challengeText: {
    fontWeight: '500',
    fontSize: 21,
    color: '#FFF',
  },
  challengeTextContainer: {
    marginTop: '10%',
    marginLeft: '5%',
    marginBottom: '10%',
  },
  input: {
    height: 40,
    width: '60%',
    margin: 12,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#2B2F3A',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#FFF',
  },
  nextButton: {
    fontWeight: '700',
    fontSize: 16,
    alignContent: 'center',
    marginHorizontal: '5%',
    marginTop: '30%',
  },
  valueContainer: {
    marginTop: '10%',
  },
  valueSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  needMoreText: {
    color: '#FFF',
    fontWeight: '300',
    fontSize: 13,
  },
  valueText: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 18,
    marginLeft: '5%',
  },
});

export type Props = {
  isVisible: boolean;
  setIsVisible: Function;
};

const SetChallengeValueModal: React.FC<Props> = ({
  isVisible,
  setIsVisible,
}) => {
  const [challengeValue, setValue] = useState(0);

  return (
    <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(!isVisible);
        }}
      >
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={styles.touchOutsideCloseModal}
        >
          <TouchableWithoutFeedback>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.challengeTextContainer}>
                  <Text style={styles.challengeText}>
                    Challenge @Make Dynamic
                  </Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>Value</Text>

                  <View style={styles.valueSubContainer}>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      onChange={(event) => setValue(event.nativeEvent.target)}
                      value={`${challengeValue}`}
                      maxLength={10}
                    />
                    <TouchableOpacity>
                      <Text style={styles.needMoreText}>Need more?</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Button buttonStyle={styles.nextButton} text="Challenge" />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
  );
};

export default SetChallengeValueModal;
