import mongoose, { Schema, model, models } from 'mongoose';

const InternshipApplicationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    githubUrl: { type: String, required: true },
    portfolioUrl: { type: String },
    resumeUrl: { type: String },
    screeningTaskStatus: { type: String, enum: ['pending', 'submitted', 'passed', 'failed'], default: 'pending' },
  },
  { timestamps: true }
);

export const InternshipApplication = models.InternshipApplication || model('InternshipApplication', InternshipApplicationSchema);
