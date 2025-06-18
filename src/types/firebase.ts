
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdAccount {
  id: string;
  userId: string;
  platform: 'google_ads' | 'facebook_ads' | 'instagram_ads' | 'linkedin_ads' | 'twitter_ads' | 'tiktok_ads';
  accountId: string;
  accountName: string;
  accessToken?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Campaign {
  id: string;
  userId: string;
  adAccountId: string;
  name: string;
  platform: 'google_ads' | 'facebook_ads' | 'instagram_ads' | 'linkedin_ads' | 'twitter_ads' | 'tiktok_ads';
  platformCampaignId?: string;
  objective?: string;
  budgetDaily?: number;
  budgetTotal?: number;
  targetCpa?: number;
  targetRoas?: number;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignPerformance {
  id: string;
  campaignId: string;
  date: Date;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roas: number;
  createdAt: Date;
}

export interface AutomationRule {
  id: string;
  userId: string;
  campaignId?: string;
  name: string;
  ruleType: 'budget' | 'targeting' | 'creative' | 'bidding';
  conditions: Record<string, any>;
  actions: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIInsight {
  id: string;
  userId: string;
  campaignId?: string;
  title: string;
  description: string;
  recommendation: string;
  insightType: 'budget' | 'targeting' | 'creative' | 'bidding';
  confidenceScore?: number;
  potentialImpact?: string;
  isImplemented: boolean;
  createdAt: Date;
}
