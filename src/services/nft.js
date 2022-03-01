import Constants from 'expo-constants';
import { getData } from './storage';

// eslint-disable-next-line import/prefer-default-export
export const getNFT = async (nftID) => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/nft/${nftID}`, {
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
