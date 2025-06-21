
import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-historical-data.ts';
import '@/ai/flows/predict-match-score.ts';
import '@/ai/flows/analyze-custom-dataset-flow.ts';
import '@/ai/flows/analyze-player-performance-flow.ts';
