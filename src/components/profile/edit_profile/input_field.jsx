/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import ProfileTextInput from './profile_text_input';

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

const InputField = ({
  labelName, value, inputPlaceholder, inputStyle, onFieldChange, ...rest
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{labelName}</Text>
    <ProfileTextInput
      value={value}
      onChangeText={onFieldChange}
      inputPlaceholder={inputPlaceholder}
      inputStyle={inputStyle}
      {...rest}
    />
  </View>
);

InputField.defaultProps = {
  inputStyle: {},
  value: '',
};

InputField.propTypes = {
  labelName: PropTypes.string.isRequired,
  value: PropTypes.string,
  inputPlaceholder: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  inputStyle: PropTypes.instanceOf(Object),
};

export default InputField;
