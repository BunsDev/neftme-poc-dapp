import Constants from 'expo-constants';
import { getData } from './storage';

export const reportAbuseContent = async (nftId) => {
  try {
    const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/nft/${nftId}/abuse_content`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 201) return false;

    return true;
  } catch (err) {
    return false;
  }
};
