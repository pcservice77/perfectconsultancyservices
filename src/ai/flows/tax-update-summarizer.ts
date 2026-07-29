'use server';
/**
 * @fileOverview Summarizes tax update articles to provide users with key implications and deadlines.
 *
 * - summarizeTaxUpdate - A function that summarizes the tax update article.
 * - SummarizeTaxUpdateInput - The input type for the summarizeTaxUpdate function.
 * - SummarizeTaxUpdateOutput - The return type for the summarizeTaxUpdate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTaxUpdateInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the tax update article to be summarized.'),
});
export type SummarizeTaxUpdateInput = z.infer<typeof SummarizeTaxUpdateInputSchema>;

const SummarizeTaxUpdateOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the tax update, highlighting key implications and deadlines.'
    ),
});
export type SummarizeTaxUpdateOutput = z.infer<typeof SummarizeTaxUpdateOutputSchema>;

const prompt = ai.definePrompt({
  name: 'summarizeTaxUpdatePrompt',
  input: {schema: SummarizeTaxUpdateInputSchema},
  output: {schema: SummarizeTaxUpdateOutputSchema},
  prompt: `Summarize the following tax update article, focusing on the key implications and any relevant deadlines.\n\nArticle Content:\n{{{articleContent}}}`,
});

const summarizeTaxUpdateFlow = ai.defineFlow<typeof SummarizeTaxUpdateInputSchema, typeof SummarizeTaxUpdateOutputSchema>(
  {
    name: 'summarizeTaxUpdateFlow',
    inputSchema: SummarizeTaxUpdateInputSchema,
    outputSchema: SummarizeTaxUpdateOutputSchema,
  },
  async (input: SummarizeTaxUpdateInput): Promise<SummarizeTaxUpdateOutput> => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error('Failed to generate summary.');
    }
    return output as SummarizeTaxUpdateOutput;
  }
);

export async function summarizeTaxUpdate(
  input: SummarizeTaxUpdateInput
): Promise<SummarizeTaxUpdateOutput> {
  return summarizeTaxUpdateFlow(input);
}
