
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target, DollarSign } from "lucide-react";

export const AIRecommendationSidebar = () => {
  const recommendations = [
    {
      type: "budget",
      icon: DollarSign,
      title: "Budget Reallocation",
      description: "Move 15% budget from Facebook to Google Ads",
      impact: "+22% ROAS improvement",
      confidence: 94,
      priority: "High",
      color: "green"
    },
    {
      type: "targeting",
      icon: Target,
      title: "Audience Expansion",
      description: "Add lookalike audience based on top 5% customers",
      impact: "35% more qualified leads",
      confidence: 89,
      priority: "High",
      color: "blue"
    },
    {
      type: "creative",
      icon: Lightbulb,
      title: "Creative Refresh",
      description: "Video ads outperforming static by 45%",
      impact: "Boost CTR by 28%",
      confidence: 82,
      priority: "Medium",
      color: "purple"
    },
    {
      type: "alert",
      icon: AlertTriangle,
      title: "Performance Alert",
      description: "Campaign #3 CPA increased 40% in 3 days",
      impact: "Action needed",
      confidence: 96,
      priority: "Urgent",
      color: "red"
    }
  ];

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          AI Recommendations
        </CardTitle>
        <CardDescription>Gemini-powered insights for optimization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => {
          const IconComponent = rec.icon;
          return (
            <div key={index} className={`p-4 border rounded-lg transition-colors hover:bg-gray-50 ${
              rec.priority === 'Urgent' ? 'border-red-200 bg-red-50' : ''
            }`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  rec.color === 'green' ? 'bg-green-100 text-green-600' :
                  rec.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  rec.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <Badge variant={rec.priority === 'Urgent' ? "destructive" : rec.priority === 'High' ? "default" : "secondary"} className="text-xs">
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <p className="text-sm font-medium text-green-600 mb-2">{rec.impact}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {rec.confidence}% confidence
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
            View All Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
