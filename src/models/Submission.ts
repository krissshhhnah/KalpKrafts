import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  userId: mongoose.Types.ObjectId;
  challengeId: string; // e.g., 'module-2-two-sum'
  code: string;
  language: string;
  status: 'PENDING' | 'PASS' | 'FAIL' | 'ERROR';
  executionTimeMs?: number;
  memoryUsedKb?: number;
  submittedAt: Date;
}

const SubmissionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  challengeId: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'PASS', 'FAIL', 'ERROR'], default: 'PENDING' },
  executionTimeMs: { type: Number },
  memoryUsedKb: { type: Number },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);
