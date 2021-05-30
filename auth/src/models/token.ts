import mongoose, { Schema, Document } from 'mongoose';
export interface RefreshToken extends Document {
  refreshToken: string;
  userId: string;
}

const refreshTokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model<RefreshToken>('RefreshToken', refreshTokenSchema);
