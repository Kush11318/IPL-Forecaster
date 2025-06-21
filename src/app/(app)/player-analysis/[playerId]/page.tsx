'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { mockPlayerStats } from '@/lib/data';
import type { PlayerStat } from '@/types';
import { analyzePlayerPerformance } from '@/ai/flows/analyze-player-performance-flow';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, User, Shield, BarChart, TrendingUp, Target, DraftingCompass, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';

function StatCard({ icon: Icon, label, value, description }: { icon: React.ElementType, label: string, value: string | number, description?: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </CardContent>
        </Card>
    )
}

export default function PlayerAnalysisPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const { playerId } = params;

    const [player, setPlayer] = useState<PlayerStat | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const foundPlayer = mockPlayerStats.find(p => p.playerId === playerId);
        if (foundPlayer) {
            setPlayer(foundPlayer);
            handleAnalyze(foundPlayer);
        } else {
            // Handle case where player is not found
            toast({
                variant: 'destructive',
                title: 'Player Not Found',
                description: `Could not find data for player ID: ${playerId}`,
            });
            router.push('/historical-data');
        }
    }, [playerId, router, toast]);

    const handleAnalyze = async (playerData: PlayerStat) => {
        setIsLoading(true);
        try {
            const result = await analyzePlayerPerformance({
                playerName: playerData.playerName,
                team: playerData.team,
                matchesPlayed: playerData.matchesPlayed,
                runsScored: playerData.runsScored,
                battingAverage: playerData.battingAverage,
                strikeRate: playerData.strikeRate,
                wicketsTaken: playerData.wicketsTaken,
                bowlingAverage: playerData.bowlingAverage,
                economyRate: playerData.economyRate,
            });
            setAnalysis(result.analysis);
        } catch (error) {
            console.error('Analysis failed:', error);
            toast({
                variant: 'destructive',
                title: 'Analysis Failed',
                description: 'The AI could not generate an analysis for this player.',
            });
            setAnalysis('Failed to load AI analysis.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!player) {
        // This will be shown briefly while the useEffect runs
        return (
             <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    const isBatsman = player.runsScored !== undefined && player.runsScored > 0;
    const isBowler = player.wicketsTaken !== undefined && player.wicketsTaken > 0;

    return (
        <div>
            <PageHeader
                title={player.playerName}
                description={`Performance analysis for the ${player.team}`}
                actions={
                    <Button variant="outline" asChild>
                        <Link href="/historical-data">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Historical Data
                        </Link>
                    </Button>
                }
            />

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-headline text-primary mb-4 flex items-center gap-2">
                        <BarChart />
                        Player Statistics
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard icon={User} label="Player" value={player.playerName} description={player.team} />
                        <StatCard icon={Shield} label="Matches Played" value={player.matchesPlayed} />
                        {isBatsman && (
                            <>
                                <StatCard icon={TrendingUp} label="Runs Scored" value={player.runsScored!} />
                                <StatCard icon={Target} label="Batting Avg" value={player.battingAverage?.toFixed(2) ?? 'N/A'} />
                                <StatCard icon={DraftingCompass} label="Strike Rate" value={player.strikeRate?.toFixed(2) ?? 'N/A'} />
                            </>
                        )}
                         {isBowler && (
                            <>
                                <StatCard icon={TrendingUp} label="Wickets Taken" value={player.wicketsTaken!} />
                                <StatCard icon={Target} label="Bowling Avg" value={player.bowlingAverage?.toFixed(2) ?? 'N/A'} />
                                <StatCard icon={DraftingCompass} label="Economy Rate" value={player.economyRate?.toFixed(2) ?? 'N/A'} />
                            </>
                        )}
                    </div>
                </section>
                
                <section>
                     <h2 className="text-2xl font-headline text-primary mb-4 flex items-center gap-2">
                        <FileText />
                        AI Analyst Report
                    </h2>
                     <Card>
                        <CardContent className="pt-6">
                            {isLoading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            ) : (
                                <pre className="text-sm whitespace-pre-wrap break-words font-body">
                                    {analysis}
                                </pre>
                            )}
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}
