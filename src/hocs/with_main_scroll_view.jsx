import React from 'react';
import PropTypes from 'prop-types';
import { BottomBar, StatusBar } from '@library';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#141316',
    marginBottom: 78,
  },
});

const withMainScrollView = (WrappedComponent) => {
  const wrapped = ({ showBottomBar, showStatusBar }) => (
    <>
      {showStatusBar && <StatusBar />}
      <StatusBar />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#303040', '#141316']}
          start={[0, 0]}
          end={{ x: 0, y: 0.1 }}
        >
          <WrappedComponent />
        </LinearGradient>
      </ScrollView>
      {showBottomBar && <BottomBar />}
      <BottomBar />
    </>
  );

  wrapped.defaultProps = {
    showBottomBar: true,
    showStatusBar: true,
  };

  wrapped.propTypes = {
    showBottomBar: PropTypes.bool,
    showStatusBar: PropTypes.bool,
  };

  return wrapped;
};

export default withMainScrollView;
