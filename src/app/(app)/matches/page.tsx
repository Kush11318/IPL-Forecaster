'use client';

import { PageHeader } from '@/components/page-header';
import { MatchCard } from '@/components/match-card';
import { mockUpcomingMatches, mockHistoricalMatches } from '@/lib/data';
import type { Match } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, RotateCcw } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const allMatches = [...mockUpcomingMatches, ...mockHistoricalMatches].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function MatchesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [venueFilter, setVenueFilter] = useState('all');
  const [activeTab, setActiveTab] = useState("all");

  const uniqueTeams = useMemo(() => {
    const teams = new Set<string>();
    allMatches.forEach(match => {
      teams.add(match.team1);
      teams.add(match.team2);
    });
    return Array.from(teams).sort();
  }, []);

  const uniqueVenues = useMemo(() => {
    const venues = new Set<string>();
    allMatches.forEach(match => venues.add(match.venue));
    return Array.from(venues).sort();
  }, []);

  const filteredMatches = useMemo(() => {
    return allMatches.filter(match => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch =
        match.team1.toLowerCase().includes(lowerSearchTerm) ||
        match.team2.toLowerCase().includes(lowerSearchTerm) ||
        match.venue.toLowerCase().includes(lowerSearchTerm);

      const matchesTeam =
        teamFilter === 'all' || match.team1 === teamFilter || match.team2 === teamFilter;
      
      const matchesVenue =
        venueFilter === 'all' || match.venue === venueFilter;

      const matchesStatus = 
        activeTab === 'all' || match.status === activeTab;

      return matchesSearch && matchesTeam && matchesVenue && matchesStatus;
    });
  }, [searchTerm, teamFilter, venueFilter, activeTab]);

  const resetFilters = () => {
    setSearchTerm('');
    setTeamFilter('all');
    setVenueFilter('all');
    setActiveTab('all');
  };
  
  // Effect to handle initial tab based on query param or default
  useEffect(() => {
    // This could be extended to read from URL query params if deep linking to tabs is needed
  }, []);


  return (
    <div>
      <PageHeader
        title="Browse Matches"
        description="Explore upcoming and past IPL matches. Use filters to find specific games."
      />

      <Card className="mb-6 p-4 md:p-6 bg-card shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="search-match" className="block text-sm font-medium mb-1">Search Match</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search-match"
                type="text"
                placeholder="Search by team or venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label htmlFor="team-filter" className="block text-sm font-medium mb-1">Filter by Team</label>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger id="team-filter">
                <SelectValue placeholder="All Teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {uniqueTeams.map(team => (
                  <SelectItem key={team} value={team}>{team}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           <div>
            <label htmlFor="venue-filter" className="block text-sm font-medium mb-1">Filter by Venue</label>
            <Select value={venueFilter} onValueChange={setVenueFilter}>
              <SelectTrigger id="venue-filter">
                <SelectValue placeholder="All Venues" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Venues</SelectItem>
                {uniqueVenues.map(venue => (
                  <SelectItem key={venue} value={venue}>{venue}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={resetFilters} variant="outline" className="w-full lg:w-auto mt-4 lg:mt-0">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset Filters
          </Button>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="all">All Matches</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="live">Live (mock)</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} showPredictionButton={match.status === 'upcoming'} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-muted-foreground">No matches found</p>
          <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}
