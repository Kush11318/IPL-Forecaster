'use server';

/**
 * @fileOverview An AI agent that analyzes historical match data and player statistics to identify key factors influencing match outcomes.
 *
 * - analyzeHistoricalData - A function that handles the historical data analysis process.
 * - AnalyzeHistoricalDataInput - The input type for the analyzeHistoricalData function.
 * - AnalyzeHistoricalDataOutput - The return type for the analyzeHistoricalData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeHistoricalDataInputSchema = z.object({
  matchData: z
    .string()
    .describe('Historical match data including team names, scores, dates, and venues.'),
  playerStatistics: z
    .string()
    .describe('Player statistics including batting averages, bowling figures, and fielding stats.'),
});
export type AnalyzeHistoricalDataInput = z.infer<typeof AnalyzeHistoricalDataInputSchema>;

const AnalyzeHistoricalDataOutputSchema = z.object({
  keyFactors: z
    .string()
    .describe(
      'A summary of the key factors influencing match outcomes, such as strong batting lineups or effective bowling attacks.'
    ),
  predictionAccuracyImprovements:
    z.string().describe('Suggested improvements to prediction accuracy based on the analysis.'),
});
export type AnalyzeHistoricalDataOutput = z.infer<typeof AnalyzeHistoricalDataOutputSchema>;

export async function analyzeHistoricalData(
  input: AnalyzeHistoricalDataInput
): Promise<AnalyzeHistoricalDataOutput> {
  return analyzeHistoricalDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeHistoricalDataPrompt',
  input: {schema: AnalyzeHistoricalDataInputSchema},
  output: {schema: AnalyzeHistoricalDataOutputSchema},
  prompt: `You are an expert sports analyst specializing in cricket. Analyze the historical match data and player statistics provided to identify the key factors that influence match outcomes and suggest improvements to prediction accuracy.

Match Data: {{{matchData}}}
Player Statistics: {{{playerStatistics}}}

Based on this data, identify the key factors influencing match outcomes and suggest improvements to prediction accuracy.

Key Factors:
Prediction Accuracy Improvements: `,
});

const analyzeHistoricalDataFlow = ai.defineFlow(
  {
    name: 'analyzeHistoricalDataFlow',
    inputSchema: AnalyzeHistoricalDataInputSchema,
    outputSchema: AnalyzeHistoricalDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
