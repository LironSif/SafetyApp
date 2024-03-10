
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // User is authenticated, proceed to the next middleware or request handler
        return next();
    }
    // User is not authenticated, return a 401 Unauthorized response
    res.status(401).json({ message: 'Unauthorized' });
};

export default ensureAuthenticated;
