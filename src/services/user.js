import Constants from 'expo-constants';
import { getData } from './storage';

export const getProfileData = async () => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${await getData('auth_token')}`,
      },
    });

    if (response?.status !== 200) {
      return '';
    }

    return await response.json();
  } catch (err) {
    return '';
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

export const getTimelineContent = async () => {
  try {
    const response = await fetch(`${Constants.manifest.extra.apiUrl}/timeline`, {
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

    return (await response.json())?.timeline;
  } catch (err) {
    return [];
  }
};
