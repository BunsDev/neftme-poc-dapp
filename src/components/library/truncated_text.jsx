import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

const TEXT_SIZE = 60;

const styles = StyleSheet.create({
  textStyle: {
    color: 'rgba(255, 255, 255, 0.71)',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  more: {
    color: '#feda79',
    fontWeight: 'bold',
  },
});

const showMoreLabel = (text) => text.trim().length > TEXT_SIZE + 3;

const prepareText = (text) => (
  showMoreLabel(text) ? `${text.trim().slice(0, TEXT_SIZE)}...` : text.trim()
);

const TruncatedText = ({ text, textStyle }) => (
  <Text style={[styles.textStyle, textStyle]}>
    {prepareText(text)}
    {showMoreLabel(text) && <Text style={styles.more}> more</Text>}
  </Text>
);

TruncatedText.defaultProps = {
  textStyle: {},
};

TruncatedText.propTypes = {
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.instanceOf(Object),
};

export default TruncatedText;
