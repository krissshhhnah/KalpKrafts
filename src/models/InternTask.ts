import mongoose, { Schema, model, models } from 'mongoose';

const InternTaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rewardCredits: { type: Number, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['open', 'assigned', 'in-progress', 'in-review', 'completed'], default: 'open' },
    requirements: [{ type: String }],
  },
  { timestamps: true }
);

export const InternTask = models.InternTask || model('InternTask', InternTaskSchema);
