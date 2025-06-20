'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { predictMatchScore } from '@/ai/flows/predict-match-score';
import type { PredictionInput, PredictionOutput } from '@/types';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, AlertTriangleIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const predictionFormSchema = z.object({
  team1: z.string().min(2, { message: 'Team 1 name must be at least 2 characters.' }),
  team2: z.string().min(2, { message: 'Team 2 name must be at least 2 characters.' }),
  venue: z.string().min(5, { message: 'Venue must be at least 5 characters.' }),
  matchDate: z.date({ required_error: "Match date is required."}),
  historicalData: z.string().optional(),
  currentForm: z.string().optional(),
});

type PredictionFormValues = z.infer<typeof predictionFormSchema>;

interface ScorePredictionFormProps {
  initialValues?: Partial<PredictionFormValues & { matchDate: string }>; // Allow string for initial date
}

export function ScorePredictionForm({ initialValues }: ScorePredictionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionFormSchema),
    defaultValues: {
      team1: initialValues?.team1 || '',
      team2: initialValues?.team2 || '',
      venue: initialValues?.venue || '',
      matchDate: initialValues?.matchDate ? new Date(initialValues.matchDate) : new Date(),
      historicalData: initialValues?.historicalData || '',
      currentForm: initialValues?.currentForm || '',
    },
  });

  useEffect(() => {
    if (initialValues) {
        form.reset({
            team1: initialValues.team1 || '',
            team2: initialValues.team2 || '',
            venue: initialValues.venue || '',
            matchDate: initialValues.matchDate ? new Date(initialValues.matchDate) : new Date(),
            historicalData: initialValues.historicalData || '',
            currentForm: initialValues.currentForm || '',
        });
    }
  }, [initialValues, form]);


  async function onSubmit(data: PredictionFormValues) {
    setIsLoading(true);
    setPredictionResult(null);
    try {
      const input: PredictionInput = {
        ...data,
        matchDate: format(data.matchDate, 'yyyy-MM-dd'), // Format date to string for AI
      };
      const result = await predictMatchScore(input);
      setPredictionResult(result);
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        variant: "destructive",
        title: "Prediction Failed",
        description: "Could not generate prediction. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-primary">Predict Match Score</CardTitle>
          <CardDescription>Fill in the match details to get an AI-powered score prediction.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="team1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team 1</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mumbai Indians" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="team2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team 2</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Chennai Super Kings" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Wankhede Stadium, Mumbai" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="matchDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Match Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setDate(new Date().getDate() -1)) // disable past dates
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="historicalData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Data (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide any relevant historical data context, e.g., head-to-head stats, past scores at this venue."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This helps the AI make a more informed prediction.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentForm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Form (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe recent team performances, key player injuries, or other factors affecting current form."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Information about the current state of teams and players.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Predict Score
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg">Generating prediction...</p>
        </div>
      )}

      {predictionResult && !isLoading && (
        <Card className="mt-8 animate-slide-in-up bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2"><Sparkles />AI Prediction Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-card rounded-lg shadow">
                <p className="text-sm text-muted-foreground">{predictionResult.team1Score > predictionResult.team2Score ? form.getValues("team1") : form.getValues("team2")}</p>
                <p className="text-3xl font-bold text-primary">{Math.max(predictionResult.team1Score, predictionResult.team2Score)}</p>
              </div>
              <div className="p-4 flex items-center justify-center text-2xl font-bold text-muted-foreground">vs</div>
              <div className="p-4 bg-card rounded-lg shadow">
                <p className="text-sm text-muted-foreground">{predictionResult.team1Score < predictionResult.team2Score ? form.getValues("team1") : form.getValues("team2")}</p>
                <p className="text-3xl font-bold">{Math.min(predictionResult.team1Score, predictionResult.team2Score)}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg"><span className="font-semibold text-muted-foreground">Predicted Winner:</span> <span className="font-bold text-accent">{predictionResult.winningTeam}</span></p>
              <p className="text-lg"><span className="font-semibold text-muted-foreground">Confidence:</span> <span className="font-bold text-accent">{(predictionResult.confidence * 100).toFixed(0)}%</span></p>
            </div>
            <div>
              <h4 className="font-semibold text-muted-foreground mb-1">Rationale:</h4>
              <p className="text-sm p-3 bg-muted/50 rounded-md border border-dashed">{predictionResult.rationale}</p>
            </div>
          </CardContent>
           <CardFooter>
            <p className="text-xs text-muted-foreground italic">
              Disclaimer: AI predictions are for entertainment and informational purposes only. Actual outcomes may vary.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
