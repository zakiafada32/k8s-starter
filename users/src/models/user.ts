import mongoose, { Schema, Document } from 'mongoose';
import { Roles } from './roles';

export interface User extends Document {
  email: string;
  password: string;
  name: string;
  role: Roles;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(Roles),
    default: Roles.User,
  },
});

export default mongoose.model<User>('User', userSchema);
