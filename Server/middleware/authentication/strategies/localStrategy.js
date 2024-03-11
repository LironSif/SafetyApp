// strategies/localStrategy.js
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../../../models/User.js'; // Ensure this path is correctly pointing to your User model

export const localStrategy = new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) => {
    console.log(email,password)
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      // Handle user not found
      console.log(user)
      if (!user) {
        return done(null, false, { message: 'Email not found.' });
      }

      // Handle users signed up via social media (without a password)
      if (!user.password) {
        // This message can be customized to direct users to log in using their social media accounts
        return done(null, false, { message: 'Please sign in using your social media account.' });
      }

      // Check if the provided password matches the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // Successful login
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
