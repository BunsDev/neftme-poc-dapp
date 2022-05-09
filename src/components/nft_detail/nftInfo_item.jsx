import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProfileImage } from "@library";
import { StyleSheet, Text, View, Alert, Pressable } from "react-native";
import { getUserByWallet } from "../../services/user";
import * as Clipboard from "expo-clipboard";
import CopyIcon from "@assets/icons/copy.svg";

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#2B2F3A",
    flexDirection: "row",
    marginBottom: 8,
    borderRadius: 16,
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 20,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    color: "#FCFCFC",
    fontWeight: "600",
  },
  description: {
    color: "#F6C138",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 14,
    letterSpacing: 0.75,
    paddingTop: 10,
  },
  textBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    flexGrow: 0,
  },
  address: {
    color: "#FCFCFC",
    fontWeight: "400",
    opacity: 70,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.75,
    paddingTop: 10,
  },
  descriptionAddress: {
    flexDirection: "row",
  },
});

const NftInfoItem = ({ nftInfo, isCreator}) => {
  const [user, setUser] = useState({});
  const [addr, setAddr] = useState("0");
  const [text, setText] = useState("");

  const creatorText = "NFT Creator";
  const ownerText = "NFT Owner";

  const loadOwnerCreator = async () => {
    if (nftInfo != undefined) {
      console.log(nftInfo);
      if (isCreator) {
        setUser(await getUserByWallet(nftInfo.creator));
        setText(creatorText);
        setAddr(nftInfo.creator)
      } else {
        setUser(await getUserByWallet(nftInfo.owner));
        setText(ownerText);
        setAddr(nftInfo.owner)
      }
    }
  };

  const copyWalletAddress = () => {
    Clipboard.setString(user.walletAddress);
    Alert.alert("Wallet address copied successfully");
  };

  useEffect(async () => {
    await loadOwnerCreator();
  }, []);

  return (
    <View style={styles.itemContainer}>
      <ProfileImage
        profileImage={user.profileImage}
        imageStyle={styles.image}
        avatarWidth={30}
        avatarHeight={30}
      />
      <View style={styles.textBox}>
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.descriptionAddress}>
          <Text style={styles.description}>{text}</Text>
          <>
            <Pressable onPress={copyWalletAddress}>
              <Text style={styles.address}>
                {" "}
                • {`${addr?.slice(0, 5)}...${addr?.slice(-5)}`}
                <CopyIcon width={12.67} height={14.67} />
              </Text>
            </Pressable>
          </>
        </View>
      </View>
    </View>
  );
};
/*
NftItem.propTypes = {z
  info: PropTypes.shape([]).isRequired,
};*/

export default NftInfoItem;
