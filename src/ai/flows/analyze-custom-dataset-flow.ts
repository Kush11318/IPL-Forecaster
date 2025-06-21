
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


const ChartDataPointSchema = z.object({
    name: z.string().describe('The label for the data point (e.g., a category name, a date).'),
    value: z.number().describe('The numerical value for the data point.'),
});

const KeyMetricSchema = z.object({
    label: z.string().describe('The name of the metric (e.g., "Average Revenue", "Total Users").'),
    value: z.string().describe('The value of the metric, formatted as a string.'),
    description: z.string().optional().describe('A brief description or context for the metric.'),
});

const AnalyzeCustomDatasetOutputSchema = z.object({
  summary: z
    .string()
    .describe('A comprehensive textual analysis of the provided dataset, highlighting key insights and patterns.'),
  chartType: z
    .enum(['bar', 'line', 'pie', 'none'])
    .describe("The most suitable chart type for the data. Use 'bar' for comparing distinct categories, 'line' for trends over time or continuous data, 'pie' for showing proportions of a whole. Use 'none' if the data is not suitable for visualization."),
  chartData: z
    .array(ChartDataPointSchema)
    .describe('Structured data extracted for charting. If generating chart data, extract up to 10-12 key data points. The `name` should be a label and `value` should be a number.'),
  keyMetrics: z
    .array(KeyMetricSchema)
    .describe('A list of 2-4 important, high-level metrics or stats derived from the data.'),
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
  prompt: `You are an expert data analyst AI. Your task is to analyze the user-provided dataset and present your findings in a structured, multi-faceted way.

**Analysis Steps:**
1.  **Examine the data:** Understand its structure (e.g., CSV, JSON, text) and content.
2.  **Textual Summary:** Write a comprehensive \`summary\` of key insights, patterns, anomalies, or any interesting observations.
3.  **Extract Key Metrics:** Identify 2-4 of the most important high-level statistics from the data. Format them as \`keyMetrics\` with a label, a value, and an optional brief description.
4.  **Prepare Chart Data:** If the dataset contains suitable categorical or time-series data with numerical values, extract it into a \`chartData\` array. Each object in the array should have a \`name\` (the label) and a \`value\` (the number). To keep the chart readable, please select a maximum of 12 representative data points.
5.  **Recommend Chart Type:** Based on the data you prepared, recommend the best \`chartType\`. Use 'bar' for comparing distinct items, 'line' for trends, or 'pie' for proportions. If no meaningful visual can be made, use 'none'.

**Input Dataset:**
{{{customDataset}}}

Produce a JSON output that strictly follows the defined schema. Ensure all fields are populated correctly based on your analysis.
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
