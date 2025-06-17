
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Settings, TrendingUp, Target, DollarSign, Zap } from 'lucide-react';

export const AutomationRules = () => {
  const { data: rules, isLoading } = useQuery({
    queryKey: ['automation-rules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automation_rules')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
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

  const mockRules = [
    {
      id: '1',
      name: 'Auto Budget Scaling',
      rule_type: 'budget',
      conditions: { roas: { greater_than: 3.0 } },
      actions: { increase_budget: 20 },
      is_active: true,
      description: 'Increase budget by 20% when ROAS > 3.0'
    },
    {
      id: '2', 
      name: 'Creative Rotation',
      rule_type: 'creative',
      conditions: { ctr: { less_than: 1 }, impressions: { greater_than: 1000 } },
      actions: { pause_ad: true },
      is_active: true,
      description: 'Pause ads with CTR < 1% after 1000 impressions'
    },
    {
      id: '3',
      name: 'Bid Optimization',
      rule_type: 'bidding',
      conditions: { cpa: { greater_than: 50 } },
      actions: { decrease_bid: 10 },
      is_active: false,
      description: 'Decrease bid by 10% when CPA > $50'
    }
  ];

  const displayRules = rules || mockRules;

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
              const IconComponent = getRuleIcon(rule.rule_type);
              return (
                <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{rule.name}</h4>
                        <Badge variant={rule.is_active ? "default" : "secondary"}>
                          {rule.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {rule.description || 'Custom automation rule'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch checked={rule.is_active} />
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
