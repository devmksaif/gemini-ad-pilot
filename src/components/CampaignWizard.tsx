
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Target, DollarSign, Users, Sparkles } from "lucide-react";
import { useState } from "react";

export const CampaignWizard = () => {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: "",
    objective: "",
    budget: "",
    description: ""
  });

  const aiRecommendations = {
    budget: "$45/day",
    platforms: ["Instagram Feed", "Facebook Feed", "Google Ads"],
    audience: "Women 25-35, Fashion Interest, High Purchase Intent",
    creativeType: "Carousel with lifestyle photography"
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              AI Campaign Wizard
            </CardTitle>
            <CardDescription>
              Let AI guide you through creating an optimized campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className={`flex items-center ${num < 4 ? 'flex-1' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {num}
                  </div>
                  {num < 4 && <div className={`flex-1 h-0.5 mx-2 ${
                    step > num ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input 
                    id="campaign-name" 
                    placeholder="e.g., Summer Dress Collection 2024"
                    value={campaignData.name}
                    onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="campaign-objective">Campaign Objective</Label>
                  <Select value={campaignData.objective} onValueChange={(value) => setCampaignData({...campaignData, objective: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conversions">Conversions</SelectItem>
                      <SelectItem value="traffic">Website Traffic</SelectItem>
                      <SelectItem value="awareness">Brand Awareness</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Product/Service Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Describe what you're promoting..."
                    value={campaignData.description}
                    onChange={(e) => setCampaignData({...campaignData, description: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" disabled={step === 1} onClick={() => setStep(step - 1)}>
                Previous
              </Button>
              <Button onClick={() => setStep(step + 1)} disabled={step === 4}>
                {step === 4 ? 'Launch Campaign' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              AI Recommendations
            </CardTitle>
            <CardDescription>Based on similar successful campaigns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-sm">Recommended Budget</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{aiRecommendations.budget}</p>
              <p className="text-xs text-blue-700">Based on 127 similar campaigns</p>
            </div>

            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-green-600" />
                <span className="font-medium text-sm">Best Platforms</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {aiRecommendations.platforms.map((platform) => (
                  <Badge key={platform} variant="secondary" className="bg-green-100 text-green-700 text-xs">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-sm">Target Audience</span>
              </div>
              <p className="text-sm text-purple-700">{aiRecommendations.audience}</p>
            </div>

            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-sm">Creative Format</span>
              </div>
              <p className="text-sm text-orange-700">{aiRecommendations.creativeType}</p>
            </div>

            <Button className="w-full" variant="outline" size="sm">
              Apply All Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
