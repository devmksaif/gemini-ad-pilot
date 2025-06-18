
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { adAccountsService } from "@/services/firebase/adAccounts";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { Plus, Link, ExternalLink, Settings } from "lucide-react";
import { AddAccountDialog } from "./AddAccountDialog";
import { useState } from "react";

export const AdAccountsManager = () => {
  const { user } = useFirebaseAuth();
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const { data: adAccounts, isLoading } = useQuery({
    queryKey: ['ad-accounts', user?.id],
    queryFn: () => user ? adAccountsService.getAll(user.id) : Promise.resolve([]),
    enabled: !!user?.id
  });

  const getPlatformIcon = (platform: string) => {
    // Return appropriate platform icon/emoji
    switch (platform) {
      case 'facebook_ads': return '📘';
      case 'instagram_ads': return '📷';
      case 'google_ads': return '🔍';
      case 'linkedin_ads': return '💼';
      case 'twitter_ads': return '🐦';
      case 'tiktok_ads': return '🎵';
      default: return '📊';
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'facebook_ads': return 'Facebook Ads';
      case 'instagram_ads': return 'Instagram Ads';
      case 'google_ads': return 'Google Ads';
      case 'linkedin_ads': return 'LinkedIn Ads';
      case 'twitter_ads': return 'Twitter Ads';
      case 'tiktok_ads': return 'TikTok Ads';
      default: return platform;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ad Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading ad accounts...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5 text-blue-600" />
                Connected Ad Accounts
              </CardTitle>
              <CardDescription>
                Manage your advertising platform connections
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Connect Account
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {adAccounts && adAccounts.length > 0 ? (
            <div className="space-y-4">
              {adAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {getPlatformIcon(account.platform)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{account.accountName}</h4>
                        <Badge variant={account.isActive ? "default" : "secondary"}>
                          {account.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {getPlatformName(account.platform)} • ID: {account.accountId}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔗</div>
              <h3 className="text-lg font-medium mb-2">No Connected Accounts</h3>
              <p className="text-gray-600 mb-6">
                Connect your advertising accounts to start managing campaigns
              </p>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Connect Your First Account
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AddAccountDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </>
  );
};
