import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  chip: {
    width: 103,
    height: 103,
    backgroundColor: '#41414A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  text: {
    marginTop: 8,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

const SelectMore = ({ onPress }) => (
  <TouchableOpacity style={styles.chip} onPress={onPress}>
    <Text style={styles.text}>Select more from library</Text>
  </TouchableOpacity>
);

SelectMore.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default SelectMore;
