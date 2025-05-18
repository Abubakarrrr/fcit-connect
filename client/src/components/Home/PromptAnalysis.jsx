import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Markdown from 'react-markdown'

export function PredictiveAnalysisTool() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysis = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    setIsLoading(true);
    setResult("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/predictive-analysis",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      setResult(data.analysis)
    } catch (error) {
      setResult("An error occurred during analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-16">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Predictive Analysis Tool
        </CardTitle>
        <CardDescription>
          Enter your query to get AI-powered predictive insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAnalysis} className="flex flex-col gap-4">
          <div className="flex w-full items-center gap-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., I am planning to build AI powered ecommerce website"
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !prompt.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing
                </>
              ) : (
                "Analyze"
              )}
            </Button>
          </div>

          {result && (
            <div 
              className={cn(
                "mt-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-opacity",
                isLoading ? "opacity-50" : "opacity-100"
              )}
            >
              <Markdown>{result}</Markdown>
              {/* <div className="whitespace-pre-line">{result}</div> */}
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Powered by Gemini Flash
      </CardFooter>
    </Card>
  );
}
