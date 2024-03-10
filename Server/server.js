// Import necessary libraries and modules
import express from "express";
import session from 'express-session';
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// Import custom middleware and routes
import "./middleware/authentication/passportConfig.js"; // Passport configuration for authentication strategies
import autaRoute from './routes/authRoutes.js'; // Authentication routes (login, logout, etc.)
import secureRoute from './routes/factoryRoute.js'; // Test routes to demonstrate secured access
import ensureAuthenticated from './middleware/authentication/ensureAuthenticated.js';

// Load environment variables from .env file for secure configuration
dotenv.config();

// Create the Express application
const app = express();
const PORT = process.env.PORT || 3000; // Server port, fallback to 3000 if not specified in .env

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware with cookie settings, using secret from .env for encryption
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // Do not force session save if unmodified
  saveUninitialized: true, // Save uninitialized sessions to store
  cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } // Cookie configuration
}));

// Initialize Passport and session middleware for authentication
app.use(passport.initialize());
app.use(passport.session());
app.set("trust proxy", 1);
// CORS middleware configuration to allow requests from specified front-end domain
app.use(cors({
    // origin: "http://localhost:5173", // Adjust this to match your front-end URL for development
    origin: "https://safetyapp2.netlify.app", // Adjust this to match your front-end URL for development
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Public routes
// Authentication routes (login with Google, GitHub, Facebook, etc.)
app.use("/auth", autaRoute);

// Secured routes
// Using ensureAuthenticated middleware to protect routes under "/test"
// Only authenticated users can access these routes
app.use("/private", ensureAuthenticated, secureRoute);

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    // Start the server only after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT: ${PORT}`);
    });
}).catch((err) => console.error("MongoDB connection error:", err));

// Global error handling middleware
// Catches any errors that occur during request processing
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  res.status(500).send("Something broke!"); // Send generic error response
});

// Export the app for testing or further configuration
export default app;
