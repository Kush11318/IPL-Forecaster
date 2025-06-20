import { PageHeader } from '@/components/page-header';
import { MatchCard } from '@/components/match-card';
import { mockUpcomingMatches } from '@/lib/data';
import type { Match } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function DashboardPage() {
  const upcomingMatches: Match[] = mockUpcomingMatches;

  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title="Welcome to IPL Forecaster"
        description="Get AI-powered predictions for upcoming IPL matches."
      />
      
      <Alert className="mb-8 bg-primary/10 border-primary/30 text-primary-foreground">
        <Info className="h-5 w-5 text-primary" />
        <AlertTitle className="font-headline text-primary">Stay Ahead of the Game!</AlertTitle>
        <AlertDescription>
          Explore upcoming matches, get score predictions, and dive into historical data to make informed decisions.
        </AlertDescription>
      </Alert>

      <section>
        <h2 className="text-2xl font-semibold mb-6 font-headline text-primary">Upcoming Matches</h2>
        {upcomingMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} showPredictionButton />
            ))}
          </div>
        ) : (
          <p>No upcoming matches scheduled at the moment. Check back soon!</p>
        )}
      </section>
    </div>
  );
}
