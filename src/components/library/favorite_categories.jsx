import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable, StyleSheet, Text, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 22,
  },
  header: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },
  listContainer: {
    backgroundColor: 'rgba(65, 65, 74, 0.5)',
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 26,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    backgroundColor: '#2C2C39',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 48,
  },
  selectedContainer: {
    backgroundColor: '#F6C138',
  },
  text: {
    fontWeight: '400',
    letterSpacing: 1,
  },
  unselected: {
    color: '#fff',
  },
  selected: {
    color: '#2C2C39',
  },
});

const FavoriteCategories = ({ allCategories, userCategories, onCategorySelect }) => (
  <View style={styles.container}>
    <Text style={styles.header}>Favorite Categories</Text>
    <View style={styles.listContainer}>
      {allCategories.map(({ id, category }) => (
        <Pressable
          style={[styles.category, userCategories.includes(id) ? styles.selectedContainer : {}]}
          key={category}
          onPress={() => onCategorySelect(id)}
        >
          <Text
            style={[styles.text, userCategories.includes(id) ? styles.selected : styles.unselected]}
          >
            {category}
          </Text>
        </Pressable>
      ))}
    </View>
  </View>
);

FavoriteCategories.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
  userCategories: PropTypes.arrayOf(PropTypes.number).isRequired,
  onCategorySelect: PropTypes.func.isRequired,
};

export default FavoriteCategories;
