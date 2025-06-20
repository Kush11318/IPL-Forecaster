'use client';

import type { Match } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { BallIcon, BatIcon } from './icons/cricket-icons';

interface MatchCardProps {
  match: Match;
  showPredictionButton?: boolean;
}

export function MatchCard({ match, showPredictionButton = false }: MatchCardProps) {
  const hasPrediction = !!match.prediction;

  return (
    <Card className="w-full max-w-md hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300 bg-card">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl font-headline text-primary flex items-center gap-2">
            <BallIcon className="w-6 h-6" />
            <span>{match.team1} vs {match.team2}</span>
          </CardTitle>
          {match.status === 'upcoming' && <Badge variant="outline" className="bg-accent text-accent-foreground">Upcoming</Badge>}
          {match.status === 'completed' && <Badge variant="secondary">Completed</Badge>}
          {match.status === 'live' && <Badge variant="destructive">Live</Badge>}
        </div>
        <CardDescription className="flex flex-col gap-1 text-sm">
          <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-muted-foreground" /> {format(parseISO(match.date), 'PPP')}</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> {match.time}</span>
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /> {match.venue}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around items-center mb-4">
          <div className="flex flex-col items-center gap-2">
            <Image data-ai-hint="team logo" src={match.team1Logo || `https://placehold.co/60x60.png?text=${match.team1.substring(0,1)}`} alt={`${match.team1} logo`} width={60} height={60} className="rounded-full" />
            <span className="font-medium text-center">{match.team1}</span>
            {match.status === 'completed' && <span className="text-2xl font-bold">{match.team1Score}</span>}
          </div>
          <span className="text-2xl font-bold text-muted-foreground">vs</span>
          <div className="flex flex-col items-center gap-2">
            <Image data-ai-hint="team logo" src={match.team2Logo || `https://placehold.co/60x60.png?text=${match.team2.substring(0,1)}`} alt={`${match.team2} logo`} width={60} height={60} className="rounded-full" />
            <span className="font-medium text-center">{match.team2}</span>
            {match.status === 'completed' && <span className="text-2xl font-bold">{match.team2Score}</span>}
          </div>
        </div>

        {match.status === 'completed' && match.winningTeam && (
          <p className="text-center font-semibold text-primary">
            {match.winningTeam} won the match.
          </p>
        )}
        
        {hasPrediction && (
          <div className="mt-4 p-3 border border-dashed border-primary/50 rounded-md bg-primary/10 animate-fadeIn">
            <h4 className="text-sm font-semibold text-primary mb-1 flex items-center gap-1"><Sparkles className="w-4 h-4" /> AI Prediction</h4>
            <p className="text-xs">
              {match.prediction!.team1}: {match.prediction!.team1Score} - {match.prediction!.team2}: {match.prediction!.team2Score}
            </p>
            <p className="text-xs"><span className="font-medium">Predicted Winner:</span> {match.prediction!.winningTeam}</p>
            <p className="text-xs"><span className="font-medium">Confidence:</span> {(match.prediction!.confidence * 100).toFixed(0)}%</p>
          </div>
        )}
      </CardContent>
      {showPredictionButton && match.status === 'upcoming' && !hasPrediction && (
        <CardFooter>
          <Link href={`/predictions?team1=${encodeURIComponent(match.team1)}&team2=${encodeURIComponent(match.team2)}&venue=${encodeURIComponent(match.venue)}&date=${format(parseISO(match.date), 'yyyy-MM-dd')}`} passHref className="w-full">
            <Button variant="default" className="w-full">
              <Sparkles className="mr-2 h-4 w-4" /> Predict Score
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
