// Import necessary libraries and modules
import express from "express";
import session from 'express-session';
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import MongoStore from 'connect-mongo'; // Added for MongoDB session storage

// Import custom middleware and routes
import "./middleware/authentication/passportConfig.js"; 
import authRoutes from './routes/authRoutes.js';
import factoryRoutes from './routes/factoryRoutes.js'; 
import departmentRoutes from './routes/departmentRoutes.js'; 
import employeeRoutes from './routes/employeeRoutes.js'; 
import fileRoutes from './routes/fileRoutes.js'; 
import ensureAuthenticated from './middleware/authentication/ensureAuthenticated.js';

// Load environment variables from .env file for secure configuration
dotenv.config();

// Create the Express application
const app = express();
const PORT = process.env.SERVER_PORT || 5000;
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
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Configure session middleware to use MongoDB for storage
app.use(session({
  secret: process.env.SESSION_SECERT,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // adjusted for consistency with most configurations
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes configuration
app.use("/auth", authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/factories', ensureAuthenticated, factoryRoutes);
app.use('/api/departments', ensureAuthenticated, departmentRoutes);
app.use('/api/employees', ensureAuthenticated, employeeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Export the app for testing or further configuration
export default app;
