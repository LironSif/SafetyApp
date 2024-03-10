// passportConfig.js
import passport from 'passport';
import dotenv from 'dotenv';
import { localStrategy } from './strategies/localStrategy.js';
import { googleStrategy } from './strategies/googleStrategy.js';
import { facebookStrategy } from './strategies/facebookStrategy.js';
import User from '../../models/User.js'

dotenv.config();

passport.use(localStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
