import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Initialize Genkit with the Google AI plugin.
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY,
    }),
  ],
  // Using stable string identifier to avoid named export issues and ensure maximum reliability
  model: 'googleai/gemini-1.5-flash',
});
