import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import categories from './categories';
import CategoryItem from './category_item';
import NftItem from './nft_item';

const styles = StyleSheet.create({
  menuContainer: {
    marginTop: 24,
    marginLeft: 16,
    flexDirection: 'row',
  },
  horizontalBar: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 16,
    flex: 1,
  },
  listContainer: {
    marginTop: 42,
    marginBottom: 26,
    marginHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

const NftsList = ({ nfts }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  return (
    <>
      <View style={styles.menuContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({ item, index }) => (
            <CategoryItem
              key={`icon_profile_${index}`}
              item={item}
              index={index}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        />
      </View>
      <View style={styles.horizontalBar} />
      <View style={styles.listContainer}>
        {nfts[selectedCategory]?.map((nft) => <NftItem nft={nft} key={`nft_${selectedCategory}_item_${nft.image}`} />)}
      </View>
    </>
  );
};

NftsList.propTypes = {
  nfts: PropTypes.shape({
    created: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default NftsList;
