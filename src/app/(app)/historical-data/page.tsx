'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { mockPlayerStats, mockTeamPerformances, mockHistoricalMatches } from '@/lib/data';
import type { PlayerStat, TeamPerformance, Match } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Users, Shield, BarChartHorizontalBig, RotateCcw, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HistoricalDataPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('playerAnalysis');

  const filteredPlayerStats = useMemo(() => {
    return mockPlayerStats.filter(stat =>
      stat.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stat.team.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredTeamPerformances = useMemo(() => {
    return mockTeamPerformances.filter(team =>
      team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredMatchHistory = useMemo(() => {
    return mockHistoricalMatches.filter(match =>
      match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  
  const resetSearch = () => setSearchTerm('');

  return (
    <div>
      <PageHeader
        title="Historical Data"
        description="Explore past IPL player statistics and team analysis."
      />

      <Card className="mb-6 p-4 md:p-6 bg-card shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by player, team, or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Button onClick={resetSearch} variant="outline" className="w-full md:w-auto">
            <RotateCcw className="mr-2 h-4 w-4" /> Clear Search
          </Button>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 mb-4">
          <TabsTrigger value="playerAnalysis" className="flex items-center gap-2"><Users className="w-4 h-4"/>Player Analysis</TabsTrigger>
          <TabsTrigger value="teamAnalysis" className="flex items-center gap-2"><Shield className="w-4 h-4"/>Team Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="playerAnalysis" className="animate-fadeIn">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Matches</TableHead>
                    <TableHead>Runs</TableHead>
                    <TableHead>Bat Avg</TableHead>
                    <TableHead>SR</TableHead>
                    <TableHead>Wickets</TableHead>
                    <TableHead>Bowl Avg</TableHead>
                    <TableHead>Eco</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayerStats.length > 0 ? filteredPlayerStats.map((stat) => (
                    <TableRow key={stat.id}>
                      <TableCell className="font-medium">{stat.playerName}</TableCell>
                      <TableCell>{stat.team}</TableCell>
                      <TableCell>{stat.matchesPlayed}</TableCell>
                      <TableCell>{stat.runsScored ?? '-'}</TableCell>
                      <TableCell>{stat.battingAverage?.toFixed(2) ?? '-'}</TableCell>
                      <TableCell>{stat.strikeRate?.toFixed(2) ?? '-'}</TableCell>
                      <TableCell>{stat.wicketsTaken ?? '-'}</TableCell>
                      <TableCell>{stat.bowlingAverage?.toFixed(2) ?? '-'}</TableCell>
                      <TableCell>{stat.economyRate?.toFixed(2) ?? '-'}</TableCell>
                       <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={`/player-analysis/${stat.playerId}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View Analysis</span>
                            </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) : (
                     <TableRow><TableCell colSpan={10} className="text-center">No player stats found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teamAnalysis" className="animate-fadeIn space-y-6">
          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-primary flex items-center gap-2">
                    <Shield className="w-5 h-5"/>
                    Team Standings
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team</TableHead>
                    <TableHead>Played</TableHead>
                    <TableHead>Wins</TableHead>
                    <TableHead>Losses</TableHead>
                    <TableHead>NRR</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Recent Form</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeamPerformances.length > 0 ? filteredTeamPerformances.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{team.teamName}</TableCell>
                      <TableCell>{team.matchesPlayed}</TableCell>
                      <TableCell>{team.wins}</TableCell>
                      <TableCell>{team.losses}</TableCell>
                      <TableCell>{team.netRunRate.toFixed(3)}</TableCell>
                      <TableCell>{team.points}</TableCell>
                      <TableCell>{team.form.join(', ')}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={7} className="text-center">No team performances found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-primary flex items-center gap-2">
                    <BarChartHorizontalBig className="w-5 h-5"/>
                    Match History
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Team 1</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Team 2</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Winner</TableHead>
                    <TableHead>Venue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMatchHistory.length > 0 ? filteredMatchHistory.map((match) => (
                    <TableRow key={match.id}>
                      <TableCell>{new Date(match.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{match.team1}</TableCell>
                      <TableCell>{match.team1Score}</TableCell>
                      <TableCell className="font-medium">{match.team2}</TableCell>
                      <TableCell>{match.team2Score}</TableCell>
                      <TableCell className="text-primary">{match.winningTeam}</TableCell>
                      <TableCell>{match.venue}</TableCell>
                    </TableRow>
                  )) : (
                     <TableRow><TableCell colSpan={7} className="text-center">No match history found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      { (activeTab === 'playerAnalysis' && filteredPlayerStats.length === 0) ||
        (activeTab === 'teamAnalysis' && filteredTeamPerformances.length === 0 && filteredMatchHistory.length === 0) ? (
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-muted-foreground">No data found</p>
            <p className="text-muted-foreground">Try adjusting your search term.</p>
          </div>
        ) : null
      }
    </div>
  );
}
