import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable, StyleSheet, Text, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginRight: 30,
  },
  item: {
    flexDirection: 'row',
    height: 40,
  },
  itemName: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.71,
    marginLeft: 8,
  },
  selected: {
    backgroundColor: '#B389FC',
    opacity: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: 5,
    width: '100%',
  },
});

const CategoryItem = ({
  index, item, selectedCategory, setSelectedCategory,
}) => (
  <View key={`icon_profile_${index}`} style={styles.container}>
    <Pressable style={styles.item} onPress={() => setSelectedCategory(item.id)}>
      <item.Icon width={item.width} height={item.height} />
      <Text style={styles.itemName}>{item.name}</Text>
    </Pressable>
    {item.id === selectedCategory && <View style={styles.selected} />}
  </View>
);

CategoryItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default CategoryItem;
