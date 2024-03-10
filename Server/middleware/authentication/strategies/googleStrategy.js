import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import handleUser from '../handleUser.js'; // Ensure the path is correct based on your project structure
import dotenv from 'dotenv'; // Correct the import statement for dotenv
import { serverApiUrl } from "../../../utils/url.js";

dotenv.config(); // This ensures environment variables from your .env file are properly loaded
const fullServerUrl = serverApiUrl;

export const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${fullServerUrl}/auth/google/callback`,
    scope: ['profile', 'email'],
  },
(accessToken, refreshToken, profile, done) => {
  const avatarUrl = profile.photos[0].value; 
  handleUser(profile, 'google', avatarUrl, done);
}

);
