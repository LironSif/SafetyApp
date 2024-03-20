import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  password: {
    type: String,
    required: false,
  },
  name: { type: String },
  avatar: { type: String },
  authMethods: [
    {
      provider: String,
      providerId: String,
    },
  ],
  factory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factory',
    required: false, // Adjust based on your application's requirements
  },
});

const User = mongoose.model('User', userSchema);
export default User;
