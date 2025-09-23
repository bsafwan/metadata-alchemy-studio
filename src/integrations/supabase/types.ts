export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_messages: {
        Row: {
          created_at: string
          crm_inquiry_id: string | null
          email_content: string | null
          id: string
          images: Json | null
          links: Json | null
          message_type: string
          notification_content: string | null
          sent_at: string
          sent_by: string
          title: string
        }
        Insert: {
          created_at?: string
          crm_inquiry_id?: string | null
          email_content?: string | null
          id?: string
          images?: Json | null
          links?: Json | null
          message_type?: string
          notification_content?: string | null
          sent_at?: string
          sent_by?: string
          title: string
        }
        Update: {
          created_at?: string
          crm_inquiry_id?: string | null
          email_content?: string | null
          id?: string
          images?: Json | null
          links?: Json | null
          message_type?: string
          notification_content?: string | null
          sent_at?: string
          sent_by?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_messages_crm_inquiry_id_fkey"
            columns: ["crm_inquiry_id"]
            isOneToOne: false
            referencedRelation: "crm_inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
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
          source_page: string | null
          user_identifier: string | null
        }
        Insert: {
          company_name: string
          created_at?: string
          crm_needs: string
          email: string
          id?: string
          phone: string
          source_page?: string | null
          user_identifier?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          crm_needs?: string
          email?: string
          id?: string
          phone?: string
          source_page?: string | null
          user_identifier?: string | null
        }
        Relationships: []
      }
      crm_meetings: {
        Row: {
          admin_notes: string | null
          company_name: string
          contact_name: string
          created_at: string
          crm_inquiry_id: string | null
          duration_minutes: number
          email: string
          google_meet_link: string | null
          id: string
          meeting_date: string
          meeting_platform: string
          meeting_time: string
          meeting_timezone: string
          reminder_sent: boolean | null
          status: string
          updated_at: string
          whatsapp: string | null
          zoom_link: string | null
        }
        Insert: {
          admin_notes?: string | null
          company_name: string
          contact_name: string
          created_at?: string
          crm_inquiry_id?: string | null
          duration_minutes?: number
          email: string
          google_meet_link?: string | null
          id?: string
          meeting_date: string
          meeting_platform: string
          meeting_time: string
          meeting_timezone?: string
          reminder_sent?: boolean | null
          status?: string
          updated_at?: string
          whatsapp?: string | null
          zoom_link?: string | null
        }
        Update: {
          admin_notes?: string | null
          company_name?: string
          contact_name?: string
          created_at?: string
          crm_inquiry_id?: string | null
          duration_minutes?: number
          email?: string
          google_meet_link?: string | null
          id?: string
          meeting_date?: string
          meeting_platform?: string
          meeting_time?: string
          meeting_timezone?: string
          reminder_sent?: boolean | null
          status?: string
          updated_at?: string
          whatsapp?: string | null
          zoom_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_meetings_crm_inquiry_id_fkey"
            columns: ["crm_inquiry_id"]
            isOneToOne: false
            referencedRelation: "crm_inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_audit_pages: {
        Row: {
          client_email: string
          client_name: string
          created_at: string
          expires_at: string
          html_content: string
          id: string
          updated_at: string
          url_slug: string
        }
        Insert: {
          client_email: string
          client_name: string
          created_at?: string
          expires_at?: string
          html_content: string
          id?: string
          updated_at?: string
          url_slug: string
        }
        Update: {
          client_email?: string
          client_name?: string
          created_at?: string
          expires_at?: string
          html_content?: string
          id?: string
          updated_at?: string
          url_slug?: string
        }
        Relationships: []
      }
      delivery_items: {
        Row: {
          admin_notes: string | null
          content: Json | null
          created_at: string
          description: string | null
          files: Json | null
          id: string
          item_type: string
          links: Json | null
          project_id: string
          requires_full_payment: boolean
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          content?: Json | null
          created_at?: string
          description?: string | null
          files?: Json | null
          id?: string
          item_type: string
          links?: Json | null
          project_id: string
          requires_full_payment?: boolean
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          content?: Json | null
          created_at?: string
          description?: string | null
          files?: Json | null
          id?: string
          item_type?: string
          links?: Json | null
          project_id?: string
          requires_full_payment?: boolean
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_items_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
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
      device_push_subscriptions: {
        Row: {
          auth_key: string
          created_at: string
          device_fingerprint: string
          device_id: string
          device_info: Json | null
          endpoint: string
          id: string
          is_active: boolean
          last_used_at: string | null
          p256dh_key: string
          page_context: Json | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          auth_key: string
          created_at?: string
          device_fingerprint: string
          device_id: string
          device_info?: Json | null
          endpoint: string
          id?: string
          is_active?: boolean
          last_used_at?: string | null
          p256dh_key: string
          page_context?: Json | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          auth_key?: string
          created_at?: string
          device_fingerprint?: string
          device_id?: string
          device_info?: Json | null
          endpoint?: string
          id?: string
          is_active?: boolean
          last_used_at?: string | null
          p256dh_key?: string
          page_context?: Json | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
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
      project_api_keys: {
        Row: {
          admin_notes: string | null
          created_at: string
          id: string
          is_required: boolean
          key_description: string | null
          key_name: string
          key_type: string
          key_value: string | null
          project_id: string
          provided_by: string | null
          service_name: string
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          is_required?: boolean
          key_description?: string | null
          key_name: string
          key_type: string
          key_value?: string | null
          project_id: string
          provided_by?: string | null
          service_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          is_required?: boolean
          key_description?: string | null
          key_name?: string
          key_type?: string
          key_value?: string | null
          project_id?: string
          provided_by?: string | null
          service_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_api_keys_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_deliveries: {
        Row: {
          admin_notes: string | null
          approved_at: string | null
          client_approval_notes: string | null
          created_at: string
          delivered_at: string | null
          delivery_status: string
          id: string
          initiated_at: string | null
          project_id: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          approved_at?: string | null
          client_approval_notes?: string | null
          created_at?: string
          delivered_at?: string | null
          delivery_status?: string
          id?: string
          initiated_at?: string | null
          project_id: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          approved_at?: string | null
          client_approval_notes?: string | null
          created_at?: string
          delivered_at?: string | null
          delivery_status?: string
          id?: string
          initiated_at?: string | null
          project_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_deliveries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_payments: {
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
            foreignKeyName: "phase_payments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
      push_subscriptions: {
        Row: {
          auth_key: string
          created_at: string
          endpoint: string
          id: string
          is_active: boolean
          last_used_at: string | null
          p256dh_key: string
          user_agent: string | null
          user_email: string
        }
        Insert: {
          auth_key: string
          created_at?: string
          endpoint: string
          id?: string
          is_active?: boolean
          last_used_at?: string | null
          p256dh_key: string
          user_agent?: string | null
          user_email: string
        }
        Update: {
          auth_key?: string
          created_at?: string
          endpoint?: string
          id?: string
          is_active?: boolean
          last_used_at?: string | null
          p256dh_key?: string
          user_agent?: string | null
          user_email?: string
        }
        Relationships: []
      }
      scheduled_deletions: {
        Row: {
          bucket_name: string
          created_at: string
          deletion_date: string
          file_path: string
          id: string
          meeting_id: string | null
          processed: boolean | null
          updated_at: string
        }
        Insert: {
          bucket_name: string
          created_at?: string
          deletion_date: string
          file_path: string
          id?: string
          meeting_id?: string | null
          processed?: boolean | null
          updated_at?: string
        }
        Update: {
          bucket_name?: string
          created_at?: string
          deletion_date?: string
          file_path?: string
          id?: string
          meeting_id?: string | null
          processed?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_deletions_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "crm_meetings"
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
      initialize_default_delivery_items: {
        Args: { p_project_id: string }
        Returns: undefined
      }
      update_phase_prices_from_total: {
        Args: { p_new_total: number; p_project_id: string }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
