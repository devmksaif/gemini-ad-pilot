
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Target, Brain } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getCampaigns } from '@/services/firebase/campaigns';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

export const DashboardStats = () => {
  const { user } = useFirebaseAuth();
  
  const { data: campaigns } = useQuery({
    queryKey: ['campaigns', user?.id],
    queryFn: () => user ? getCampaigns(user.id) : Promise.resolve([]),
    enabled: !!user?.id
  });

  // Mock performance data for now - in real app this would come from Firebase
  const mockStats = {
    roas: 4.2,
    avgCpa: 23.50,
    conversions: 1247,
    aiScore: 92
  };

  const statsData = [
    {
      title: 'Total ROAS',
      value: `${mockStats.roas.toFixed(1)}x`,
      change: '+12% vs last month',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Avg CPA',
      value: `$${mockStats.avgCpa.toFixed(2)}`,
      change: '-8% vs last month',
      icon: DollarSign,
      color: 'text-gray-900'
    },
    {
      title: 'Conversions',
      value: mockStats.conversions.toLocaleString(),
      change: '+23% vs last month',
      icon: Target,
      color: 'text-gray-900'
    },
    {
      title: 'AI Score',
      value: `${mockStats.aiScore}/100`,
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
