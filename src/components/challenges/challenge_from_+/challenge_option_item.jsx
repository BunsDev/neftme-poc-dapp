import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginRight: 32,
  },
  item: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
    letterSpacing: 1.5,
  },
  alignCenter: {
    alignSelf: 'center',
    marginHorizontal: 6,
  },
  selected: {
    backgroundColor: '#F6C138',
    height: 2,
    width: '100%',
  },
});

const ChallengeOptionItem = ({
  index,
  item,
  selectedChallengeTypeId,
  setSelectedChallengeTypeId,
}) => (
  <View key={`icon_profile_${index}`} style={styles.container}>
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedChallengeTypeId(item)}
    >
      <item.Icon
        width={item.width}
        height={item.height}
        style={styles.alignCenter}
      />
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
    {item.id === selectedChallengeTypeId && <View style={styles.selected} />}
  </View>
);

export default ChallengeOptionItem;
