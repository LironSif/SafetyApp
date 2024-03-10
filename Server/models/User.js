import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique: true, 
    required: true, 
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'], // Simple regex for email validation
  },
  password: { 
    type: String, 
    required: false,
  },
  name: { type: String },
  avatar: { type: String }, // Add this line to include an avatar URL
  authMethods: [
    {
      provider: String,
      providerId: String,
    },
  ],
});

const User = mongoose.model('User', userSchema);
export default User;
