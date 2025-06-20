
'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, FileSearch } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { analyzeCustomDataset } from '@/ai/flows/analyze-custom-dataset-flow';
import type { AnalyzeCustomDatasetInput, AnalyzeCustomDatasetOutput } from '@/types';

export default function AnalyzeDatasetPage() {
  const [dataset, setDataset] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeCustomDatasetOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dataset.trim()) {
      toast({
        variant: "destructive",
        title: "Dataset Required",
        description: "Please paste your dataset into the text area.",
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const input: AnalyzeCustomDatasetInput = { customDataset: dataset };
      const result = await analyzeCustomDataset(input);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Dataset analysis error:', error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze the dataset. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Analyze Custom Dataset"
        description="Paste your dataset below and let the AI provide insights."
      />
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-headline text-primary flex items-center gap-2">
            <FileSearch className="w-6 h-6" />
            Provide Your Dataset
          </CardTitle>
          <CardDescription>
            Paste your data (e.g., CSV, JSON, plain text) into the text area below. The AI will attempt to analyze it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Textarea
              placeholder="Paste your dataset here..."
              value={dataset}
              onChange={(e) => setDataset(e.target.value)}
              className="min-h-[200px] resize-y font-mono text-sm"
              aria-label="Dataset input"
            />
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Analyze Dataset
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg">Analyzing your dataset...</p>
        </div>
      )}

      {analysisResult && !isLoading && (
        <Card className="animate-slide-in-up bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
              <Sparkles /> AI Analysis Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-muted-foreground mb-1">Analysis:</h4>
              <pre className="text-sm p-4 bg-muted/50 rounded-md border border-dashed whitespace-pre-wrap break-words">
                {analysisResult.analysis}
              </pre>
            </div>
          </CardContent>
           <CardFooter>
            <p className="text-xs text-muted-foreground italic">
              Disclaimer: AI analysis is based on the provided data and model capabilities. Always verify critical insights.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
