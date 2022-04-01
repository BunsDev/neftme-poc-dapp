import React, { useEffect, useState } from 'react';
import {
  Alert, Platform, ScrollView, View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getCategories } from '@services/categories';
import { updateProfileData } from '@services/user';
import {
  FavoriteCategories, InputField, ProfileImage, StatusBar,
} from '@library';
import CoverImage from './cover_image';
import ImageSection from './image_section';
import Header from './header';
import SocialMediaLinksField from './social_media_links_field';
import styles from './styles';

const EditProfile = () => {
  const route = useRoute();
  const [profileFields, setProfileFields] = useState({
    ...route.params.profileData,
    socialMediaLinks: route?.params?.profileData?.socialMediaLinks || [],
  });
  const [allCategories, setAllCategories] = useState([]);
  useEffect(async () => {
    setAllCategories(await getCategories());
  }, []);

  const onSocialMediaLinksChange = (text, index) => {
    const newArray = Array.from(profileFields.socialMediaLinks);
    if (index === undefined) {
      newArray.push('');
    } else {
      newArray[index] = text;
    }
    setProfileFields({
      ...profileFields,
      socialMediaLinks: newArray,
    });
  };
  const removeSocialIndex = (index) => {
    const newArray = Array.from(profileFields.socialMediaLinks);
    newArray.splice(index, 1);
    setProfileFields({
      ...profileFields,
      socialMediaLinks: newArray,
    });
  };
  const setFieldValue = (field, value) => {
    setProfileFields((prevProfileFields) => ({
      ...prevProfileFields,
      [field]: value,
    }));
  };
  const onSavePress = async () => {
    const response = await updateProfileData({
      name: profileFields.name,
      username: profileFields.username,
      email: profileFields.email,
      bio: profileFields.bio,
      socialMediaLinks: profileFields.socialMediaLinks,
      favoriteCategories: profileFields.favoriteCategories,
    });

    Alert.alert('Profile', response ? 'Profile was successfully saved' : 'Something went wrong, please try again');
  };

  const onCategorySelect = (id) => {
    setProfileFields((prevState) => {
      const favoriteCategories = Array.from(prevState.favoriteCategories);
      const idIndex = profileFields.favoriteCategories.indexOf(id);
      if (idIndex > -1) favoriteCategories.splice(idIndex, 1);
      else favoriteCategories.push(id);

      return {
        ...profileFields,
        favoriteCategories,
      };
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header onSavePress={onSavePress} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.horizontalRow} />
        <View style={styles.padHor16}>
          <ImageSection title="Profile Image (NFT)">
            <ProfileImage
              profileImage={profileFields.profileImage}
              containerStyle={{
                ...styles.profileImageContainer,
                backgroundColor: profileFields.profileColor,
              }}
              imageStyle={styles.profileImage}
              avatarWidth={62}
              avatarHeight={62}
            />
          </ImageSection>
          <ImageSection title="Cover Image (NFT)">
            <CoverImage coverImage={profileFields.coverImage} />
          </ImageSection>
          <InputField
            labelName="Name"
            value={profileFields.name}
            onFieldChange={(value) => setFieldValue('name', value)}
            inputPlaceholder="Enter your name"
            containerStyle={styles.marginTop16}
          />
          <InputField
            labelName="Username"
            value={profileFields.username}
            onFieldChange={(value) => setFieldValue('username', value)}
            inputPlaceholder="Enter your username"
            containerStyle={styles.marginTop16}
          />
          <InputField
            labelName="Email"
            value={profileFields.email}
            onFieldChange={(value) => setFieldValue('email', value)}
            inputPlaceholder="Enter your email"
            containerStyle={styles.marginTop16}
          />
          <InputField
            labelName="Bio"
            value={profileFields.bio}
            onFieldChange={(value) => setFieldValue('bio', value)}
            inputPlaceholder="Enter your bio"
            multiline
            numberOfLines={Platform.OS === 'ios' ? null : 6}
            minHeight={Platform.OS === 'ios' ? 120 : null}
            inputStyle={{ paddingTop: 16 }}
            containerStyle={styles.marginTop16}
          />
          <SocialMediaLinksField
            socialMediaLinks={profileFields.socialMediaLinks}
            onSocialMediaLinksChange={onSocialMediaLinksChange}
            removeSocialIndex={removeSocialIndex}
          />
          <FavoriteCategories
            allCategories={allCategories}
            userCategories={profileFields.favoriteCategories}
            onCategorySelect={onCategorySelect}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
