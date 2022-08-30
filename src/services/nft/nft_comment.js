import Constants from 'expo-constants';
import { getData } from '../storage';

// eslint-disable-next-line import/prefer-default-export
export const addComment = async (nftTokenId, comment) => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/nft/${nftTokenId}/comment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
      body: JSON.stringify({ comment }),
    });

    if (response?.status !== 200) {
      return false;
    }

    const body = await response.json();
    return body.success === true;
  } catch (err) {
    return false;
  }
};
