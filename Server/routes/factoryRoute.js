import { Router } from "express";
import ensureAuthenticated from '../middleware/authentication/ensureAuthenticated.js';

const router = Router();

router.get('/profile', ensureAuthenticated, (req, res) => {
    // Return profile information for the authenticated user
    res.json({ user: req.user });
});

export default router;