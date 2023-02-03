import Constants from 'expo-constants';
import { getData } from './storage';

export const postInvite = async (code) => {
  try {

    const formData = new FormData();
    formData.append('code', code);

    const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/invite`, {
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
    return await response.json();
  } catch (err) {
    return null;
  }
};

