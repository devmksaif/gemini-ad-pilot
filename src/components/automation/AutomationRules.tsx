
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useQuery } from '@tanstack/react-query';
import { getAutomationRules } from '@/services/firebase/automationRules';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { Plus, Settings, TrendingUp, Target, DollarSign, Zap } from 'lucide-react';
import { AutomationRule } from '@/types/firebase';

export const AutomationRules = () => {
  const { user } = useFirebaseAuth();
  
  const { data: rules, isLoading } = useQuery({
    queryKey: ['automation-rules', user?.id],
    queryFn: () => user ? getAutomationRules(user.id) : Promise.resolve([]),
    enabled: !!user?.id
  });

  const getRuleIcon = (ruleType: string) => {
    switch (ruleType) {
      case 'budget': return DollarSign;
      case 'targeting': return Target;
      case 'creative': return Zap;
      case 'bidding': return TrendingUp;
      default: return Settings;
    }
  };

  const mockRules: AutomationRule[] = [
    {
      id: '1',
      userId: user?.id || '',
      name: 'Auto Budget Scaling',
      ruleType: 'budget',
      conditions: { roas: { greaterThan: 3.0 } },
      actions: { increaseBudget: 20 },
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      userId: user?.id || '',
      name: 'Creative Rotation',
      ruleType: 'creative',
      conditions: { ctr: { lessThan: 1 }, impressions: { greaterThan: 1000 } },
      actions: { pauseAd: true },
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      userId: user?.id || '',
      name: 'Bid Optimization',
      ruleType: 'bidding',
      conditions: { cpa: { greaterThan: 50 } },
      actions: { decreaseBid: 10 },
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const displayRules: AutomationRule[] = rules && rules.length > 0 ? rules : mockRules;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading automation rules...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Automation Rules</CardTitle>
            <CardDescription>
              Set up intelligent rules for campaign optimization
            </CardDescription>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Rule
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {displayRules.length > 0 ? (
          <div className="space-y-4">
            {displayRules.map((rule) => {
              const IconComponent = getRuleIcon(rule.ruleType);
              return (
                <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{rule.name}</h4>
                        <Badge variant={rule.isActive ? "default" : "secondary"}>
                          {rule.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {rule.ruleType === 'budget' && 'Increase budget by 20% when ROAS > 3.0'}
                        {rule.ruleType === 'creative' && 'Pause ads with CTR < 1% after 1000 impressions'}
                        {rule.ruleType === 'bidding' && 'Decrease bid by 10% when CPA > $50'}
                        {rule.ruleType === 'targeting' && 'Custom automation rule'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch checked={rule.isActive} />
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-lg font-medium mb-2">No Automation Rules</h3>
            <p className="text-gray-600 mb-6">
              Create intelligent automation rules to optimize your campaigns automatically
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Rule
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
