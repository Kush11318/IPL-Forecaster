import type { Match, PlayerStat, TeamPerformance, BettingSite } from '@/types';

export const mockUpcomingMatches: Match[] = [
  {
    id: '1',
    team1: 'Mumbai Indians',
    team1Logo: 'https://placehold.co/40x40.png',
    team2: 'Chennai Super Kings',
    team2Logo: 'https://placehold.co/40x40.png',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    time: '19:30 IST',
    venue: 'Wankhede Stadium, Mumbai',
    status: 'upcoming',
  },
  {
    id: '2',
    team1: 'Royal Challengers Bengaluru',
    team1Logo: 'https://placehold.co/40x40.png',
    team2: 'Kolkata Knight Riders',
    team2Logo: 'https://placehold.co/40x40.png',
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    time: '15:30 IST',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    status: 'upcoming',
  },
  {
    id: '3',
    team1: 'Delhi Capitals',
    team2: 'Sunrisers Hyderabad',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    time: '19:30 IST',
    venue: 'Arun Jaitley Stadium, Delhi',
    status: 'upcoming',
  },
];

export const mockHistoricalMatches: Match[] = [
  {
    id: 'hist1',
    team1: 'Rajasthan Royals',
    team2: 'Punjab Kings',
    date: '2023-04-05',
    time: '19:30 IST',
    venue: 'Barsapara Cricket Stadium, Guwahati',
    status: 'completed',
    team1Score: 192,
    team2Score: 197,
    winningTeam: 'Punjab Kings',
  },
  {
    id: 'hist2',
    team1: 'Lucknow Super Giants',
    team2: 'Gujarat Titans',
    date: '2023-05-07',
    time: '15:30 IST',
    venue: 'Narendra Modi Stadium, Ahmedabad',
    status: 'completed',
    team1Score: 171,
    team2Score: 227,
    winningTeam: 'Gujarat Titans',
  },
];

export const mockPlayerStats: PlayerStat[] = [
  {
    id: 'player1',
    playerId: 'VK001',
    playerName: 'Virat Kohli',
    team: 'Royal Challengers Bengaluru',
    matchesPlayed: 15,
    runsScored: 639,
    battingAverage: 45.64,
    strikeRate: 139.82,
  },
  {
    id: 'player2',
    playerId: 'RS002',
    playerName: 'Rohit Sharma',
    team: 'Mumbai Indians',
    matchesPlayed: 16,
    runsScored: 332,
    battingAverage: 20.75,
    strikeRate: 132.80,
  },
  {
    id: 'player3',
    playerId: 'JB003',
    playerName: 'Jasprit Bumrah',
    team: 'Mumbai Indians',
    matchesPlayed: 14,
    wicketsTaken: 20,
    bowlingAverage: 19.70,
    economyRate: 7.41,
  },
];

export const mockTeamPerformances: TeamPerformance[] = [
  {
    id: 'team1',
    teamName: 'Chennai Super Kings',
    matchesPlayed: 16,
    wins: 10,
    losses: 5,
    netRunRate: 0.652,
    points: 20,
    form: ['W', 'L', 'W', 'W', 'L'],
  },
  {
    id: 'team2',
    teamName: 'Gujarat Titans',
    matchesPlayed: 17,
    wins: 11,
    losses: 6,
    netRunRate: 0.809,
    points: 22,
    form: ['W', 'W', 'L', 'W', 'W'],
  },
];

export const mockBettingSites: BettingSite[] = [
  { id: '1', name: 'Dream11', url: 'https://www.dream11.com', description: 'Popular fantasy sports platform.' },
  { id: '2', name: 'MyTeam11', url: 'https://www.myteam11.com', description: 'Another leading fantasy sports app.' },
  { id: '3', name: 'MPL - Mobile Premier League', url: 'https://www.mpl.live', description: 'Gaming and fantasy sports platform.' },
  { id: '4', name: 'FanFight', url: 'https://fanfight.com/', description: 'Fantasy cricket and football.' },
];
