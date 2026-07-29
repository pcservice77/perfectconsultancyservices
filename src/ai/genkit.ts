
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Initialize Genkit with the Google AI plugin.
// The plugin will automatically look for GOOGLE_GENAI_API_KEY or GOOGLE_API_KEY in your .env file.
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY,
    }),
  ],
  model: 'googleai/gemini-1.5-flash',
});
