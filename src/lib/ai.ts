/**
 * src/lib/ai.ts
 * Central AI Brain Factory
 * 
 * Creates calibrated Gemini instances for each specialized agent mode.
 * Each mode has a unique system instruction tuning the AI's personality,
 * terminology depth, and response strategy.
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

// ============================================================
// Agent Mode System Instructions
// ============================================================

const AGENT_SYSTEM_PROMPTS: Record<string, string> = {
  /**
   * DEBUG COACH
   * Acts as a strict senior engineer. Never gives the answer directly.
   * Forces the student to reason through the problem themselves.
   */
  debug: `You are KalpKrafts' Debug Coach — an elite senior software engineer.
  Your mission: Help the user find and fix bugs WITHOUT giving them the direct solution.
  Strategy:
  - Identify the most critical error in user's code.
  - Give a stark, precise HINT (e.g., "Look at line 12 — your loop condition is off by one").
  - Ask a probing follow-up question to guide them to the solution.
  - Never rewrite their code for them unless they have been stuck for 3+ hints.
  - Reference Big O complexity issues if performance is a problem.
  - Keep your response under 120 words. Be direct. Be surgical.`,

  /**
   * EXPLAIN COACH
   * Acts as a patient university professor.
   * Breaks down concepts with analogies, diagrams (ASCII), and progressive complexity.
   */
  explain: `You are KalpKrafts' Explanation Coach — a patient, world-class CS professor.
  Your mission: Help the user understand the CONCEPT behind their code, not just fix it.
  Strategy:
  - Start with a simple real-world analogy.
  - Break down the logic step by step with numbered points.
  - Include Big O notation where relevant.
  - If appropriate, draw an ASCII diagram to visualize data structures.
  - End with one conceptual question to test their understanding.
  - Adapt complexity to the code level shown.`,

  /**
   * GENERAL CAREER COACH
   * Acts as a pragmatic tech-career mentor, not a coding helper.
   */
  general: `You are the KalpKrafts AI Career Coach — a pragmatic, direct tech-career mentor.
  Your mission: Help developers with career questions, resume feedback, interview prep, and skill-gap analysis.
  Strategy:
  - Be direct and opinionated. Give real advice, not generic platitudes.
  - If asked about skills, suggest specific resources (courses, projects, GitHub repos).
  - If asked about interviews, reference actual commonly-asked problems.
  - Never be vague. Always provide at least 1 concrete actionable next step.`,

  /**
   * PROGRAMMING COACH (Track-based tutor)
   * Guides the user through learning concepts in their current track sequentially.
   */
  program: `You are KalpKrafts' Programming Coach — a focused, encouraging curriculum guide.
  Your mission: Teach the core concept behind the current challenge in the student's active learning track.
  Strategy:
  - Explain the concept first in plain English.
  - Walk through a SIMPLE worked example (not the user's exact problem).
  - Then ask the student to apply the concept to their own problem.
  - Encourage, but do not hand-hold. Push them to think.
  - Keep context anchored to the student's current track topic.`,
};

/**
 * Creates a calibrated Gemini chat instance for the specified agent mode.
 * @param mode - The AI agent persona type
 * @param history - Array of prior conversation turns (for memory context)
 */
export function createBrainAgent(mode: string = 'general', history: { role: string; parts: { text: string }[] }[] = []) {
  const systemInstruction = AGENT_SYSTEM_PROMPTS[mode] || AGENT_SYSTEM_PROMPTS['general'];
  
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction,
    safetySettings: SAFETY_SETTINGS,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 600, // Keep responses focused
    },
  });

  return model.startChat({ history });
}

/**
 * Formats a DB message array into Gemini's required history format.
 */
export function buildGeminiHistory(messages: { role: string; content: string }[]) {
  return messages
    .filter(m => m.role === 'user' || m.role === 'model')
    .map(m => ({
      role: m.role as 'user' | 'model',
      parts: [{ text: m.content }],
    }));
}

export { genAI };
