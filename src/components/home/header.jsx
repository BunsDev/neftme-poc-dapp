import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChallengeIcon from '@assets/icons/challenge_header_icon.svg';
import DMIcon from '@assets/icons/direct_message.svg';
import BalanceCoinIcon from '@assets/icons/balance_coin.svg';
import styles from './styles';

const logo = require('@assets/logo_home.webp');

const Header = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.subHeaderRight}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.subHeaderLeftContainer}>
          <View style={styles.subHeaderLeft}>

            <TouchableOpacity
              onPress={() => navigation.navigate('StartChallenge')}
            >
              <View>
                <ChallengeIcon width={35} height={30} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <BalanceCoinIcon width={30} height={30} />
            </TouchableOpacity>

            <TouchableOpacity>
              <DMIcon width={30} height={30} />
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
