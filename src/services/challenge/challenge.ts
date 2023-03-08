import Constants from 'expo-constants';
import { getData } from '../storage';
import Challenge from '../../model/challenge_model';

export default async (challenge: Challenge) => {
  try {

    const formData = new FormData();
    formData.append('user_challenged', challenge.getUserChallenged());
    formData.append('challenge_resource', challenge.getChallengeResource());
    formData.append('challenge_resource_type', challenge.getChallengeResourceType());
    formData.append('extra_description', challenge.getDescription());
    formData.append('value', `${challenge.getValue()}`);
    formData.append('hidden', `${challenge.getHidden()}`);

    const response = await fetch(`${Constants?.expoConfig?.extra?.apiUrl}/challenge`, {
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

export const deleteChallenge = async (id: any) => {
  const response = await fetch(`${Constants?.expoConfig?.extra?.apiUrl}/nft/${id}`, {
    method: 'DELETE',
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

export const getChallengesSentByUser = async (user_id: string)=> {
  const response = await fetch(`${Constants?.expoConfig?.extra?.apiUrl}/challenge/sent/${user_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${await getData('auth_token')}`,
    },
  });

  if (response?.status !== 200) return null;

  return response.json();
};

export const getChallengesReceivedByUser = async (user_id: string) => {
  const response = await fetch(`${Constants?.expoConfig?.extra?.apiUrl}/challenge/received/${user_id}`, {
    method: 'GET',
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
