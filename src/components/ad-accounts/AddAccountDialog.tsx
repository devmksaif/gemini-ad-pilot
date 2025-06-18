
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adAccountsService } from "@/services/firebase/adAccounts";
import { toast } from "sonner";

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddAccountDialog = ({ open, onOpenChange }: AddAccountDialogProps) => {
  const { user } = useFirebaseAuth();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    platform: "",
    accountId: "",
    accountName: "",
    accessToken: ""
  });

  const createAccountMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!user) throw new Error("User not authenticated");
      return adAccountsService.create({
        ...data,
        userId: user.id,
        isActive: true
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ad-accounts'] });
      toast.success("Ad account connected successfully!");
      onOpenChange(false);
      setFormData({
        platform: "",
        accountId: "",
        accountName: "",
        accessToken: ""
      });
    },
    onError: (error) => {
      toast.error(`Failed to connect account: ${error.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.platform || !formData.accountId || !formData.accountName) {
      toast.error("Please fill in all required fields");
      return;
    }
    createAccountMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Ad Account</DialogTitle>
          <DialogDescription>
            Add a new advertising platform account to manage campaigns
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="platform">Platform</Label>
            <Select value={formData.platform} onValueChange={(value) => handleInputChange('platform', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facebook_ads">Facebook Ads</SelectItem>
                <SelectItem value="instagram_ads">Instagram Ads</SelectItem>
                <SelectItem value="google_ads">Google Ads</SelectItem>
                <SelectItem value="linkedin_ads">LinkedIn Ads</SelectItem>
                <SelectItem value="twitter_ads">Twitter Ads</SelectItem>
                <SelectItem value="tiktok_ads">TikTok Ads</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="account-name">Account Name</Label>
            <Input
              id="account-name"
              placeholder="My Business Account"
              value={formData.accountName}
              onChange={(e) => handleInputChange('accountName', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="account-id">Account ID</Label>
            <Input
              id="account-id"
              placeholder="123456789"
              value={formData.accountId}
              onChange={(e) => handleInputChange('accountId', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="access-token">Access Token (Optional)</Label>
            <Input
              id="access-token"
              type="password"
              placeholder="Your platform access token"
              value={formData.accessToken}
              onChange={(e) => handleInputChange('accessToken', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Required for automated campaign management
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createAccountMutation.isPending}
            >
              {createAccountMutation.isPending ? "Connecting..." : "Connect Account"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
