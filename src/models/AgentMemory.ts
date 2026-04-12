import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
}

export interface IAgentMemory extends Document {
  userId: mongoose.Types.ObjectId;
  topicConcept: string; // e.g., 'arrays-and-hashing', 'git-basics' 
  challengeId?: string; // Optional specific challenge context
  messages: IMessage[];
  lastUpdated: Date;
}

const MessageSchema = new Schema({
  role: { type: String, enum: ['user', 'model', 'system'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const AgentMemorySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  topicConcept: { type: String, required: true },
  challengeId: { type: String },
  messages: [MessageSchema],
  lastUpdated: { type: Date, default: Date.now }
});

// Create a compound index so a user only has one active memory thread PER concept. 
// If they switch to a new concept, it starts a fresh document. We could add TTL here if needed.
AgentMemorySchema.index({ userId: 1, topicConcept: 1 }, { unique: true });

export default mongoose.models.AgentMemory || mongoose.model<IAgentMemory>('AgentMemory', AgentMemorySchema);
