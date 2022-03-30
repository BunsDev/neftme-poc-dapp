import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@library';
import UploadIcon from '@assets/icons/upload.svg';

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#fff',
  },
  imageContainer: {
    marginTop: 8,
    backgroundColor: 'rgba(65, 65, 74, 0.5)',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  flex05: {
    flex: 0.5,
  },
  marginRight4: {
    marginRight: 4,
  },
  marginLeft4: {
    marginLeft: 4,
  },
  buttonIcon: {
    width: 22,
    height: 18,
    marginRight: 14,
  },
});

const ImageSection = ({ title, children }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.imageContainer}>
      {children}
    </View>
    <View style={styles.buttonsContainer}>
      <View style={[styles.flex05, styles.marginRight4]}>
        <Button primary text="Select NFTs" />
      </View>
      <View style={[styles.flex05, styles.marginLeft4]}>
        <Button primary={false} text="Upload" Icon={UploadIcon} iconStyle={styles.buttonIcon} />
      </View>
    </View>
  </View>
);

ImageSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
};

export default ImageSection;
