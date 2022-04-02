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

export const postNft = async (nft) => {
  const filename = nft.image.split('/').pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image';

  const formData = new FormData();
  formData.append('title', nft.title);
  formData.append('description', nft.description);
  formData.append('price', nft.price);
  formData.append('communityPercentage', nft.communityPercentage);
  formData.append('image', { uri: nft.image, name: filename, type });

  const response = await fetch(`${Constants.manifest.extra.apiUrl}/nft`, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${await getData('auth_token')}`,
    },
  });

  if (response?.status !== 200) return null;

  return response.json();
};

export const bindTokenId = async (id, tokenId) => {
  const response = await fetch(`${Constants.manifest.extra.apiUrl}/nft/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ tokenId }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${await getData('auth_token')}`,
    },
  });

  if (response?.status !== 200) return false;

  return true;
};
