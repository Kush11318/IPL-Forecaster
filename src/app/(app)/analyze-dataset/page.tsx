
'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, UploadCloud, FileText, Lightbulb, AreaChart, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { analyzeCustomDataset } from '@/ai/flows/analyze-custom-dataset-flow';
import type { AnalyzeCustomDatasetInput, AnalyzeCustomDatasetOutput, ChartDataPoint, KeyMetric } from '@/types';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

function AnalysisDisplay({ result }: { result: AnalyzeCustomDatasetOutput }) {
  const { summary, keyMetrics, chartType, chartData } = result;

  const chartConfig = {
    value: {
      label: "Value",
    },
  } satisfies ChartConfig;

  // Define a color palette for pie charts to ensure visual distinction
  const PIE_COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--primary))",
    "hsl(var(--accent))",
  ];

  const renderChart = () => {
    if (!chartData || chartData.length === 0 || chartType === 'none') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 border border-dashed rounded-lg">
          <AlertTriangle className="w-10 h-10 text-muted-foreground mb-2" />
          <p className="font-semibold">No Visualization Available</p>
          <p className="text-sm text-muted-foreground">The AI could not generate a chart for this dataset.</p>
        </div>
      );
    }
    
    switch(chartType) {
      case 'bar':
        return (
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={4} />
            </BarChart>
          </ChartContainer>
        );
      case 'line':
        return (
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <LineChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={true} />
            </LineChart>
          </ChartContainer>
        );
      case 'pie':
        return (
          <ChartContainer config={chartConfig} className="min-h-[300px] mx-auto max-w-xs">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} >
                 {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
              </Pie>
              <Legend />
            </PieChart>
          </ChartContainer>
        );
      default:
        return <p>Unsupported chart type.</p>;
    }
  };

  return (
    <div className="space-y-8 animate-slide-in-up">
      {/* Key Metrics Section */}
      {keyMetrics && keyMetrics.length > 0 && (
         <section>
            <h2 className="text-2xl font-headline text-primary mb-4 flex items-center gap-2"><Lightbulb />Key Metrics</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {keyMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardDescription>{metric.label}</CardDescription>
                    <CardTitle className="text-3xl font-bold text-primary">{metric.value}</CardTitle>
                  </CardHeader>
                   {metric.description && (
                    <CardContent>
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
         </section>
      )}

      {/* Chart Visualization Section */}
      <section>
        <h2 className="text-2xl font-headline text-primary mb-4 flex items-center gap-2"><AreaChart />Visual Analysis</h2>
        <Card>
          <CardContent className="pt-6">
            {renderChart()}
          </CardContent>
        </Card>
      </section>

      {/* AI Summary Section */}
      <section>
        <h2 className="text-2xl font-headline text-primary mb-4 flex items-center gap-2"><FileText />Detailed Summary</h2>
        <Card>
          <CardContent className="pt-6">
             <pre className="text-sm whitespace-pre-wrap break-words font-body">
              {summary}
            </pre>
          </CardContent>
        </Card>
      </section>
      
      <CardFooter className="mt-4">
          <p className="text-xs text-muted-foreground italic text-center w-full">
            Disclaimer: AI analysis is based on the provided data and model capabilities. Always verify critical insights.
          </p>
      </CardFooter>
    </div>
  );
}


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
        <div className="flex flex-col justify-center items-center p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg">Analyzing your dataset...</p>
          <p className="text-sm text-muted-foreground">This may take a moment.</p>
        </div>
      )}

      {analysisResult && !isLoading && <AnalysisDisplay result={analysisResult} />}
    </div>
  );
}
