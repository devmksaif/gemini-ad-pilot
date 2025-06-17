
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccountAdded: () => void;
}

export const AddAccountDialog = ({ open, onOpenChange, onAccountAdded }: AddAccountDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    platform: "",
    accountId: "",
    accountName: "",
    accessToken: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    const { error } = await supabase
      .from('ad_accounts')
      .insert({
        user_id: user.id,
        platform: formData.platform as any,
        account_id: formData.accountId,
        account_name: formData.accountName,
        access_token: formData.accessToken || undefined
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add ad account. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Ad account added successfully!"
      });
      setFormData({ platform: "", accountId: "", accountName: "", accessToken: "" });
      onAccountAdded();
      onOpenChange(false);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Ad Account</DialogTitle>
          <DialogDescription>
            Connect your advertising account to start optimizing campaigns.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select 
              value={formData.platform} 
              onValueChange={(value) => setFormData({...formData, platform: value})}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select advertising platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google_ads">Google Ads</SelectItem>
                <SelectItem value="facebook_ads">Facebook Ads</SelectItem>
                <SelectItem value="instagram_ads">Instagram Ads</SelectItem>
                <SelectItem value="linkedin_ads">LinkedIn Ads</SelectItem>
                <SelectItem value="twitter_ads">Twitter Ads</SelectItem>
                <SelectItem value="tiktok_ads">TikTok Ads</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountId">Account ID</Label>
            <Input
              id="accountId"
              value={formData.accountId}
              onChange={(e) => setFormData({...formData, accountId: e.target.value})}
              placeholder="Enter account ID"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountName">Account Name</Label>
            <Input
              id="accountName"
              value={formData.accountName}
              onChange={(e) => setFormData({...formData, accountName: e.target.value})}
              placeholder="Enter account name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessToken">Access Token (Optional)</Label>
            <Input
              id="accessToken"
              type="password"
              value={formData.accessToken}
              onChange={(e) => setFormData({...formData, accessToken: e.target.value})}
              placeholder="Enter access token"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Account"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
