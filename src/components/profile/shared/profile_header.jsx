import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pressable, StyleSheet, View, Modal, Text, TouchableOpacity, Alert,
} from 'react-native';
import BackIcon from '@assets/icons/back.svg';
import { CoverImage } from '@library';
import { useNavigation } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { removeData } from '../../../services/storage';

const styles = StyleSheet.create({
  coverImageWrapper: {
    width: '100%',
    height: 235,
  },
  coverImage: {
    width: '100%',
    height: 235,
  },
  coverImageGradient: {
    height: '100%',
  },
  backIcon: {
    position: 'absolute',
    left: 16,
    top: 60,
  },
  settingsBar: {
    position: 'absolute',
    left: 326,
    top: 60,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  modalView: {
    position: 'absolute',
    width: 198,
    height: 180,
    left: 55,
    top: -5,
    marginTop: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 100,
    backgroundColor: '#2C2C39',
    justifyContent: 'center',
  },
  touchableOpacityStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  individualSettingView: {
    flexDirection: 'row',
    padding: 10,
  },
  settingsFont: {
    paddingLeft: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    fontSize: 16,
  },
});

const ProfileHeader = ({
  coverImage, profileColor, goBack, isCurrentUser,
}) => {
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
  const navigation = useNavigation();
  const connector = useWalletConnect();

  const disconnectAccountAndNavigate = () => {
    try {
      // TODO call remove session from DB request
      removeData('auth_token');
      setSettingsModalVisible(false);
      navigation.navigate({
        name: 'Start',
        params: { screen: 'ChooseLogin' },
      });
    } catch (err) {
      // console.log('something went wrong while logging out');
    }
  };

  const disconnectWalletAndNavigate = () => {
    try {
      connector.killSession();
      setSettingsModalVisible(false);
      navigation.navigate({
        name: 'Start',
        params: { screen: 'Wallet' },
      });
    } catch (err) {
      // console.log('something went wrong while disconnecting wallet');
    }
  };

  return (
    <View>
      <CoverImage
        coverImage={coverImage}
        coverImageWrapperStyle={styles.coverImageWrapper}
        coverImageStyle={styles.coverImage}
        coverGradientStyle={styles.coverImageGradient}
        profileColor={profileColor}
        bottomCoverColor="#141316"
      />
      { isCurrentUser && (
        <Modal
          animationType="fade"
          transparent
          visible={isSettingsModalVisible}
          onRequestClose={() => setSettingsModalVisible((prevValue) => !prevValue)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.touchableOpacityStyle}
            onPressOut={() => { setSettingsModalVisible(false); }}
          >
            <View style={styles.modalView}>

              <View style={styles.individualSettingView}>
                <BackIcon width={16} height={16} />
                <Pressable
                  onPress={() => disconnectWalletAndNavigate()}
                >
                  <Text style={styles.settingsFont}>Disconnect Wallet</Text>
                </Pressable>
              </View>

              <View style={styles.individualSettingView}>
                <BackIcon width={16} height={16} />
                <Pressable
                  onPress={() => Alert.alert('Available soon!')}
                >
                  <Text style={styles.settingsFont}>Settings</Text>
                </Pressable>
              </View>

              <View style={styles.individualSettingView}>
                <BackIcon width={16} height={16} />
                <Pressable
                  onPress={() => Alert.alert('Available soon!')}
                >
                  <Text style={styles.settingsFont}>Switch Account</Text>
                </Pressable>
              </View>

              <View style={styles.individualSettingView}>
                <BackIcon width={16} height={16} />
                <Pressable
                  onPress={() => disconnectAccountAndNavigate()}
                >
                  <Text style={styles.settingsFont}>Logout</Text>
                </Pressable>
              </View>

            </View>
          </TouchableOpacity>
        </Modal>
      )}
      <Pressable style={styles.backIcon} onPress={goBack}>
        <BackIcon width={30} height={30} />
      </Pressable>
      { isCurrentUser && (
      <Pressable
        style={styles.settingsBar}
        onPress={
        () => setSettingsModalVisible((prevValue) => !prevValue)
        }
      >
        <BackIcon width={30} height={30} />
      </Pressable>
      )}
    </View>
  );
};

ProfileHeader.defaultProps = {
  coverImage: '',
};

ProfileHeader.propTypes = {
  coverImage: PropTypes.string,
  profileColor: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
};

export default ProfileHeader;
