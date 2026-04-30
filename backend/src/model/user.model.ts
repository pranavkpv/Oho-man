import mongoose from 'mongoose';
import { ROLE } from '../constant/enum';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  phonenumber: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    enum: Object.values(ROLE),
    default: ROLE.USER
  },
  activeRole: {
    type: String,
    enum: [ROLE.USER, ROLE.PROVIDER],
    default: ROLE.USER
  },
  serviceIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  active: {
    type: Boolean,
    default: false
  },
  image: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  }
});

export default mongoose.model(
  'User',
  userSchema
);