import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

const Hello = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello
      </Text>
    </View>
  );
};


export default Hello;
