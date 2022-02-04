import React from 'react';
import { ScrollView, View } from 'react-native';
import { BottomBar, StatusBar } from '@library';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import Header from './header';
import FeaturedProfiles from './featured_profiles';
import Timeline from './timeline';

const Home = () => (
  <>
    <StatusBar />
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#303040', '#141316']}
        start={[0, 0]}
        end={{ x: 0, y: 0.1 }}
      >
        <View style={styles.mainView}>
          <Header />
          <FeaturedProfiles />
          <Timeline />
        </View>
      </LinearGradient>
    </ScrollView>
    <BottomBar />
  </>
);

export default Home;
