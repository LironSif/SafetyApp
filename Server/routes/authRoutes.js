import express from 'express';
import { signupUser, loginUser, logoutUser, checkAuthStatus} from '../controllers/userController.js';
import passport from 'passport';
import { clientUrl } from "../utils/url.js";

const router = express.Router();
const FULL_SERVER_URL = clientUrl;

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.put('/logout', logoutUser);
router.get('/login/success', checkAuthStatus);

// Google authentication and callback routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', passport.authenticate('google', { successRedirect: `${process.env.CLIENT_URL}`, failureRedirect: `${process.env.CLIENT_URL}/login` }));
router.get('/google/callback', passport.authenticate('google', { successRedirect: FULL_SERVER_URL, failureRedirect: "/login"}));

// Facebook authentication and callback routes
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// router.get('/facebook/callback', passport.authenticate('facebook',{ successRedirect: `${process.env.CLIENT_URL}`, failureRedirect: `${process.env.CLIENT_URL}/login` }));
router.get('/facebook/callback', passport.authenticate('facebook',{ successRedirect: `${process.env.FULL_SERVER_URL}`, failureRedirect: "/login" }));

export default router;
