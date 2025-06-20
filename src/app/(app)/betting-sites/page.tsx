import { PageHeader } from '@/components/page-header';
import { mockBettingSites } from '@/lib/data';
import type { BettingSite } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function BettingSitesPage() {
  const sites: BettingSite[] = mockBettingSites;

  return (
    <div>
      <PageHeader
        title="Fantasy Sports & Odds Comparison"
        description="Explore popular platforms for fantasy IPL and to compare match odds. This app does not facilitate betting."
      />

      <Alert variant="default" className="mb-8 bg-primary/10 border-primary/30">
        <Info className="h-5 w-5 text-primary" />
        <AlertTitle className="font-headline text-primary">Please Note</AlertTitle>
        <AlertDescription className="text-primary-foreground/80">
          IPL Forecaster provides this list for informational purposes only. We are not affiliated with any of these sites and do not endorse or facilitate gambling. Please play responsibly.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <Card key={site.id} className="flex flex-col bg-card hover:shadow-primary/10 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-primary">{site.name}</CardTitle>
              {site.description && <CardDescription>{site.description}</CardDescription>}
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Additional content about the site can go here if available */}
            </CardContent>
            <CardContent className="mt-auto">
               <Link href={site.url} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  Visit {site.name} <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
