import mongoose, { Schema, model, models } from 'mongoose';

const ChallengeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    starterCode: { type: String, required: true },
    type: { type: String, enum: ['coding', 'debugging'], required: true },
    testCases: [
      {
        input: { type: String },
        expectedOutput: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Challenge = models.Challenge || model('Challenge', ChallengeSchema);
