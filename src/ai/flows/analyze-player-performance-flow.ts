'use server';
/**
 * @fileOverview An AI agent that analyzes a cricket player's performance statistics.
 *
 * - analyzePlayerPerformance - A function that handles the player performance analysis.
 * - AnalyzePlayerPerformanceInput - The input type for the analyzePlayerPerformance function.
 * - AnalyzePlayerPerformanceOutput - The return type for the analyzePlayerPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePlayerPerformanceInputSchema = z.object({
  playerName: z.string(),
  team: z.string(),
  matchesPlayed: z.number(),
  runsScored: z.number().optional(),
  battingAverage: z.number().optional(),
  strikeRate: z.number().optional(),
  wicketsTaken: z.number().optional(),
  bowlingAverage: z.number().optional(),
  economyRate: z.number().optional(),
}).describe("A cricket player's statistics for a season or tournament.");
export type AnalyzePlayerPerformanceInput = z.infer<typeof AnalyzePlayerPerformanceInputSchema>;

const AnalyzePlayerPerformanceOutputSchema = z.object({
  analysis: z.string().describe("A comprehensive analysis of the player's performance, highlighting strengths, weaknesses, recent form, and overall impact on their team. The analysis should be written from the perspective of an expert cricket analyst."),
});
export type AnalyzePlayerPerformanceOutput = z.infer<typeof AnalyzePlayerPerformanceOutputSchema>;

export async function analyzePlayerPerformance(
  input: AnalyzePlayerPerformanceInput
): Promise<AnalyzePlayerPerformanceOutput> {
  return analyzePlayerPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePlayerPerformancePrompt',
  input: {schema: AnalyzePlayerPerformanceInputSchema},
  output: {schema: AnalyzePlayerPerformanceOutputSchema},
  prompt: `You are an expert cricket analyst. Based on the following player statistics, provide a detailed analysis of their performance.

Player Name: {{{playerName}}}
Team: {{{team}}}
Matches Played: {{{matchesPlayed}}}

**Batting Stats:**
{{#if runsScored}}
- Runs Scored: {{{runsScored}}}
- Batting Average: {{{battingAverage}}}
- Strike Rate: {{{strikeRate}}}
{{else}}
- Not a primary batsman or did not bat.
{{/if}}

**Bowling Stats:**
{{#if wicketsTaken}}
- Wickets Taken: {{{wicketsTaken}}}
- Bowling Average: {{{bowlingAverage}}}
- Economy Rate: {{{economyRate}}}
{{else}}
- Not a primary bowler or did not bowl.
{{/if}}

**Analysis Task:**
Write a comprehensive analysis covering the player's role in the team, their key strengths, and potential areas for improvement. Comment on whether their performance aligns with their reputation (e.g., explosive batsman, economical bowler). Conclude with an overall assessment of their impact.
`,
});

const analyzePlayerPerformanceFlow = ai.defineFlow(
  {
    name: 'analyzePlayerPerformanceFlow',
    inputSchema: AnalyzePlayerPerformanceInputSchema,
    outputSchema: AnalyzePlayerPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to return an analysis for the player.');
    }
    return output;
  }
);
