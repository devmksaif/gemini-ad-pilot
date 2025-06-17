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
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          permissions: Json | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          permissions?: Json | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          permissions?: Json | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_participants: {
        Row: {
          created_at: string | null
          id: string
          meeting_id: string | null
          participant_id: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          meeting_id?: string | null
          participant_id: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          meeting_id?: string | null
          participant_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meeting_participants_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "scheduled_meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meeting_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      reported_posts: {
        Row: {
          created_at: string | null
          id: string
          post_id: number
          reason: string
          reported_by: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: number
          reason: string
          reported_by: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: number
          reason?: string
          reported_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "reported_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "users_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reported_posts_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_meetings: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          duration_minutes: number
          id: string
          meeting_code: string
          scheduled_date: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          duration_minutes?: number
          id?: string
          meeting_code: string
          scheduled_date: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          meeting_code?: string
          scheduled_date?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_meetings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      users_auth: {
        Row: {
          avatar: string | null
          bio: string | null
          cc: string | null
          chat_timer: number | null
          confirmed: boolean | null
          created_at: string
          email: string
          first_time_ad: boolean | null
          followers: number | null
          following: number | null
          id: string
          last_name: string | null
          locale: string | null
          name: string | null
          phone_number: string | null
          verified_profile: boolean | null
          website: string | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          cc?: string | null
          chat_timer?: number | null
          confirmed?: boolean | null
          created_at?: string
          email: string
          first_time_ad?: boolean | null
          followers?: number | null
          following?: number | null
          id: string
          last_name?: string | null
          locale?: string | null
          name?: string | null
          phone_number?: string | null
          verified_profile?: boolean | null
          website?: string | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          cc?: string | null
          chat_timer?: number | null
          confirmed?: boolean | null
          created_at?: string
          email?: string
          first_time_ad?: boolean | null
          followers?: number | null
          following?: number | null
          id?: string
          last_name?: string | null
          locale?: string | null
          name?: string | null
          phone_number?: string | null
          verified_profile?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      users_calls: {
        Row: {
          call_type: string | null
          created_at: string | null
          duration: number | null
          end_time: string | null
          from_user_id: string
          id: string
          last_heartbeat: string | null
          reject_reason: string | null
          rtc_session_data: Json | null
          session_id: string | null
          start_time: string | null
          status: string
          to_user_id: string
          updated_at: string | null
        }
        Insert: {
          call_type?: string | null
          created_at?: string | null
          duration?: number | null
          end_time?: string | null
          from_user_id: string
          id?: string
          last_heartbeat?: string | null
          reject_reason?: string | null
          rtc_session_data?: Json | null
          session_id?: string | null
          start_time?: string | null
          status: string
          to_user_id: string
          updated_at?: string | null
        }
        Update: {
          call_type?: string | null
          created_at?: string | null
          duration?: number | null
          end_time?: string | null
          from_user_id?: string
          id?: string
          last_heartbeat?: string | null
          reject_reason?: string | null
          rtc_session_data?: Json | null
          session_id?: string | null
          start_time?: string | null
          status?: string
          to_user_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_calls_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_calls_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      users_comments: {
        Row: {
          comment: string
          created_at: string
          id: number
          liked_by: string[] | null
          likes: number | null
          post_id: number
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: number
          liked_by?: string[] | null
          likes?: number | null
          post_id: number
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: number
          liked_by?: string[] | null
          likes?: number | null
          post_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "users_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      users_followers: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: number
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: number
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_followers_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_followers_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      users_interactions_posts: {
        Row: {
          created_at: string
          id: number
          liked: boolean | null
          liked_by: string
          post_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          liked?: boolean | null
          liked_by: string
          post_id: number
        }
        Update: {
          created_at?: string
          id?: number
          liked?: boolean | null
          liked_by?: string
          post_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_interactions_posts_liked_by_fkey"
            columns: ["liked_by"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_interactions_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "users_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      users_messaging: {
        Row: {
          audio: boolean | null
          created_at: string
          file_metadata: Json | null
          id: number
          is_file: boolean | null
          is_reply: boolean | null
          last_message: string | null
          msg: string | null
          receiver: string | null
          reply_to: string | null
          seen: boolean | null
          sender: string | null
        }
        Insert: {
          audio?: boolean | null
          created_at?: string
          file_metadata?: Json | null
          id?: number
          is_file?: boolean | null
          is_reply?: boolean | null
          last_message?: string | null
          msg?: string | null
          receiver?: string | null
          reply_to?: string | null
          seen?: boolean | null
          sender?: string | null
        }
        Update: {
          audio?: boolean | null
          created_at?: string
          file_metadata?: Json | null
          id?: number
          is_file?: boolean | null
          is_reply?: boolean | null
          last_message?: string | null
          msg?: string | null
          receiver?: string | null
          reply_to?: string | null
          seen?: boolean | null
          sender?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_messaging_receiver_fkey"
            columns: ["receiver"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_messaging_sender_fkey"
            columns: ["sender"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      users_posts: {
        Row: {
          comments: number | null
          created_at: string
          id: number
          is_premium: boolean | null
          likes: number | null
          post_content: string
          post_id: number | null
          post_storage: string | null
          share_quote: string | null
          shared_at: string | null
          shared_by: string | null
          shares: number | null
          soundcloud_track: Json | null
          type: string | null
          user_id: string
          views: number | null
        }
        Insert: {
          comments?: number | null
          created_at?: string
          id?: number
          is_premium?: boolean | null
          likes?: number | null
          post_content: string
          post_id?: number | null
          post_storage?: string | null
          share_quote?: string | null
          shared_at?: string | null
          shared_by?: string | null
          shares?: number | null
          soundcloud_track?: Json | null
          type?: string | null
          user_id: string
          views?: number | null
        }
        Update: {
          comments?: number | null
          created_at?: string
          id?: number
          is_premium?: boolean | null
          likes?: number | null
          post_content?: string
          post_id?: number | null
          post_storage?: string | null
          share_quote?: string | null
          shared_at?: string | null
          shared_by?: string | null
          shares?: number | null
          soundcloud_track?: Json | null
          type?: string | null
          user_id?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "users_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "users_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_posts_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      users_reels: {
        Row: {
          caption: string | null
          comments: number | null
          created_at: string
          id: number
          is_active: boolean | null
          likes: number | null
          music: string | null
          shares: number | null
          thumbnail_url: string | null
          user_id: string
          video_url: string
          views: number | null
        }
        Insert: {
          caption?: string | null
          comments?: number | null
          created_at?: string
          id?: number
          is_active?: boolean | null
          likes?: number | null
          music?: string | null
          shares?: number | null
          thumbnail_url?: string | null
          user_id: string
          video_url: string
          views?: number | null
        }
        Update: {
          caption?: string | null
          comments?: number | null
          created_at?: string
          id?: number
          is_active?: boolean | null
          likes?: number | null
          music?: string | null
          shares?: number | null
          thumbnail_url?: string | null
          user_id?: string
          video_url?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "users_reels_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      users_saved_posts: {
        Row: {
          created_at: string | null
          id: number
          post_id: number
          saved_by: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          post_id: number
          saved_by: string
        }
        Update: {
          created_at?: string | null
          id?: number
          post_id?: number
          saved_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_saved_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "users_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_saved_posts_saved_by_fkey"
            columns: ["saved_by"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      users_subscription: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          plan_type: string | null
          start_date: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          plan_type?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          plan_type?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_subscription_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
      }
      users_token: {
        Row: {
          created_at: string
          dark_mode: boolean | null
          fcm_token: string | null
          id: number
          notifications: boolean | null
          token: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          dark_mode?: boolean | null
          fcm_token?: string | null
          id?: number
          notifications?: boolean | null
          token?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          dark_mode?: boolean | null
          fcm_token?: string | null
          id?: number
          notifications?: boolean | null
          token?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_token_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_auth"
            referencedColumns: ["id"]
          },
        ]
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
    },
  },
} as const
