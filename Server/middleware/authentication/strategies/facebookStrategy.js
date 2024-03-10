// strategies/facebookStrategy.js
import { Strategy as FacebookStrategy } from 'passport-facebook';
import handleUser from '../handleUser.js';

export const facebookStrategy = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails', 'name', 'photos'],
  },
  (accessToken, refreshToken, profile, done) => {
    const avatarUrl = profile.photos ? profile.photos[0].value : null; // Get the avatar URL
    handleUser(profile, 'facebook', avatarUrl, done);
  }
);
