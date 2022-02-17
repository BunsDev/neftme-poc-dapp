import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 40,
    backgroundColor: 'rgba(254, 253, 255, 0.14)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexWrap: 'wrap',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  card: {
    paddingHorizontal: 29.5,
    paddingVertical: 15.5,
    alignItems: 'center',
    borderRightColor: '#101012',
    borderRightWidth: 0.2,
    borderBottomColor: '#101012',
    borderBottomWidth: 0.2,
    width: '33.333%',
  },
  statText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#FCFCFC',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    textAlign: 'center',
  },
});

const Stats = ({ stats }) => (
  <View style={styles.container}>
    {stats.map(({ label, value }) => (
      <View style={styles.card} key={label}>
        <Text style={styles.statText}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    ))}
  </View>
);

Stats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default Stats;
