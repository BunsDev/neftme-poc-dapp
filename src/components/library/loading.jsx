import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator, Modal, StyleSheet, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(16, 15, 18, 0.8)',
    width: '100%',
    height: '100%',
  },
});

const Loading = ({ visible }) => (
  <Modal animationType="fade" transparent visible={visible}>
    <View style={styles.container}>
      <ActivityIndicator animating color="white" size="large" />
    </View>
  </Modal>
);

Loading.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Loading;
