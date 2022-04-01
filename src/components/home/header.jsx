import React, { useEffect, useState } from "react";
import { Modal, Text, Image, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileImage } from "@library";
import { getProfileData } from "@services/user";
import BellIcon from "@assets/icons/bell.svg";
import styles from "./styles";

const logo = require("@assets/logo_home.webp");

const Header = () => {
  const [profileData, setProfileData] = useState(null);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(async () => {
    setProfileData(await getProfileData());
  }, []);

  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View
              style={{
                width: "80%",
                height: "80%",
                backgroundColor: "#2B2F3A",
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "#555555"
              }}
            >
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{ fontSize: "30px", color: "white" }}>X</Text>
              </Pressable>

              <View style={[styles.container, { flexDirection: "row" }]}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={{
                      uri:
                        "https://www.playtoearn.online/wp-content/uploads/2021/10/Bored-Ape-Yacht-Club-NFT-avatar.png"
                    }}
                    style={{
                      width: 68,
                      height: 68,
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 15,
                      borderTopRightRadius: 15,
                      borderTopLeftRadius: 15,
                      overflow: "hidden"
                    }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      fontSize: "14%",
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    NEFTs received
                  </Text>
                  <Text
                    style={{ fontSize: "11%", color: "white", paddingTop: 5 }}
                  >
                    Tokens on your wallet{" "}
                  </Text>
                  <Text
                    style={{ fontSize: "8%", color: "white", paddingTop: 5 }}
                  >
                    3 hours ago{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.header}>
        <View style={styles.subHeaderRight}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.subHeaderLeftContainer}>
          <View style={styles.subHeaderLeft}>
            <Pressable onPress={() => setModalVisible(true)}>
              <View>
                <BellIcon style={styles.bellIcon} width={25} height={22} />
                <View style={styles.notificationBadge} />
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("MyProfile")}>
              {profileData ? (
                <ProfileImage
                  profileImage={profileData?.profileImage}
                  containerStyle={{
                    ...styles.profileImageContainer,
                    backgroundColor: profileData?.profileColor
                  }}
                  imageStyle={styles.profilePhoto}
                  avatarWidth={30}
                  avatarHeight={30}
                />
              ) : (
                <View style={styles.profilePhotoPlaceholder} />
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
