
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { Header } from '@/components/Header';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { CampaignsList } from '@/components/campaigns/CampaignsList';
import { AIInsightsCard } from '@/components/AIInsightsCard';
import { PerformanceChart } from '@/components/PerformanceChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CampaignWizard } from '@/components/CampaignWizard';
import { AdAccountsManager } from '@/components/ad-accounts/AdAccountsManager';
import { AutomationRules } from '@/components/automation/AutomationRules';
import { BarChart3, Target, Brain, Settings, Link } from 'lucide-react';

const Dashboard = () => {
  const { user } = useFirebaseAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="pt-20 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.name || user.email}
            </h1>
            <p className="text-gray-600">Manage your AI-powered advertising campaigns</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="accounts" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                Ad Accounts
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Insights
              </TabsTrigger>
              <TabsTrigger value="automation" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Automation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <DashboardStats />
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <PerformanceChart />
                </div>
                <div>
                  <AIInsightsCard />
                </div>
              </div>
              <CampaignsList />
            </TabsContent>

            <TabsContent value="campaigns">
              <CampaignWizard />
            </TabsContent>

            <TabsContent value="accounts">
              <AdAccountsManager />
            </TabsContent>

            <TabsContent value="insights">
              <div className="grid md:grid-cols-2 gap-6">
                <AIInsightsCard />
                <AIInsightsCard />
              </div>
            </TabsContent>

            <TabsContent value="automation">
              <AutomationRules />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
