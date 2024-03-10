import express from 'express';
import { signupUser, loginUser, logoutUser, checkAuthStatus} from '../controllers/userController.js';
import passport from 'passport';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/login/success', checkAuthStatus);

// Google authentication and callback routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', passport.authenticate('google', { successRedirect: `${process.env.CLIENT_URL}`, failureRedirect: `${process.env.CLIENT_URL}/login` }));
router.get('/google/callback', passport.authenticate('google', { successRedirect: `${process.env.CLIENT_DEPLOY_URL}`, failureRedirect: `${process.env.CLIENT_DEPLOY_URL}/login` }));

// Facebook authentication and callback routes
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// router.get('/facebook/callback', passport.authenticate('facebook',{ successRedirect: `${process.env.CLIENT_URL}`, failureRedirect: `${process.env.CLIENT_URL}/login` }));
router.get('/facebook/callback', passport.authenticate('facebook',{ successRedirect: `${process.env.CLIENT_DEPLOY_URL}`, failureRedirect: `${process.env.CLIENT_DEPLOY_URL}/login` }));

export default router;
