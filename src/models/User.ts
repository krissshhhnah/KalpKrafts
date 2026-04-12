import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  passwordHash?: string;
  oAuthId?: string;
  oAuthProvider?: 'google' | 'github';
  subscriptionTier: 'FREE' | 'PRO' | 'ENTERPRISE';
  aiQueriesRemaining: number;
  credits: number;
  lastQueryReset: Date;
  joinedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  passwordHash: { type: String }, // Only set for email/password accounts
  oAuthId: { type: String },
  oAuthProvider: { type: String, enum: ['google', 'github'] },

  // Freemium Logic
  subscriptionTier: { type: String, enum: ['FREE', 'PRO', 'ENTERPRISE'], default: 'FREE' },
  aiQueriesRemaining: { type: Number, default: 10 },
  credits: { type: Number, default: 0 },
  lastQueryReset: { type: Date, default: Date.now },

  joinedAt: { type: Date, default: Date.now }
});

// Avoid OverwriteModelError
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
