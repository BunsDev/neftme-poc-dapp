import { saveData } from './storage';

const API_URL = 'http://fa3e-188-251-254-142.ngrok.io';
const LOGIN_ENDPOINT = `${API_URL}/session`;

// eslint-disable-next-line import/prefer-default-export
export const doLogin = async (email, password) => {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response?.status !== 201) {
      return {
        success: false,
      };
    }
    const body = await response.json();
    return {
      success: await saveData('auth_token', body.token),
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};
