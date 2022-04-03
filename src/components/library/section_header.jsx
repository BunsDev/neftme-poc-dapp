import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View, ViewPropTypes,
} from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginRight: 18,
  },
  subHeaderRight: {
    flex: 0.75,
  },
  subHeaderLeftContainer: {
    flex: 0.25,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  trendingTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  seeAllText: {
    color: '#B389FC',
    fontSize: 16,
    fontWeight: '500',
  },
});

const SectionHeader = ({ title, onSeeAllClick, containerStyle }) => (
  <View style={containerStyle}>
    <View style={styles.header}>
      <View style={styles.subHeaderRight}>
        <Text style={styles.trendingTitle}>{title}</Text>
      </View>
      <View style={styles.subHeaderLeftContainer}>
        <Text style={styles.seeAllText} onPress={onSeeAllClick}>
          {onSeeAllClick ? 'Refresh' : 'See All'}
        </Text>
      </View>
    </View>
  </View>
);

SectionHeader.defaultProps = {
  containerStyle: {},
  onSeeAllClick: null,
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onSeeAllClick: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

export default SectionHeader;
