
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AIInsightsCard = () => {
  const insights = [
    {
      type: "optimization",
      icon: TrendingUp,
      title: "Budget Reallocation Opportunity",
      description: "Move 15% budget from Facebook to Google Ads for 22% ROAS improvement",
      confidence: 94,
      impact: "High",
      color: "green"
    },
    {
      type: "alert",
      icon: AlertTriangle,
      title: "Creative Fatigue Detected",
      description: "Ad creative #3 showing 40% CTR decline over 7 days",
      confidence: 89,
      impact: "Medium",
      color: "yellow"
    },
    {
      type: "suggestion",
      icon: Lightbulb,
      title: "New Audience Segment",
      description: "Interest-based targeting 'sustainable fashion' shows 65% higher conversion rate",
      confidence: 87,
      impact: "High",
      color: "blue"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          AI Insights
        </CardTitle>
        <CardDescription>Gemini-powered recommendations for your campaigns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  insight.color === 'green' ? 'bg-green-100 text-green-600' :
                  insight.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <Badge variant="secondary" className={`text-xs ${
                      insight.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {insight.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {insight.confidence}% confidence
                    </span>
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t">
          <Button variant="ghost" className="w-full text-sm" size="sm">
            View All Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
