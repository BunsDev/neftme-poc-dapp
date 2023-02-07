import Constants from 'expo-constants';
import { getData } from './storage';

const postInvite = async (inviteCode) => {
  try {

    const formData = new FormData();

    formData.append('invite_code', inviteCode);

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

export const updateInvite = async (inviteId, userId) => {
  try {

    const formData = new FormData();

    formData.append('invite_id', inviteId);
    formData.append('user_id', userId);

    const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/invite`, {
      method: 'PATCH',
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

export default postInvite;
