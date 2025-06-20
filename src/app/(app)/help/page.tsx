import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function HelpPage() {
  return (
    <div>
      <PageHeader
        title="Help & FAQ"
        description="Find answers to common questions about IPL Forecaster."
      />
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Get help with using the app and understanding its features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-headline">How does the AI prediction work?</AccordionTrigger>
              <AccordionContent>
                Our AI uses machine learning models that analyze historical match data, player statistics, team form, venue specifics, and other relevant factors to generate predictions. The more contextual data provided, the better the potential accuracy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-headline">Is the prediction 100% accurate?</AccordionTrigger>
              <AccordionContent>
                No, cricket is an unpredictable sport, and AI predictions are not guarantees. They are based on statistical probabilities and historical trends. Always consider them as one of many factors.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-headline">Where does the historical data come from?</AccordionTrigger>
              <AccordionContent>
                The app uses mock historical data for demonstration purposes. In a real-world scenario, this data would be sourced from reputable sports statistics providers.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger className="font-headline">Can I use this app for actual betting?</AccordionTrigger>
              <AccordionContent>
                No, IPL Forecaster is for informational and entertainment purposes only. It does not facilitate or endorse any form of betting or gambling. The list of betting sites is for odds comparison reference only.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
