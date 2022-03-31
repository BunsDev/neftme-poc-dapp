import React from 'react';
import {
  Pressable, StyleSheet, Text, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#21212b',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  centerHorVert: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    fontSize: 16,
    fontWeight: '500',
    margin: 16,
    color: '#fff',
  },
  navDots: {
    flex: 1,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderRadius: 50,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  marginX8: {
    marginHorizontal: 8,
  },
  saveButton: {
    color: '#F6C138',
  },
});

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable style={styles.centerHorVert} onPress={navigation.goBack}>
        <Text style={styles.button}>Back</Text>
      </Pressable>
      <View style={styles.navDots}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={[styles.dot, styles.marginX8]} />
        <View style={styles.dot} />
      </View>
      <Pressable style={styles.centerHorVert}>
        <Text style={[styles.button, styles.saveButton]}>Next</Text>
      </Pressable>
    </View>
  );
};

Header.propTypes = {

};

export default Header;
