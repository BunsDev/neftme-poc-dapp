import Constants from 'expo-constants';
import { getData } from './storage';

export const isNewUser = async () => {
  try {
    return (await getData('newUser')) === 'true';
  } catch (err) {
    return true;
  }
};

export const getUserByWallet = async (wallet_address) => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/user?wallet_address=${wallet_address}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 200) {
      return {};
    }

    return await response.json();
  } catch (err) {
    return {};
  }
};

export const getProfileData = async () => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 200) {
      return {
        error: true,
        status: response?.status,
      };
    }

    return await response.json();
  } catch (err) {
    return {};
  }
};

export const getFeaturedProfiles = async () => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/featured_profiles`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 200) {
      return [];
    }

    return (await response.json())?.profiles;
  } catch (err) {
    return [];
  }
};

export const saveProfilePhoto = async (
  title,
  description,
  image,
  getContractMethods,
  mintNFT,
  connector,
) => {
  try {
    const nft = {
      title,
      description,
      price: 0,
      communityPercentage: 0,
      image,
    };

    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeErc721Address,
    );
    const mintedNFT = await mintNFT(contractMethods, nft, connector.accounts[0]);
    return mintedNFT?.success ? mintedNFT.url : false;
  } catch (err) {
    return false;
  }
};

export const followUser = async (userId) => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/user/${userId}/follow`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 204) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/user/${userId}/unfollow`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 204) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};
