import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '#config/env.js';
import axios from 'axios';

interface GithubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export const githubService = {
  getToken: async (code: string): Promise<GithubTokenResponse> => {
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
      throw new Error(
        'GitHub OAuth failed: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is not defined in environment variables.'
      );
    }

    try {
      const res = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        },
        {
          headers: { Accept: 'application/json' },
        }
      );

      return res.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('GitHub OAuth error:', err.response?.data || err.message);
      throw new Error(
        'GitHub OAuth failed: Unable to exchange code for access token.'
      );
    }
  },

  getUserData: async (token: string): Promise<GitHubUserData> => {
    try {
      const res = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        'GitHub user token error: ',
        error.response?.data || error.message
      );
      throw new Error('GitHub user token failed: Unable to get user data');
    }
  },
};
