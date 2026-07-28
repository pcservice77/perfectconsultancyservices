
'use server';
/**
 * @fileOverview An AI Tax Assistant for Perfect Consultancy Services.
 *
 * - askTaxAssistant - A function that handles tax-related queries.
 * - TaxAssistantInput - The input type for the assistant.
 * - TaxAssistantOutput - The return type for the assistant.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaxAssistantInputSchema = z.object({
  query: z.string().describe('The user\'s question about tax, GST, or accounting.'),
});
export type TaxAssistantInput = z.infer<typeof TaxAssistantInputSchema>;

const TaxAssistantOutputSchema = z.object({
  response: z.string().describe('The helpful, professional response from the tax assistant.'),
  suggestedAction: z.string().optional().describe('A suggested next step, like "Contact a consultant" or "Check GST portal".'),
});
export type TaxAssistantOutput = z.infer<typeof TaxAssistantOutputSchema>;

export async function askTaxAssistant(input: TaxAssistantInput): Promise<TaxAssistantOutput> {
  return taxAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'taxAssistantPrompt',
  input: {schema: TaxAssistantInputSchema},
  output: {schema: TaxAssistantOutputSchema},
  prompt: `You are the "PCS AI Assistant," an expert virtual consultant for "Perfect Consultancy Services" in Ranchi, India.
  
Your goal is to provide helpful, concise, and professional information about Indian Taxation (GST, Income Tax, TDS), Accounting, and Business Compliance.

Guidelines:
1. Be professional and encouraging.
2. If the user asks about specific deadlines, mention that they should verify with a PCS consultant as laws change.
3. If the query is too complex, gently suggest they "Contact a PCS expert" using the site's contact form.
4. Focus on Indian context (GST, ITR, etc.).

User Query: {{{query}}}`,
});

const taxAssistantFlow = ai.defineFlow(
  {
    name: 'taxAssistantFlow',
    inputSchema: TaxAssistantInputSchema,
    outputSchema: TaxAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
