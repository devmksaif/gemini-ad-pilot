
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertTriangle, Target } from "lucide-react";

export const AIInsightsCard = () => {
  const insights = [
    {
      type: "optimization",
      title: "Budget Optimization",
      description: "Reallocate 20% budget from Facebook to Google Ads for better ROAS",
      impact: "+15% ROAS improvement",
      confidence: 92,
      priority: "High"
    },
    {
      type: "alert",
      title: "Performance Alert",
      description: "Campaign 'Summer Collection' CPA increased 35% in last 3 days",
      impact: "Immediate action needed",
      confidence: 96,
      priority: "Urgent"
    },
    {
      type: "creative",
      title: "Creative Refresh",
      description: "Video ads showing 45% higher engagement than static images",
      impact: "Switch to video format",
      confidence: 88,
      priority: "Medium"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "optimization": return TrendingUp;
      case "alert": return AlertTriangle;
      case "creative": return Target;
      default: return Brain;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent": return "destructive";
      case "High": return "default";
      case "Medium": return "secondary";
      default: return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          AI Insights
        </CardTitle>
        <CardDescription>Powered by Gemini AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const IconComponent = getIcon(insight.type);
          return (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-blue-600" />
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                </div>
                <Badge variant={getPriorityColor(insight.priority) as any}>
                  {insight.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
              <p className="text-sm font-medium text-green-600">{insight.impact}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {insight.confidence}% confidence
                </span>
                <Button size="sm" variant="outline" className="text-xs">
                  Apply
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
