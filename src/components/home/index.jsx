import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import Header from './header';
import FeaturedProfiles from './featured_profiles';
import Timeline from './timeline';

const Home = () => (
  <View style={styles.container}>
    <StatusBar style="light" />
    <LinearGradient
      colors={['#303040', '#141316']}
      start={[0, 0]}
      end={{ x: 0, y: 0.1 }}
      style={styles.background}
    >
      <View style={styles.mainView}>
        <Header />
        <FeaturedProfiles />
        <Timeline />
      </View>
    </LinearGradient>
  </View>
);

export default Home;
