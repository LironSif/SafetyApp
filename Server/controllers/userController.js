import bcrypt from 'bcryptjs';
import passport from 'passport';
import User from '../models/User.js';
import fetch from 'node-fetch'; // Ensure you have 'node-fetch' installed

// Helper function to verify reCAPTCHA token
async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Your reCAPTCHA secret key
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
    });
    const data = await response.json();
    return data.success; // true if verification is successful
  } catch (error) {
    console.error("Error verifying reCAPTCHA", error);
    return false;
  }
}

export const signupUser = async (req, res) => {

  const { email, password, name, recaptchaToken } = req.body;

  // First, verify the reCAPTCHA token
  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return res.status(400).json({ message: 'Failed reCAPTCHA verification. Are you a robot?' });
  }

  // Proceed with the original signup logic if reCAPTCHA verification is successful
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
    });
    await user.save();

    req.logIn(user, (err) => {

      if (err) return res.status(500).json({ message: 'Error logging in user.' });
      res.status(201).json({ message: 'Signup and login successful.', user: user.toObject({ getters: true, virtuals: false }) });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user.', error: error.toString() });
  }
};

export const loginUser = (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {

    if (err) return next(err);

    if (!user) return res.status(401).send({ message: info.message });

    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
};


export const logoutUser = (req, res) => {
  req.session.destroy((err) => { // Destroys session data on the server
    if (err) {
      return res.status(500).json({ message: 'Error logging out.' });
    }
    res.clearCookie('connect.sid'); // Clears the session cookie from the client
    // 'connect.sid' is the default session cookie name used by Express session.
    // If you've configured a different name, use that instead.
    res.redirect(`${process.env.CLIENT_URL}`); // Optionally redirect to the home page or login page
  });
};


export const checkAuthStatus = (req, res) => {

  if (req.isAuthenticated()) {
    // User is authenticated, return user info
    res.status(200).json({
      success: true,
      message: "User is authenticated",
      user: req.user, // Assuming you've stored user info in req.user
      // You might want to exclude sensitive info like password
    });
  } else {
    // User is not authenticated
    res.status(403).json({
      success: false,
      message: "User is not authenticated",
    });
  }
};