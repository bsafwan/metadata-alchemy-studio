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
      chat_users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          session_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          session_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          session_id?: string
        }
        Relationships: []
      }
      conversation_messages: {
        Row: {
          attachments: Json | null
          conversation_id: string
          created_at: string
          id: string
          message_content: string
          sender_email: string
          sender_name: string
          sender_type: string
        }
        Insert: {
          attachments?: Json | null
          conversation_id: string
          created_at?: string
          id?: string
          message_content: string
          sender_email: string
          sender_name: string
          sender_type: string
        }
        Update: {
          attachments?: Json | null
          conversation_id?: string
          created_at?: string
          id?: string
          message_content?: string
          sender_email?: string
          sender_name?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          project_id: string
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_conversations_project_id"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_inquiries: {
        Row: {
          company_name: string
          created_at: string
          crm_needs: string
          email: string
          id: string
          phone: string
        }
        Insert: {
          company_name: string
          created_at?: string
          crm_needs: string
          email: string
          id?: string
          phone: string
        }
        Update: {
          company_name?: string
          created_at?: string
          crm_needs?: string
          email?: string
          id?: string
          phone?: string
        }
        Relationships: []
      }
      demos: {
        Row: {
          created_at: string
          created_by: string | null
          demo_files: Json | null
          demo_type: string
          demo_url: string | null
          description: string | null
          file_path: string | null
          id: string
          is_active: boolean | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          demo_files?: Json | null
          demo_type: string
          demo_url?: string | null
          description?: string | null
          file_path?: string | null
          id?: string
          is_active?: boolean | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          demo_files?: Json | null
          demo_type?: string
          demo_url?: string | null
          description?: string | null
          file_path?: string | null
          id?: string
          is_active?: boolean | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          id: string
          message_type: string
          project_id: string | null
          recipient_email: string
          sender_email: string
          sent_at: string
          user_id: string
        }
        Insert: {
          content: string
          id?: string
          message_type: string
          project_id?: string | null
          recipient_email: string
          sender_email: string
          sent_at?: string
          user_id: string
        }
        Update: {
          content?: string
          id?: string
          message_type?: string
          project_id?: string | null
          recipient_email?: string
          sender_email?: string
          sent_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      phase_payments: {
        Row: {
          admin_notes: string | null
          amount: number
          created_at: string
          due_date: string | null
          id: string
          invoice_pdf_path: string | null
          is_automatic: boolean | null
          paid_at: string | null
          payment_channel: string | null
          payment_date: string | null
          payment_instructions_sent_at: string | null
          payment_method: string | null
          payoneer_link: string | null
          phase_id: string
          project_id: string
          reference_number: string | null
          status: string
          submitted_at: string | null
          transaction_id: string | null
          updated_at: string
          user_bank_details: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_pdf_path?: string | null
          is_automatic?: boolean | null
          paid_at?: string | null
          payment_channel?: string | null
          payment_date?: string | null
          payment_instructions_sent_at?: string | null
          payment_method?: string | null
          payoneer_link?: string | null
          phase_id: string
          project_id: string
          reference_number?: string | null
          status?: string
          submitted_at?: string | null
          transaction_id?: string | null
          updated_at?: string
          user_bank_details?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_pdf_path?: string | null
          is_automatic?: boolean | null
          paid_at?: string | null
          payment_channel?: string | null
          payment_date?: string | null
          payment_instructions_sent_at?: string | null
          payment_method?: string | null
          payoneer_link?: string | null
          phase_id?: string
          project_id?: string
          reference_number?: string | null
          status?: string
          submitted_at?: string | null
          transaction_id?: string | null
          updated_at?: string
          user_bank_details?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phase_payments_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: true
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "phase_payments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      previews: {
        Row: {
          approved_at: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          phase_id: string
          preview_files: Json | null
          project_id: string
          status: string
          title: string
          updated_at: string
          uploaded_files: Json | null
          user_feedback: string | null
        }
        Insert: {
          approved_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          phase_id: string
          preview_files?: Json | null
          project_id: string
          status?: string
          title: string
          updated_at?: string
          uploaded_files?: Json | null
          user_feedback?: string | null
        }
        Update: {
          approved_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          phase_id?: string
          preview_files?: Json | null
          project_id?: string
          status?: string
          title?: string
          updated_at?: string
          uploaded_files?: Json | null
          user_feedback?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "previews_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "previews_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_negotiations: {
        Row: {
          created_at: string
          id: string
          message: string | null
          phase_id: string
          proposed_by: string
          proposed_price: number
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          phase_id: string
          proposed_by: string
          proposed_price: number
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          phase_id?: string
          proposed_by?: string
          proposed_price?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "pricing_negotiations_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
        ]
      }
      project_phases: {
        Row: {
          admin_proposed_price: number | null
          created_at: string
          final_agreed_price: number | null
          id: string
          is_percentage_locked: boolean | null
          original_percentage: number | null
          phase_name: string
          phase_order: number
          project_id: string
          status: string
          updated_at: string
          user_proposed_price: number | null
        }
        Insert: {
          admin_proposed_price?: number | null
          created_at?: string
          final_agreed_price?: number | null
          id?: string
          is_percentage_locked?: boolean | null
          original_percentage?: number | null
          phase_name: string
          phase_order?: number
          project_id: string
          status?: string
          updated_at?: string
          user_proposed_price?: number | null
        }
        Update: {
          admin_proposed_price?: number | null
          created_at?: string
          final_agreed_price?: number | null
          id?: string
          is_percentage_locked?: boolean | null
          original_percentage?: number | null
          phase_name?: string
          phase_order?: number
          project_id?: string
          status?: string
          updated_at?: string
          user_proposed_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_phases_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_plans: {
        Row: {
          created_at: string
          id: string
          plan_details: string
          project_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          plan_details: string
          project_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          plan_details?: string
          project_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_plans_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          business_goals: string | null
          created_at: string
          current_challenges: string | null
          custom_requirements: string | null
          id: string
          is_active: boolean
          progression_percentage: number | null
          project_name: string
          selected_features: string[]
          status: string
          total_project_amount: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          business_goals?: string | null
          created_at?: string
          current_challenges?: string | null
          custom_requirements?: string | null
          id?: string
          is_active?: boolean
          progression_percentage?: number | null
          project_name: string
          selected_features?: string[]
          status?: string
          total_project_amount?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          business_goals?: string | null
          created_at?: string
          current_challenges?: string | null
          custom_requirements?: string | null
          id?: string
          is_active?: boolean
          progression_percentage?: number | null
          project_name?: string
          selected_features?: string[]
          status?: string
          total_project_amount?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      total_price_negotiations: {
        Row: {
          created_at: string
          id: string
          message: string | null
          original_total_price: number
          project_id: string
          proposed_by: string
          proposed_total_price: number
          round_number: number
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          original_total_price: number
          project_id: string
          proposed_by: string
          proposed_total_price: number
          round_number?: number
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          original_total_price?: number
          project_id?: string
          proposed_by?: string
          proposed_total_price?: number
          round_number?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "total_price_negotiations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          session_token: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          session_token: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          session_token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          business_category: string
          business_name: string
          created_at: string
          email: string
          first_name: string
          has_completed_initial_setup: boolean
          id: string
          is_verified: boolean
          last_name: string
          password_hash: string
          updated_at: string
        }
        Insert: {
          business_category: string
          business_name: string
          created_at?: string
          email: string
          first_name: string
          has_completed_initial_setup?: boolean
          id?: string
          is_verified?: boolean
          last_name: string
          password_hash: string
          updated_at?: string
        }
        Update: {
          business_category?: string
          business_name?: string
          created_at?: string
          email?: string
          first_name?: string
          has_completed_initial_setup?: boolean
          id?: string
          is_verified?: boolean
          last_name?: string
          password_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_payment_reference: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      update_phase_prices_from_total: {
        Args: { p_project_id: string; p_new_total: number }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
