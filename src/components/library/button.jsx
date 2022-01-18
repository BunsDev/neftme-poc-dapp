import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333333',
    width: '53%',
    minWidth: 160,
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    color: '#FCFCFC',
    fontWeight: 'bold',
    paddingTop: 9,
    paddingBottom: 9,
  },
});

const Button = ({
  text, onPress, buttonStyle, textStyle,
}) => (
  <Pressable style={[styles.button, buttonStyle]} onPress={onPress}>
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </Pressable>
);

Button.defaultProps = {
  buttonStyle: {},
  textStyle: {},
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.instanceOf(Object),
  textStyle: PropTypes.instanceOf(Object),
};

export default Button;
