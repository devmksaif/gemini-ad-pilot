
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignsService } from "@/services/firebase/campaigns";
import { Brain, Target, DollarSign, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const CampaignWizard = () => {
  const { user } = useFirebaseAuth();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: "",
    platform: "",
    objective: "",
    budgetDaily: "",
    targetCpa: "",
    targetRoas: "",
    description: ""
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!user) throw new Error("User not authenticated");
      return campaignsService.create({
        ...data,
        userId: user.id,
        adAccountId: "temp-account-id", // This would come from selected ad account
        budgetDaily: parseFloat(data.budgetDaily) || 0,
        targetCpa: parseFloat(data.targetCpa) || 0,
        targetRoas: parseFloat(data.targetRoas) || 0,
        status: 'draft' as const
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast.success("Campaign created successfully!");
      setStep(1);
      setCampaignData({
        name: "",
        platform: "",
        objective: "",
        budgetDaily: "",
        targetCpa: "",
        targetRoas: "",
        description: ""
      });
    },
    onError: (error) => {
      toast.error(`Failed to create campaign: ${error.message}`);
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    createCampaignMutation.mutate(campaignData);
  };

  const aiRecommendations = {
    budget: "Based on similar campaigns, recommended daily budget: $25-50",
    platform: "Instagram shows 23% higher engagement for your industry",
    targeting: "Lookalike audiences perform 45% better than interest-based"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Campaign Wizard
          </CardTitle>
          <CardDescription>
            Create optimized campaigns with AI-powered recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-20 h-1 mx-2 ${
                    step > s ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input
                      id="campaign-name"
                      placeholder="e.g., Summer Collection 2024"
                      value={campaignData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={campaignData.platform} onValueChange={(value) => handleInputChange('platform', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facebook_ads">Facebook</SelectItem>
                        <SelectItem value="instagram_ads">Instagram</SelectItem>
                        <SelectItem value="google_ads">Google Ads</SelectItem>
                        <SelectItem value="linkedin_ads">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="objective">Campaign Objective</Label>
                    <Select value={campaignData.objective} onValueChange={(value) => handleInputChange('objective', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select objective" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conversions">Conversions</SelectItem>
                        <SelectItem value="traffic">Traffic</SelectItem>
                        <SelectItem value="awareness">Brand Awareness</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-sm">AI Recommendations</span>
                  </div>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>• {aiRecommendations.platform}</p>
                    <p>• {aiRecommendations.targeting}</p>
                    <p>• Video creatives show 35% higher CTR</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Budget & Targeting */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="budget">Daily Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="50"
                      value={campaignData.budgetDaily}
                      onChange={(e) => handleInputChange('budgetDaily', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="target-cpa">Target CPA ($)</Label>
                    <Input
                      id="target-cpa"
                      type="number"
                      placeholder="25"
                      value={campaignData.targetCpa}
                      onChange={(e) => handleInputChange('targetCpa', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="target-roas">Target ROAS</Label>
                    <Input
                      id="target-roas"
                      type="number"
                      step="0.1"
                      placeholder="3.0"
                      value={campaignData.targetRoas}
                      onChange={(e) => handleInputChange('targetRoas', e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-sm">Budget Optimization</span>
                  </div>
                  <div className="space-y-2 text-sm text-green-700">
                    <p>• {aiRecommendations.budget}</p>
                    <p>• Start with lower budget and scale based on performance</p>
                    <p>• Expected monthly reach: 15,000-25,000 users</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Launch */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="description">Campaign Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign goals and target audience..."
                  value={campaignData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-2"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Campaign Summary</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span>{campaignData.name || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform:</span>
                      <Badge variant="outline">{campaignData.platform || "Not set"}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Objective:</span>
                      <span>{campaignData.objective || "Not set"}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Budget:</span>
                      <span>${campaignData.budgetDaily || "0"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target CPA:</span>
                      <span>${campaignData.targetCpa || "0"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target ROAS:</span>
                      <span>{campaignData.targetRoas || "0"}x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < 3 ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={createCampaignMutation.isPending}
              >
                {createCampaignMutation.isPending ? "Creating..." : "Create Campaign"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
