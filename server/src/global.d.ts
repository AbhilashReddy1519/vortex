interface GitHubUserData   {
  id: number; // Unique GitHub user ID
  login: string; // Username
  name?: string; // Display name
  avatar_url: string; // Profile picture
  email?: string; // Email (may be null if private)
  html_url: string; // Link to GitHub profile
  bio?: string; // User bio
  company?: string; // Company info
  location?: string; // Location
}

interface GithubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

interface GithubUserEmail {
  email: string,
  verified: boolean,
  primary: boolean,
  visibility: string,
}

interface cookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax';
  maxAge?: number;
  signed?: boolean;
}

interface ResponseType {
  status?: string;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  code?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}