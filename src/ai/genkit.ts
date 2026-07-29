import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Initialize Genkit with the Google AI plugin.
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY,
    }),
  ],
  // Using the stable string identifier to avoid import export conflicts
  model: 'googleai/gemini-1.5-flash',
});
