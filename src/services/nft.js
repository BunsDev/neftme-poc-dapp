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

export const postNft = async (route) => {
    
  const filename = route.params.nft.image.split('/').pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image';

  const formData = new FormData();
  formData.append('title', route.params.nft.title);
  formData.append('description', route.params.nft.description);
  formData.append('price', price);
  formData.append('communityPercentage', communityPercentage);
  formData.append('image', { uri: route.params.nft.image, name: filename, type });

  const res = await fetch( Constants.manifest.extra.apiUrl + '/nft', {
    method: 'POST',
    body: formData,
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return await res.json();
};

export const bindTokenId = async (tokenId) => {

  const res = await fetch( Constants.manifest.extra.apiUrl + '/nft/' + tokenId, {
    method: 'PATCH',
    body: formData,
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};
