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
