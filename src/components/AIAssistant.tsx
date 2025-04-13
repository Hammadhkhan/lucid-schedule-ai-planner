
import { useState } from 'react';
import { Task, AIFeedback } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, BarChart3, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getAIFeedback as fetchAIFeedback } from '@/services/ai-service';
import { toast } from "sonner";
import { formatDate } from '@/utils/date-utils';

interface AIAssistantProps {
  tasks: Task[];
}

const AIAssistant = ({ tasks }: AIAssistantProps) => {
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleGetSuggestions = async () => {
    try {
      setLoading(true);
      const result = await fetchAIFeedback(tasks);
      setFeedback(result);
      toast.success("AI suggestions generated!");
    } catch (error) {
      console.error("Error getting AI feedback:", error);
      toast.error("Failed to generate AI suggestions");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI Assistant
        </CardTitle>
        <CardDescription>
          Get intelligent suggestions to improve your planning
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {feedback ? (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Smart Suggestions
              </h4>
              <ul className="text-sm space-y-2">
                {feedback.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-500" />
                Day Summary
              </h4>
              <p className="text-sm">{feedback.daySummary}</p>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-muted-foreground">
            <p className="mb-2">
              Get AI-powered suggestions to improve your task planning and a summary of your day.
            </p>
            <p className="text-sm">
              Click the button below to generate suggestions based on your current tasks.
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleGetSuggestions}
          disabled={loading || tasks.length === 0}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing your tasks...
            </>
          ) : (
            feedback ? "Refresh Suggestions" : "Get AI Suggestions"
          )}
        </Button>
      </CardFooter>
      
      {feedback && (
        <div className="px-6 pb-4 text-xs text-muted-foreground">
          Last updated: {formatDate(feedback.timestamp)}
        </div>
      )}
    </Card>
  );
};

export default AIAssistant;
