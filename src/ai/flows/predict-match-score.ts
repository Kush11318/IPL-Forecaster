'use server';

/**
 * @fileOverview Predicts the score for an upcoming IPL match.
 *
 * - predictMatchScore - A function that predicts the score of an IPL match.
 * - PredictMatchScoreInput - The input type for the predictMatchScore function.
 * - PredictMatchScoreOutput - The return type for the predictMatchScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictMatchScoreInputSchema = z.object({
  team1: z.string().describe('The name of the first team.'),
  team2: z.string().describe('The name of the second team.'),
  venue: z.string().describe('The venue of the match.'),
  matchDate: z.string().describe('The date of the match in ISO format (YYYY-MM-DD).'),
  historicalData: z.string().optional().describe('Historical match data, player statistics, and team performance data to consider.'),
  currentForm: z.string().optional().describe('Information about the current form of the teams and key players.'),
});
export type PredictMatchScoreInput = z.infer<typeof PredictMatchScoreInputSchema>;

const PredictMatchScoreOutputSchema = z.object({
  team1Score: z.number().describe('The predicted score for the first team.'),
  team2Score: z.number().describe('The predicted score for the second team.'),
  winningTeam: z.string().describe('The predicted winning team.'),
  confidence: z.number().describe('A confidence score (0-1) for the prediction.'),
  rationale: z.string().describe('The AI rationale for the prediction.'),
});
export type PredictMatchScoreOutput = z.infer<typeof PredictMatchScoreOutputSchema>;

export async function predictMatchScore(input: PredictMatchScoreInput): Promise<PredictMatchScoreOutput> {
  return predictMatchScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictMatchScorePrompt',
  input: {schema: PredictMatchScoreInputSchema},
  output: {schema: PredictMatchScoreOutputSchema},
  prompt: `You are an expert IPL match predictor. Based on the provided information, predict the scores for each team and the winning team.

  Team 1: {{{team1}}}
  Team 2: {{{team2}}}
  Venue: {{{venue}}}
  Match Date: {{{matchDate}}}

  Consider the following historical data (if available):
  {{#if historicalData}}
  {{{historicalData}}}
  {{else}}
  No historical data provided.
  {{/if}}

  Consider the current form of the teams (if available):
  {{#if currentForm}}
  {{{currentForm}}}
  {{else}}
  No current form data provided.
  {{/if}}
  
  Provide a rationale for your prediction and a confidence score between 0 and 1.
`,
});

const predictMatchScoreFlow = ai.defineFlow(
  {
    name: 'predictMatchScoreFlow',
    inputSchema: PredictMatchScoreInputSchema,
    outputSchema: PredictMatchScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
