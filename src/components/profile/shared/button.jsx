import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FCFCFC',
    flex: 0.5,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#FCFCFC',
    textAlign: 'center',
    borderRadius: 16,
    paddingVertical: 6,
  },
});

const Button = ({ text, style }) => (
  <Text style={[styles.button, style]}>{text}</Text>
);

Button.defaultProps = {
  style: {},
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.instanceOf(Object),
};

export default Button;
