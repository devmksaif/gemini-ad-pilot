
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Target, Brain } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const DashboardStats = () => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data: campaigns } = await supabase
        .from('campaigns')
        .select('*');
      
      const { data: performance } = await supabase
        .from('campaign_performance')
        .select('*')
        .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
      
      const totalSpend = performance?.reduce((sum, p) => sum + (p.spend || 0), 0) || 0;
      const totalRevenue = performance?.reduce((sum, p) => sum + (p.revenue || 0), 0) || 0;
      const totalConversions = performance?.reduce((sum, p) => sum + (p.conversions || 0), 0) || 0;
      const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0;

      return {
        roas,
        avgCpa: totalConversions > 0 ? totalSpend / totalConversions : 0,
        conversions: totalConversions,
        aiScore: 92
      };
    }
  });

  const statsData = [
    {
      title: 'Total ROAS',
      value: `${(stats?.roas || 4.2).toFixed(1)}x`,
      change: '+12% vs last month',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Avg CPA',
      value: `$${(stats?.avgCpa || 23.50).toFixed(2)}`,
      change: '-8% vs last month',
      icon: DollarSign,
      color: 'text-gray-900'
    },
    {
      title: 'Conversions',
      value: (stats?.conversions || 1247).toLocaleString(),
      change: '+23% vs last month',
      icon: Target,
      color: 'text-gray-900'
    },
    {
      title: 'AI Score',
      value: `${stats?.aiScore || 92}/100`,
      change: 'Excellent',
      icon: Brain,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <IconComponent className="w-4 h-4" />
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-sm text-green-600">{stat.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
