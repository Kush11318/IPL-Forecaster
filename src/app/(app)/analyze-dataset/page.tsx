
'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, UploadCloud } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { analyzeCustomDataset } from '@/ai/flows/analyze-custom-dataset-flow';
import type { AnalyzeCustomDatasetInput, AnalyzeCustomDatasetOutput } from '@/types';

export default function AnalyzeDatasetPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeCustomDatasetOutput | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setFileContent(text);
      };
      reader.onerror = () => {
        console.error('Error reading file');
        toast({
          variant: "destructive",
          title: "File Read Error",
          description: "There was an issue reading your file. Please try again.",
        });
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fileContent.trim()) {
      toast({
        variant: "destructive",
        title: "File Required",
        description: "Please select a file and ensure it is not empty.",
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const input: AnalyzeCustomDatasetInput = { customDataset: fileContent };
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
        description="Upload your dataset file (CSV, JSON, TXT) and let the AI provide insights."
      />
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-headline text-primary flex items-center gap-2">
            <UploadCloud className="w-6 h-6" />
            Upload Your Dataset
          </CardTitle>
          <CardDescription>
            Select a file from your device. The AI will attempt to analyze its content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dataset-file">Dataset File</Label>
              <Input
                id="dataset-file"
                type="file"
                accept=".csv,.json,.txt"
                onChange={handleFileChange}
                className="file:text-primary file:font-semibold"
                aria-label="Dataset file input"
              />
              {file && <p className="text-sm text-muted-foreground pt-2">Selected file: <span className="font-medium">{file.name}</span></p>}
            </div>
            <Button type="submit" disabled={isLoading || !file} className="w-full md:w-auto">
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
