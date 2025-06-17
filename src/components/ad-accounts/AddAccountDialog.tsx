
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddAccountDialog = ({ open, onOpenChange }: AddAccountDialogProps) => {
  const [platform, setPlatform] = useState('');
  const [accountId, setAccountId] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addAccountMutation = useMutation({
    mutationFn: async (data: {
      platform: string;
      account_id: string;
      account_name: string;
      access_token?: string;
    }) => {
      const { error } = await supabase
        .from('ad_accounts')
        .insert([data]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ad-accounts'] });
      toast({
        title: "Account connected",
        description: "Your ad account has been successfully connected.",
      });
      onOpenChange(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to connect ad account. Please check your credentials.",
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setPlatform('');
    setAccountId('');
    setAccountName('');
    setAccessToken('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAccountMutation.mutate({
      platform,
      account_id: accountId,
      account_name: accountName,
      access_token: accessToken || undefined
    });
  };

  const platforms = [
    { value: 'google_ads', label: 'Google Ads', icon: '🎯' },
    { value: 'facebook_ads', label: 'Facebook Ads', icon: '📘' },
    { value: 'instagram_ads', label: 'Instagram Ads', icon: '📷' },
    { value: 'linkedin_ads', label: 'LinkedIn Ads', icon: '💼' },
    { value: 'twitter_ads', label: 'Twitter Ads', icon: '🐦' },
    { value: 'tiktok_ads', label: 'TikTok Ads', icon: '🎵' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Ad Account</DialogTitle>
          <DialogDescription>
            Add a new advertising platform account to manage with AI optimization
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="platform">Platform</Label>
            <Select value={platform} onValueChange={setPlatform} required>
              <SelectTrigger>
                <SelectValue placeholder="Select advertising platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    <div className="flex items-center gap-2">
                      <span>{p.icon}</span>
                      {p.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="account-name">Account Name</Label>
            <Input
              id="account-name"
              placeholder="Enter a name for this account"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="account-id">Account ID</Label>
            <Input
              id="account-id"
              placeholder="Enter your account ID"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="access-token">Access Token (Optional)</Label>
            <Input
              id="access-token"
              type="password"
              placeholder="Enter your API access token"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Required for full API integration and automated optimizations
            </p>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={addAccountMutation.isPending}>
              {addAccountMutation.isPending ? 'Connecting...' : 'Connect Account'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
