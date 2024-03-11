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
const PORT = process.env.SERVER_PORT || 5000; // Server port, fallback to 3000 if not specified in .env
const NODE_ENV = process.env.NODE_ENV;
const BASE_SERVER_URL = process.env.BASE_SERVER_URL;
const CLIENT_PORT = process.env.CLIENT_PORT;


const allowedOrigins = [
  'http://localhost:5173',
  `${BASE_SERVER_URL}:${CLIENT_PORT}`,
  "https://safetyapp2.netlify.app",
];

app.set("trust proxy", 1);

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Invalid origin"));
    }
  },
  credentials: true, // This is important for cookies, authorization headers with HTTPS
};

// CORS middleware configuration to allow requests from specified front-end domain
app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware with cookie settings, using secret from .env for encryption
app.use(
  session({
    secret: process.env.SESSION_SECERT,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production" ? true : "auto",
      sameSite: process.env.NODE_ENV === "production" ? "none" : true,
    },
  })
);

// Initialize Passport and session middleware for authentication
app.use(passport.initialize());
app.use(passport.session());



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
