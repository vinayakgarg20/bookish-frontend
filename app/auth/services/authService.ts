import { ServiceType } from "@/app/constants/baseUrls";
import { postApi } from "@/app/services/apiService";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await postApi('/login', { username, password },ServiceType.AUTH);

    if (response.data) {
      return {
        success: true,
        token: response.data.token,
        username: response.data.username,
      };
    } else {
      return {
        success: false,
        error: response.error,
      };
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return {
      success: false,
      error: 'An error occurred while logging in.',
    };
  }
};

export const registerUser = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await postApi('/auth/register', {
      email,
      username,
      password,
    });

    if (response.data) {
      return {
        success: true,
        token: response.data.token,
        username: response.data.username,
      };
    } else {
      return {
        success: false,
        error: response.error,
      };
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      success: false,
      error: 'An error occurred while registering user.',
    };
  }
};