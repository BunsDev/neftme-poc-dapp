/* eslint-disable react/prop-types */
import React from 'react';
import { NFTPopTypes } from '@utils/proptypes';
import {
  Pressable, Text, View,
} from 'react-native';
// import SaveFavoriteIcon from '@assets/icons/save_favorite.svg';
import { useNavigation } from '@react-navigation/native';
import { ProfileImage } from '@library';
import { pluralizeFollowers } from '@utils/words';
import styles from './styles';

const NftHeader = ({ nft }) => {
  const navigation = useNavigation();
  const navigateToProfile = () => navigation.navigate('CreatorProfile', { username: nft.username });

  return (
    <View style={styles.nftHeader}>
      <Pressable
        onPress={navigateToProfile}
      >
        <ProfileImage
          profileImage={nft.profilePhoto}
          containerStyle={{
            ...styles.profileImageContainer,
            backgroundColor: nft.profileColor,
          }}
          imageStyle={styles.nftProfilePhoto}
          avatarWidth={30}
          avatarHeight={30}
        />
      </Pressable>
      <View style={styles.nftHeaderTitle}>
        <Text style={styles.nftHeaderName}>{nft.name}</Text>
        <Text style={styles.nftHeaderFollowers}>{`${nft.followers} ${pluralizeFollowers(nft.followers)}`}</Text>
      </View>
    </View>

  );
};

NftHeader.propTypes = {
  // eslint-disable-next-line react/require-default-props
  nft: NFTPopTypes,
};

export default NftHeader;
