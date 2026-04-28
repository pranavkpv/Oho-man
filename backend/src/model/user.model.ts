import mongoose from 'mongoose';
import { ROLE } from '../constant/enum';

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true
  },
  email: { type: String, unique: true },
  phonenumber: String,
  password: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    enum: Object.values(ROLE),
    default: ROLE.USER
  },
  serviceIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }]
});

export default mongoose.model(
  'User',
  userSchema
);