
'use server';
/**
 * @fileOverview An AI agent that analyzes a custom dataset provided by the user.
 *
 * - analyzeCustomDataset - A function that handles the custom dataset analysis process.
 * - AnalyzeCustomDatasetInput - The input type for the analyzeCustomDataset function.
 * - AnalyzeCustomDatasetOutput - The return type for the analyzeCustomDataset function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCustomDatasetInputSchema = z.object({
  customDataset: z
    .string()
    .min(10, { message: "Dataset must be at least 10 characters long."})
    .describe('The custom dataset provided by the user in string format (e.g., CSV, JSON, plain text).'),
});
export type AnalyzeCustomDatasetInput = z.infer<typeof AnalyzeCustomDatasetInputSchema>;

const AnalyzeCustomDatasetOutputSchema = z.object({
  analysis: z
    .string()
    .describe('A comprehensive analysis of the provided dataset, including key insights, patterns, and observations.'),
});
export type AnalyzeCustomDatasetOutput = z.infer<typeof AnalyzeCustomDatasetOutputSchema>;

export async function analyzeCustomDataset(
  input: AnalyzeCustomDatasetInput
): Promise<AnalyzeCustomDatasetOutput> {
  return analyzeCustomDatasetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCustomDatasetPrompt',
  input: {schema: AnalyzeCustomDatasetInputSchema},
  output: {schema: AnalyzeCustomDatasetOutputSchema},
  prompt: `You are an expert data analyst. The user has provided the following dataset.
Your task is to analyze it thoroughly and provide a comprehensive summary of key insights, patterns, anomalies, or any interesting observations you can find.
Structure your analysis clearly. If the data appears to be in a common format like CSV or JSON, try to interpret it accordingly.

Dataset:
{{{customDataset}}}

Provide your analysis below.
`,
});

const analyzeCustomDatasetFlow = ai.defineFlow(
  {
    name: 'analyzeCustomDatasetFlow',
    inputSchema: AnalyzeCustomDatasetInputSchema,
    outputSchema: AnalyzeCustomDatasetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to return an analysis.');
    }
    return output;
  }
);
