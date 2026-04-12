import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  trackId: string; // e.g., 'track-a-dsa'
  unlockedModules: string[]; // e.g., ['module-1', 'module-2']
  completedModules: string[];
  totalCreditsEarned: number;
  lastActive: Date;
}

const ProgressSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  trackId: { type: String, required: true },
  unlockedModules: { type: [String], default: ['module-1'] },
  completedModules: { type: [String], default: [] },
  totalCreditsEarned: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now }
});

// Compound index to ensure 1 progress document per user per track
ProgressSchema.index({ userId: 1, trackId: 1 }, { unique: true });

export default mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);
