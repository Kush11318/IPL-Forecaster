'use client';
import { PageHeader } from '@/components/page-header';
import { ScorePredictionForm } from '@/components/score-prediction-form';
import { useSearchParams } from 'next/navigation';
import type { PredictionFormValues } from '@/components/score-prediction-form'; // Assuming this type is exported

export default function PredictionsPage() {
  const searchParams = useSearchParams();
  const initialValues: Partial<PredictionFormValues & { matchDate: string }> = {
    team1: searchParams.get('team1') || undefined,
    team2: searchParams.get('team2') || undefined,
    venue: searchParams.get('venue') || undefined,
    matchDate: searchParams.get('date') || undefined, // Will be parsed in the form component
  };
  
  return (
    <div>
      <PageHeader
        title="AI Score Prediction"
        description="Leverage AI to predict scores for IPL matches. Provide match details and optional context for enhanced accuracy."
      />
      <ScorePredictionForm initialValues={initialValues} />
    </div>
  );
}
