

export interface Match {
  id: string;
  team1: string;
  team1Logo?: string; // URL to placeholder or actual logo
  team2: string;
  team2Logo?: string; // URL to placeholder or actual logo
  date: string; // ISO string
  time: string; // e.g., "19:30 IST"
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  team1Score?: number;
  team2Score?: number;
  winningTeam?: string;
  prediction?: {
    team1Score: number;
    team2Score: number;
    winningTeam: string;
    confidence: number;
    rationale: string;
  };
}

export interface PlayerStat {
  id: string;
  playerId: string;
  playerName: string;
  team: string;
  matchesPlayed: number;
  runsScored?: number;
  battingAverage?: number;
  strikeRate?: number;
  wicketsTaken?: number;
  bowlingAverage?: number;
  economyRate?: number;
}

export interface TeamPerformance {
  id: string;
  teamName: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  netRunRate: number;
  points: number;
  form: ('W' | 'L' | 'N/R')[]; // Last 5 matches, W=Win, L=Loss, N/R=No Result
}

export interface BettingSite {
  id: string;
  name: string;
  url: string;
  description?: string;
}

// For predictMatchScore AI flow
export interface PredictionInput {
  team1: string;
  team2: string;
  venue: string;
  matchDate: string; // YYYY-MM-DD
  historicalData?: string;
  currentForm?: string;
}

export interface PredictionOutput {
  team1Score: number;
  team2Score: number;
  winningTeam: string;
  confidence: number; // 0-1
  rationale: string;
}

// For analyzeCustomDataset AI flow
export interface AnalyzeCustomDatasetInput {
  customDataset: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface KeyMetric {
  label: string;
  value: string;
  description?: string;
}

export interface AnalyzeCustomDatasetOutput {
  summary: string;
  chartType: 'bar' | 'line' | 'pie' | 'none';
  chartData: ChartDataPoint[];
  keyMetrics: KeyMetric[];
}

// For analyzePlayerPerformance AI flow
export interface AnalyzePlayerPerformanceInput {
  playerName: string;
  team: string;
  matchesPlayed: number;
  runsScored?: number;
  battingAverage?: number;
  strikeRate?: number;
  wicketsTaken?: number;
  bowlingAverage?: number;
  economyRate?: number;
}

export interface AnalyzePlayerPerformanceOutput {
    analysis: string;
}
