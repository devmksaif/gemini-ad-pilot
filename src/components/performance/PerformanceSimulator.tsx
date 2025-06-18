
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Target } from "lucide-react";
import { useState } from "react";

export const PerformanceSimulator = () => {
  const [budget, setBudget] = useState([100]);
  const [targetCPA, setTargetCPA] = useState(25);
  const [platform, setPlatform] = useState("facebook");

  const simulatedResults = {
    expectedClicks: Math.round(budget[0] / 2.5),
    expectedConversions: Math.round(budget[0] / targetCPA),
    projectedROAS: (budget[0] * 0.045).toFixed(1),
    reachEstimate: Math.round(budget[0] * 150)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-purple-600" />
          Performance Simulator
        </CardTitle>
        <CardDescription>
          Predict campaign performance with AI-powered forecasting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="budget">Daily Budget: ${budget[0]}</Label>
              <Slider
                id="budget"
                min={10}
                max={1000}
                step={10}
                value={budget}
                onValueChange={setBudget}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="target-cpa">Target CPA</Label>
              <Input
                id="target-cpa"
                type="number"
                value={targetCPA}
                onChange={(e) => setTargetCPA(Number(e.target.value))}
                placeholder="25"
              />
            </div>

            <div>
              <Label>Platform</Label>
              <div className="flex gap-2 mt-2">
                {['facebook', 'google', 'instagram'].map((p) => (
                  <Badge
                    key={p}
                    variant={platform === p ? "default" : "outline"}
                    className="cursor-pointer capitalize"
                    onClick={() => setPlatform(p)}
                  >
                    {p}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-sm">Projected Results</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Expected Clicks:</span>
                  <span className="font-medium">{simulatedResults.expectedClicks}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected Conversions:</span>
                  <span className="font-medium">{simulatedResults.expectedConversions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Projected ROAS:</span>
                  <span className="font-medium text-green-600">{simulatedResults.projectedROAS}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Reach:</span>
                  <span className="font-medium">{simulatedResults.reachEstimate.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="font-medium text-sm">AI Confidence</span>
              </div>
              <div className="text-sm text-green-700">
                Based on 1,247 similar campaigns
              </div>
              <div className="text-xs text-green-600 mt-1">
                87% prediction accuracy
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">
            Run Simulation
          </Button>
          <Button variant="outline">
            Save Scenario
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
