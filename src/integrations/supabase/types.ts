export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ad_accounts: {
        Row: {
          access_token: string | null
          account_id: string
          account_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          platform: Database["public"]["Enums"]["platform_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          account_id: string
          account_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          platform: Database["public"]["Enums"]["platform_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          account_id?: string
          account_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          platform?: Database["public"]["Enums"]["platform_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_insights: {
        Row: {
          campaign_id: string | null
          confidence_score: number | null
          created_at: string | null
          description: string
          id: string
          insight_type: Database["public"]["Enums"]["optimization_type"]
          is_implemented: boolean | null
          potential_impact: string | null
          recommendation: string
          title: string
          user_id: string
        }
        Insert: {
          campaign_id?: string | null
          confidence_score?: number | null
          created_at?: string | null
          description: string
          id?: string
          insight_type: Database["public"]["Enums"]["optimization_type"]
          is_implemented?: boolean | null
          potential_impact?: string | null
          recommendation: string
          title: string
          user_id: string
        }
        Update: {
          campaign_id?: string | null
          confidence_score?: number | null
          created_at?: string | null
          description?: string
          id?: string
          insight_type?: Database["public"]["Enums"]["optimization_type"]
          is_implemented?: boolean | null
          potential_impact?: string | null
          recommendation?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_insights_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          actions: Json
          campaign_id: string | null
          conditions: Json
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          rule_type: Database["public"]["Enums"]["optimization_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actions: Json
          campaign_id?: string | null
          conditions: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          rule_type: Database["public"]["Enums"]["optimization_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actions?: Json
          campaign_id?: string | null
          conditions?: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          rule_type?: Database["public"]["Enums"]["optimization_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_rules_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_performance: {
        Row: {
          campaign_id: string
          clicks: number | null
          conversions: number | null
          cpa: number | null
          cpc: number | null
          created_at: string | null
          ctr: number | null
          date: string
          id: string
          impressions: number | null
          revenue: number | null
          roas: number | null
          spend: number | null
        }
        Insert: {
          campaign_id: string
          clicks?: number | null
          conversions?: number | null
          cpa?: number | null
          cpc?: number | null
          created_at?: string | null
          ctr?: number | null
          date: string
          id?: string
          impressions?: number | null
          revenue?: number | null
          roas?: number | null
          spend?: number | null
        }
        Update: {
          campaign_id?: string
          clicks?: number | null
          conversions?: number | null
          cpa?: number | null
          cpc?: number | null
          created_at?: string | null
          ctr?: number | null
          date?: string
          id?: string
          impressions?: number | null
          revenue?: number | null
          roas?: number | null
          spend?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_performance_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          ad_account_id: string
          budget_daily: number | null
          budget_total: number | null
          created_at: string | null
          end_date: string | null
          id: string
          name: string
          objective: string | null
          platform: Database["public"]["Enums"]["platform_type"]
          platform_campaign_id: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["campaign_status"] | null
          target_cpa: number | null
          target_roas: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ad_account_id: string
          budget_daily?: number | null
          budget_total?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          name: string
          objective?: string | null
          platform: Database["public"]["Enums"]["platform_type"]
          platform_campaign_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["campaign_status"] | null
          target_cpa?: number | null
          target_roas?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ad_account_id?: string
          budget_daily?: number | null
          budget_total?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          name?: string
          objective?: string | null
          platform?: Database["public"]["Enums"]["platform_type"]
          platform_campaign_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["campaign_status"] | null
          target_cpa?: number | null
          target_roas?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_ad_account_id_fkey"
            columns: ["ad_account_id"]
            isOneToOne: false
            referencedRelation: "ad_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          name: string | null
          subscription_tier: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id: string
          name?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "content_mod" | "support" | "user"
      campaign_status: "draft" | "active" | "paused" | "completed"
      optimization_type: "budget" | "targeting" | "creative" | "bidding"
      platform_type:
        | "google_ads"
        | "facebook_ads"
        | "instagram_ads"
        | "linkedin_ads"
        | "twitter_ads"
        | "tiktok_ads"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin", "content_mod", "support", "user"],
      campaign_status: ["draft", "active", "paused", "completed"],
      optimization_type: ["budget", "targeting", "creative", "bidding"],
      platform_type: [
        "google_ads",
        "facebook_ads",
        "instagram_ads",
        "linkedin_ads",
        "twitter_ads",
        "tiktok_ads",
      ],
    },
  },
} as const
