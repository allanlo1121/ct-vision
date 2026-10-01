export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  eqp: {
    Tables: {
      equipments: {
        Row: {
          code: string
          equip_type_id: string
          external_id: string | null
          external_version: number | null
          id: string
          is_disabled: boolean
          manage_code: string | null
          manufacturer_id: string
          model: string
          name: string
          remark: string | null
          serial_no: string | null
          sort_order: number
        }
        Insert: {
          code: string
          equip_type_id: string
          external_id?: string | null
          external_version?: number | null
          id?: string
          is_disabled?: boolean
          manage_code?: string | null
          manufacturer_id: string
          model: string
          name: string
          remark?: string | null
          serial_no?: string | null
          sort_order?: number
        }
        Update: {
          code?: string
          equip_type_id?: string
          external_id?: string | null
          external_version?: number | null
          id?: string
          is_disabled?: boolean
          manage_code?: string | null
          manufacturer_id?: string
          model?: string
          name?: string
          remark?: string | null
          serial_no?: string | null
          sort_order?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  hr: {
    Tables: {
      customers: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          customer_category_id: string
          deleted_at: string | null
          deleted_by: string | null
          full_name: string
          id: string
          is_disabled: boolean
          name: string
          remark: string | null
          sort_order: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          customer_category_id: string
          deleted_at?: string | null
          deleted_by?: string | null
          full_name: string
          id?: string
          is_disabled?: boolean
          name: string
          remark?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          customer_category_id?: string
          deleted_at?: string | null
          deleted_by?: string | null
          full_name?: string
          id?: string
          is_disabled?: boolean
          name?: string
          remark?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "customers_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "customers_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "customers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "customers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      educations: {
        Row: {
          created_at: string | null
          created_by: string | null
          degree_id: string | null
          deleted_at: string | null
          deleted_by: string | null
          education_level_id: string | null
          employee_id: string
          end_date: string | null
          id: string
          major_id: string | null
          school: string | null
          start_date: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          degree_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          education_level_id?: string | null
          employee_id: string
          end_date?: string | null
          id?: string
          major_id?: string | null
          school?: string | null
          start_date?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          degree_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          education_level_id?: string | null
          employee_id?: string
          end_date?: string | null
          id?: string
          major_id?: string | null
          school?: string | null
          start_date?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "educations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "educations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "educations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "educations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "educations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "educations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "fk_education_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_education_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_education_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_education_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_education_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "fk_education_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      employee_assignments: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          employee_id: string
          end_date: string | null
          id: string
          is_primary: boolean | null
          organization_id: string
          post_id: string | null
          start_date: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          employee_id: string
          end_date?: string | null
          id?: string
          is_primary?: boolean | null
          organization_id: string
          post_id?: string | null
          start_date?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          employee_id?: string
          end_date?: string | null
          id?: string
          is_primary?: boolean | null
          organization_id?: string
          post_id?: string | null
          start_date?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_assignments_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_assignments_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "employee_assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "fk_assignment_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assignment_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assignment_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assignment_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assignment_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "fk_assignment_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      employee_titles: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          employee_id: string
          id: string
          obtained_date: string | null
          title_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          employee_id: string
          id?: string
          obtained_date?: string | null
          title_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          employee_id?: string
          id?: string
          obtained_date?: string | null
          title_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_titles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_titles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_titles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_titles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_titles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_titles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_titles_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_titles_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_titles_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_titles_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_titles_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_titles_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_titles_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_titles_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_titles_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_titles_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_titles_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_titles_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "fk_title_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_title_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_title_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_title_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_title_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "fk_title_employee"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      employees: {
        Row: {
          auth_id: string | null
          birth_date: string | null
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          email: string | null
          employment_status_id: string | null
          employment_type_id: string | null
          entry_date: string | null
          external_id: string | null
          external_version: number | null
          gender_id: string | null
          hire_date: string | null
          id: string
          id_card: string | null
          is_disabled: boolean | null
          leave_date: string | null
          name: string
          organization_id: string | null
          phone: string | null
          remark: string | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          auth_id?: string | null
          birth_date?: string | null
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string | null
          employment_status_id?: string | null
          employment_type_id?: string | null
          entry_date?: string | null
          external_id?: string | null
          external_version?: number | null
          gender_id?: string | null
          hire_date?: string | null
          id?: string
          id_card?: string | null
          is_disabled?: boolean | null
          leave_date?: string | null
          name: string
          organization_id?: string | null
          phone?: string | null
          remark?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          auth_id?: string | null
          birth_date?: string | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string | null
          employment_status_id?: string | null
          employment_type_id?: string | null
          entry_date?: string | null
          external_id?: string | null
          external_version?: number | null
          gender_id?: string | null
          hire_date?: string | null
          id?: string
          id_card?: string | null
          is_disabled?: boolean | null
          leave_date?: string | null
          name?: string
          organization_id?: string | null
          phone?: string | null
          remark?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employees_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employees_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employees_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "employees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "employees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employees_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      organization_role_assignments: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          employee_id: string
          end_date: string | null
          id: string
          organization_id: string
          role_type_id: string
          start_date: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          employee_id: string
          end_date?: string | null
          id?: string
          organization_id: string
          role_type_id: string
          start_date: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          employee_id?: string
          end_date?: string | null
          id?: string
          organization_id?: string
          role_type_id?: string
          start_date?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_role_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "organization_role_assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "organization_role_assignments_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "organization_role_assignments_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "organization_role_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "organization_role_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "organization_role_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "organization_role_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "organization_role_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_role_assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "organization_role_assignments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          business_id: string | null
          city_code: string | null
          code: string
          country_code: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          district_code: string | null
          external_id: string | null
          external_version: number | null
          full_name: string | null
          id: string
          is_disabled: boolean
          is_leaf: boolean
          latitude: number | null
          level: number | null
          longitude: number | null
          name: string
          node_key: string
          org_category_id: string | null
          org_type_id: string
          parent_id: string | null
          path: unknown
          province_code: string | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          business_id?: string | null
          city_code?: string | null
          code: string
          country_code?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          district_code?: string | null
          external_id?: string | null
          external_version?: number | null
          full_name?: string | null
          id?: string
          is_disabled?: boolean
          is_leaf?: boolean
          latitude?: number | null
          level?: number | null
          longitude?: number | null
          name: string
          node_key: string
          org_category_id?: string | null
          org_type_id: string
          parent_id?: string | null
          path: unknown
          province_code?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          business_id?: string | null
          city_code?: string | null
          code?: string
          country_code?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          district_code?: string | null
          external_id?: string | null
          external_version?: number | null
          full_name?: string | null
          id?: string
          is_disabled?: boolean
          is_leaf?: boolean
          latitude?: number | null
          level?: number | null
          longitude?: number | null
          name?: string
          node_key?: string
          org_category_id?: string | null
          org_type_id?: string
          parent_id?: string | null
          path?: unknown
          province_code?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "organizations_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organization_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organization_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organization_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "organizations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      posts: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          grade: number | null
          id: string
          is_disabled: boolean
          name: string
          sort_order: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          grade?: number | null
          id?: string
          is_disabled?: boolean
          name: string
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          grade?: number | null
          id?: string
          is_disabled?: boolean
          name?: string
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "posts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "posts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "posts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "posts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_employee_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "posts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["employee_id"]
          },
        ]
      }
    }
    Views: {
      v_employee_detail: {
        Row: {
          code: string | null
          educations: Json | null
          employment_status_id: string | null
          employment_status_name: string | null
          employment_type_id: string | null
          employment_type_name: string | null
          gender_id: string | null
          id: string | null
          name: string | null
          organization_id: string | null
          organization_name: string | null
          primary_post_id: string | null
          primary_post_name: string | null
          titles: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_post_id_fkey"
            columns: ["primary_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_post_id_fkey"
            columns: ["primary_post_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["post_id"]
          },
        ]
      }
      v_employee_list: {
        Row: {
          code: string | null
          created_at: string | null
          employment_status_name: string | null
          id: string | null
          name: string | null
          organization_id: string | null
          organization_name: string | null
          post_name: string | null
          sort_order: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_picker"
            referencedColumns: ["id"]
          },
        ]
      }
      v_employee_picker: {
        Row: {
          code: string | null
          id: string | null
          name: string | null
          organization_id: string | null
          organization_name: string | null
          post_id: string | null
          post_name: string | null
          sort_order: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "v_organization_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["post_id"]
          },
        ]
      }
      v_org_responsibles: {
        Row: {
          employee_id: string | null
          employee_name: string | null
          organization_id: string | null
          organization_name: string | null
          role_type_code: string | null
          role_type_name: string | null
        }
        Relationships: []
      }
      v_org_role_assignments: {
        Row: {
          assignment_id: string | null
          employee_id: string | null
          employee_name: string | null
          end_date: string | null
          is_primary: boolean | null
          org_type_code: string | null
          org_type_id: string | null
          org_type_name: string | null
          organization_id: string | null
          organization_name: string | null
          post_id: string | null
          post_name: string | null
          role_type_code: string | null
          role_type_id: string | null
          role_type_name: string | null
          start_date: string | null
        }
        Relationships: []
      }
      v_organization_detail: {
        Row: {
          address: string | null
          business_name: string | null
          city_name: string | null
          code: string | null
          country_name: string | null
          created_at: string | null
          description: string | null
          district_name: string | null
          external_id: string | null
          external_version: number | null
          full_name: string | null
          id: string | null
          is_deleted: boolean | null
          is_disabled: boolean | null
          latitude: number | null
          longitude: number | null
          name: string | null
          org_category_name: string | null
          org_type_name: string | null
          parent_org_name: string | null
          province_name: string | null
          updated_at: string | null
        }
        Relationships: []
      }
      v_organization_list: {
        Row: {
          business_name: string | null
          city_name: string | null
          country_name: string | null
          created_at: string | null
          district_name: string | null
          id: string | null
          is_deleted: boolean | null
          is_disabled: boolean | null
          level: number | null
          name: string | null
          org_category_name: string | null
          org_type_name: string | null
          parent_id: string | null
          parent_org_name: string | null
          path: unknown
          province_name: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organization_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organization_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organization_picker"
            referencedColumns: ["id"]
          },
        ]
      }
      v_organization_picker: {
        Row: {
          city_name: string | null
          id: string | null
          name: string | null
          org_type_name: string | null
          parent_id: string | null
          parent_org_name: string | null
          province_name: string | null
          sort_order: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_org_responsibles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_org_role_assignments"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organization_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organization_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_organization_picker"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  proj: {
    Tables: {
      geo_classes: {
        Row: {
          code: string | null
          created_at: string
          id: number
          is_disabled: boolean
          layer: number
          name: string
          parent_id: number | null
          remark: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: number
          is_disabled?: boolean
          layer: number
          name: string
          parent_id?: number | null
          remark?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: number
          is_disabled?: boolean
          layer?: number
          name?: string
          parent_id?: number | null
          remark?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "geo_classes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "geo_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      geo_rock_classes: {
        Row: {
          code: string
          created_at: string
          id: number
          is_disabled: boolean
          name: string
          remark: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          is_disabled?: boolean
          name: string
          remark?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          is_disabled?: boolean
          name?: string
          remark?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      project_attention_level_timeline: {
        Row: {
          change_type: string | null
          created_at: string | null
          created_by: string | null
          id: string
          project_attention_level_id: string | null
          project_id: string
          remark: string | null
          updated_at: string | null
          updated_by: string | null
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          change_type?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          project_attention_level_id?: string | null
          project_id: string
          remark?: string | null
          updated_at?: string | null
          updated_by?: string | null
          valid_from: string
          valid_to?: string | null
        }
        Update: {
          change_type?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          project_attention_level_id?: string | null
          project_id?: string
          remark?: string | null
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_contract_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_schedule_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_attention_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      project_attention_type_timeline: {
        Row: {
          attention_type_id: string
          change_type: string | null
          created_at: string | null
          created_by: string | null
          id: string
          project_id: string
          source: string | null
          updated_at: string | null
          updated_by: string | null
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          attention_type_id: string
          change_type?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          project_id: string
          source?: string | null
          updated_at?: string | null
          updated_by?: string | null
          valid_from: string
          valid_to?: string | null
        }
        Update: {
          attention_type_id?: string
          change_type?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          project_id?: string
          source?: string | null
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey"
            columns: ["attention_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey"
            columns: ["attention_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey"
            columns: ["attention_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey"
            columns: ["attention_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey"
            columns: ["attention_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey"
            columns: ["attention_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey"
            columns: ["attention_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey"
            columns: ["attention_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey"
            columns: ["attention_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey"
            columns: ["attention_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey"
            columns: ["attention_type_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_attention_type_id_fkey"
            columns: ["attention_type_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_contract_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_schedule_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_attention_type_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      project_catalog_std: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          external_id: string | null
          external_version: number | null
          id: string
          is_disabled: boolean
          is_leaf: boolean
          level: number | null
          major_type_id: string | null
          name: string
          node_key: string
          parent_id: string | null
          path: unknown
          project_catalog_type_id: string | null
          project_type_id: string | null
          qty_unit: string | null
          remark: string | null
          sort_order: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          external_id?: string | null
          external_version?: number | null
          id?: string
          is_disabled?: boolean
          is_leaf?: boolean
          level?: number | null
          major_type_id?: string | null
          name: string
          node_key: string
          parent_id?: string | null
          path: unknown
          project_catalog_type_id?: string | null
          project_type_id?: string | null
          qty_unit?: string | null
          remark?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          external_id?: string | null
          external_version?: number | null
          id?: string
          is_disabled?: boolean
          is_leaf?: boolean
          level?: number | null
          major_type_id?: string | null
          name?: string
          node_key?: string
          parent_id?: string | null
          path?: unknown
          project_catalog_type_id?: string | null
          project_type_id?: string | null
          qty_unit?: string | null
          remark?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_catalog_std_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_catalog_std_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey"
            columns: ["major_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey"
            columns: ["major_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey"
            columns: ["major_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey"
            columns: ["major_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey"
            columns: ["major_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey"
            columns: ["major_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey"
            columns: ["major_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey"
            columns: ["major_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey"
            columns: ["major_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey"
            columns: ["major_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey"
            columns: ["major_type_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_catalog_std_major_type_id_fkey"
            columns: ["major_type_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_catalog_std_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "project_catalog_std"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey"
            columns: ["project_catalog_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey"
            columns: ["project_catalog_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey"
            columns: ["project_catalog_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey"
            columns: ["project_catalog_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey"
            columns: ["project_catalog_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey"
            columns: ["project_catalog_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey"
            columns: ["project_catalog_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey"
            columns: ["project_catalog_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey"
            columns: ["project_catalog_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey"
            columns: ["project_catalog_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey"
            columns: ["project_catalog_type_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_catalog_type_id_fkey"
            columns: ["project_catalog_type_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_catalog_std_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_catalog_std_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      project_catalogs: {
        Row: {
          engineering_qty: number | null
          external_id: string | null
          external_version: number | null
          id: string
          is_disabled: boolean
          is_leaf: boolean
          level: number | null
          name: string
          node_key: string
          parent_id: string | null
          path: unknown
          project_catalog_std_id: string | null
          project_id: string
          project_work_point_id: string | null
          remarks: string | null
          short_name: string | null
          sort_order: number | null
        }
        Insert: {
          engineering_qty?: number | null
          external_id?: string | null
          external_version?: number | null
          id?: string
          is_disabled?: boolean
          is_leaf?: boolean
          level?: number | null
          name: string
          node_key: string
          parent_id?: string | null
          path: unknown
          project_catalog_std_id?: string | null
          project_id: string
          project_work_point_id?: string | null
          remarks?: string | null
          short_name?: string | null
          sort_order?: number | null
        }
        Update: {
          engineering_qty?: number | null
          external_id?: string | null
          external_version?: number | null
          id?: string
          is_disabled?: boolean
          is_leaf?: boolean
          level?: number | null
          name?: string
          node_key?: string
          parent_id?: string | null
          path?: unknown
          project_catalog_std_id?: string | null
          project_id?: string
          project_work_point_id?: string | null
          remarks?: string | null
          short_name?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_catalogs_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "project_catalogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_catalogs_project_catalog_std_id_fkey"
            columns: ["project_catalog_std_id"]
            isOneToOne: false
            referencedRelation: "project_catalog_std"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_catalogs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_catalogs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_contract_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_catalogs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_catalogs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_catalogs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_catalogs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_schedule_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_catalogs_project_work_point_id_fkey"
            columns: ["project_work_point_id"]
            isOneToOne: false
            referencedRelation: "project_work_points"
            referencedColumns: ["id"]
          },
        ]
      }
      project_contract_versions: {
        Row: {
          change_amount: number | null
          change_reason: string | null
          commissioning_date: string | null
          contract_amount: number | null
          contract_end_date: string | null
          contract_id: string
          contract_start_date: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          source: string | null
          updated_at: string | null
          updated_by: string | null
          version_no: number
        }
        Insert: {
          change_amount?: number | null
          change_reason?: string | null
          commissioning_date?: string | null
          contract_amount?: number | null
          contract_end_date?: string | null
          contract_id: string
          contract_start_date?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          source?: string | null
          updated_at?: string | null
          updated_by?: string | null
          version_no: number
        }
        Update: {
          change_amount?: number | null
          change_reason?: string | null
          commissioning_date?: string | null
          contract_amount?: number | null
          contract_end_date?: string | null
          contract_id?: string
          contract_start_date?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          source?: string | null
          updated_at?: string | null
          updated_by?: string | null
          version_no?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_contract_versions_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "project_contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_contract_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_contract_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      project_contracts: {
        Row: {
          contract_code: string | null
          contract_name: string | null
          contract_type: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_disabled: boolean
          owner_unit: string | null
          project_id: string
          sign_date: string | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          contract_code?: string | null
          contract_name?: string | null
          contract_type?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_disabled?: boolean
          owner_unit?: string | null
          project_id: string
          sign_date?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          contract_code?: string | null
          contract_name?: string | null
          contract_type?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_disabled?: boolean
          owner_unit?: string | null
          project_id?: string
          sign_date?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_contracts_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_contract_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_schedule_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_contracts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      project_control_level_timeline: {
        Row: {
          change_type: string | null
          created_at: string | null
          created_by: string | null
          id: string
          project_control_level_id: string | null
          project_id: string
          remark: string | null
          updated_at: string | null
          updated_by: string | null
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          change_type?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          project_control_level_id?: string | null
          project_id: string
          remark?: string | null
          updated_at?: string | null
          updated_by?: string | null
          valid_from: string
          valid_to?: string | null
        }
        Update: {
          change_type?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          project_control_level_id?: string | null
          project_id?: string
          remark?: string | null
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_contract_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_schedule_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      project_risk_level_timeline: {
        Row: {
          change_type: string | null
          created_by: string | null
          id: string
          project_id: string
          project_risk_level_id: string | null
          remark: string | null
          updated_at: string | null
          updated_by: string | null
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          change_type?: string | null
          created_by?: string | null
          id?: string
          project_id: string
          project_risk_level_id?: string | null
          remark?: string | null
          updated_at?: string | null
          updated_by?: string | null
          valid_from: string
          valid_to?: string | null
        }
        Update: {
          change_type?: string | null
          created_by?: string | null
          id?: string
          project_id?: string
          project_risk_level_id?: string | null
          remark?: string | null
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_contract_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_schedule_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      project_schedule_versions: {
        Row: {
          change_reason: string | null
          commissioning_date: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          project_id: string
          remark: string | null
          schedule_end_date: string | null
          schedule_start_date: string | null
          source: string | null
          updated_at: string | null
          updated_by: string | null
          version_no: number
        }
        Insert: {
          change_reason?: string | null
          commissioning_date?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          project_id: string
          remark?: string | null
          schedule_end_date?: string | null
          schedule_start_date?: string | null
          source?: string | null
          updated_at?: string | null
          updated_by?: string | null
          version_no: number
        }
        Update: {
          change_reason?: string | null
          commissioning_date?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          project_id?: string
          remark?: string | null
          schedule_end_date?: string | null
          schedule_start_date?: string | null
          source?: string | null
          updated_at?: string | null
          updated_by?: string | null
          version_no?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_schedule_versions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_contract_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_schedule_versions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_schedule_versions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_schedule_versions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_schedule_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      project_status_timeline: {
        Row: {
          change_type: string | null
          created_at: string | null
          created_by: string | null
          deleted_by: string | null
          id: string
          project_id: string
          project_status_id: string | null
          project_sub_status_id: string | null
          remark: string | null
          updated_at: string | null
          updated_by: string | null
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          change_type?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_by?: string | null
          id?: string
          project_id: string
          project_status_id?: string | null
          project_sub_status_id?: string | null
          remark?: string | null
          updated_at?: string | null
          updated_by?: string | null
          valid_from: string
          valid_to?: string | null
        }
        Update: {
          change_type?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_by?: string | null
          id?: string
          project_id?: string
          project_status_id?: string | null
          project_sub_status_id?: string | null
          remark?: string | null
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_status_timeline_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_contract_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_schedule_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey"
            columns: ["project_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey"
            columns: ["project_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey"
            columns: ["project_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey"
            columns: ["project_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey"
            columns: ["project_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey"
            columns: ["project_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey"
            columns: ["project_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey"
            columns: ["project_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey"
            columns: ["project_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey"
            columns: ["project_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey"
            columns: ["project_status_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_status_id_fkey"
            columns: ["project_status_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey"
            columns: ["project_sub_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey"
            columns: ["project_sub_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey"
            columns: ["project_sub_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey"
            columns: ["project_sub_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey"
            columns: ["project_sub_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey"
            columns: ["project_sub_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey"
            columns: ["project_sub_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey"
            columns: ["project_sub_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey"
            columns: ["project_sub_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey"
            columns: ["project_sub_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey"
            columns: ["project_sub_status_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_status_timeline_project_sub_status_id_fkey"
            columns: ["project_sub_status_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "project_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      project_work_points: {
        Row: {
          code: string
          content: string | null
          external_id: string | null
          external_version: number | null
          id: string
          is_disabled: boolean
          name: string
          project_id: string
          remark: string | null
          sort_order: number
        }
        Insert: {
          code: string
          content?: string | null
          external_id?: string | null
          external_version?: number | null
          id?: string
          is_disabled?: boolean
          name: string
          project_id: string
          remark?: string | null
          sort_order?: number
        }
        Update: {
          code?: string
          content?: string | null
          external_id?: string | null
          external_version?: number | null
          id?: string
          is_disabled?: boolean
          name?: string
          project_id?: string
          remark?: string | null
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_work_points_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_work_points_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_contract_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_work_points_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_work_points_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_work_points_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_work_points_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_schedule_module"
            referencedColumns: ["project_id"]
          },
        ]
      }
      projects: {
        Row: {
          actual_end_date: string | null
          actual_start_date: string | null
          address: string | null
          city_code: string | null
          code: string
          country_code: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          district_code: string | null
          external_id: string | null
          external_version: number | null
          full_name: string | null
          id: string
          is_disabled: boolean
          latitude: number | null
          longitude: number | null
          name: string
          organization_id: string | null
          project_key_points: string | null
          project_management_mode_id: string | null
          project_overview: string | null
          project_scope: string | null
          project_sub_type_id: string | null
          project_type_id: string | null
          province_code: string | null
          region_id: string | null
          remark: string | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          actual_end_date?: string | null
          actual_start_date?: string | null
          address?: string | null
          city_code?: string | null
          code: string
          country_code?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          district_code?: string | null
          external_id?: string | null
          external_version?: number | null
          full_name?: string | null
          id?: string
          is_disabled?: boolean
          latitude?: number | null
          longitude?: number | null
          name: string
          organization_id?: string | null
          project_key_points?: string | null
          project_management_mode_id?: string | null
          project_overview?: string | null
          project_scope?: string | null
          project_sub_type_id?: string | null
          project_type_id?: string | null
          province_code?: string | null
          region_id?: string | null
          remark?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          actual_end_date?: string | null
          actual_start_date?: string | null
          address?: string | null
          city_code?: string | null
          code?: string
          country_code?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          district_code?: string | null
          external_id?: string | null
          external_version?: number | null
          full_name?: string | null
          id?: string
          is_disabled?: boolean
          latitude?: number | null
          longitude?: number | null
          name?: string
          organization_id?: string | null
          project_key_points?: string | null
          project_management_mode_id?: string | null
          project_overview?: string | null
          project_scope?: string | null
          project_sub_type_id?: string | null
          project_type_id?: string | null
          province_code?: string | null
          region_id?: string | null
          remark?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "projects_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey"
            columns: ["project_management_mode_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey"
            columns: ["project_management_mode_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey"
            columns: ["project_management_mode_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey"
            columns: ["project_management_mode_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey"
            columns: ["project_management_mode_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey"
            columns: ["project_management_mode_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey"
            columns: ["project_management_mode_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey"
            columns: ["project_management_mode_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey"
            columns: ["project_management_mode_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey"
            columns: ["project_management_mode_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey"
            columns: ["project_management_mode_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "projects_project_management_mode_id_fkey"
            columns: ["project_management_mode_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey"
            columns: ["project_sub_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey"
            columns: ["project_sub_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey"
            columns: ["project_sub_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey"
            columns: ["project_sub_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey"
            columns: ["project_sub_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey"
            columns: ["project_sub_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey"
            columns: ["project_sub_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey"
            columns: ["project_sub_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey"
            columns: ["project_sub_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey"
            columns: ["project_sub_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey"
            columns: ["project_sub_type_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "projects_project_sub_type_id_fkey"
            columns: ["project_sub_type_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      risk_solution_items: {
        Row: {
          category: string | null
          content: string
          created_at: string
          id: string
          is_required: boolean
          item_no: number
          solution_id: string
          sort_order: number
          title: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          is_required?: boolean
          item_no: number
          solution_id: string
          sort_order?: number
          title?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          is_required?: boolean
          item_no?: number
          solution_id?: string
          sort_order?: number
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "risk_solution_items_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "risk_solutions"
            referencedColumns: ["id"]
          },
        ]
      }
      risk_solutions: {
        Row: {
          applicable_conditions: string | null
          code: string | null
          created_at: string
          id: string
          is_disabled: boolean
          is_template: boolean
          name: string
          remark: string | null
          source_risk_id: string | null
          summary: string | null
          updated_at: string
        }
        Insert: {
          applicable_conditions?: string | null
          code?: string | null
          created_at?: string
          id?: string
          is_disabled?: boolean
          is_template?: boolean
          name: string
          remark?: string | null
          source_risk_id?: string | null
          summary?: string | null
          updated_at?: string
        }
        Update: {
          applicable_conditions?: string | null
          code?: string | null
          created_at?: string
          id?: string
          is_disabled?: boolean
          is_template?: boolean
          name?: string
          remark?: string | null
          source_risk_id?: string | null
          summary?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "risk_solutions_source_risk_id_fkey"
            columns: ["source_risk_id"]
            isOneToOne: false
            referencedRelation: "tunnel_risks"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_disabled: boolean
          line_mode: Database["proj"]["Enums"]["line_mode"] | null
          name: string
          project_id: string
          remark: string | null
          short_name: string | null
          sort_order: number
          type: Database["proj"]["Enums"]["section_type"]
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_disabled?: boolean
          line_mode?: Database["proj"]["Enums"]["line_mode"] | null
          name: string
          project_id: string
          remark?: string | null
          short_name?: string | null
          sort_order?: number
          type: Database["proj"]["Enums"]["section_type"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_disabled?: boolean
          line_mode?: Database["proj"]["Enums"]["line_mode"] | null
          name?: string
          project_id?: string
          remark?: string | null
          short_name?: string | null
          sort_order?: number
          type?: Database["proj"]["Enums"]["section_type"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_contract_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_schedule_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      tunnel_plan_days: {
        Row: {
          id: number
          plan_advance_meter: number | null
          plan_id: number
          plan_ring_count: number | null
          work_date: string
        }
        Insert: {
          id?: number
          plan_advance_meter?: number | null
          plan_id: number
          plan_ring_count?: number | null
          work_date: string
        }
        Update: {
          id?: number
          plan_advance_meter?: number | null
          plan_id?: number
          plan_ring_count?: number | null
          work_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "tunnel_plan_days_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "tunnel_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      tunnel_plans: {
        Row: {
          created_at: string
          id: number
          plan_name: string
          remark: string | null
          status: string
          tunnel_id: string
          updated_at: string
          version: number
        }
        Insert: {
          created_at?: string
          id?: number
          plan_name: string
          remark?: string | null
          status?: string
          tunnel_id: string
          updated_at?: string
          version?: number
        }
        Update: {
          created_at?: string
          id?: number
          plan_name?: string
          remark?: string | null
          status?: string
          tunnel_id?: string
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      tunnel_risks: {
        Row: {
          burial_depth: number | null
          created_at: string
          deleted_at: string | null
          description: string | null
          end_chainage: number | null
          geo_class_id: number | null
          geo_rock_class_id: number | null
          id: string
          name: string
          remark: string | null
          risk_level: number
          start_chainage: number | null
          tunnel_id: string
          updated_at: string
        }
        Insert: {
          burial_depth?: number | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          end_chainage?: number | null
          geo_class_id?: number | null
          geo_rock_class_id?: number | null
          id?: string
          name: string
          remark?: string | null
          risk_level?: number
          start_chainage?: number | null
          tunnel_id: string
          updated_at?: string
        }
        Update: {
          burial_depth?: number | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          end_chainage?: number | null
          geo_class_id?: number | null
          geo_rock_class_id?: number | null
          id?: string
          name?: string
          remark?: string | null
          risk_level?: number
          start_chainage?: number | null
          tunnel_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tunnel_risks_geo_class_id_fkey"
            columns: ["geo_class_id"]
            isOneToOne: false
            referencedRelation: "geo_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tunnel_risks_geo_rock_class_id_fkey"
            columns: ["geo_rock_class_id"]
            isOneToOne: false
            referencedRelation: "geo_rock_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      tunnel_schedule_versions: {
        Row: {
          change_reason: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          remark: string | null
          schedule_end_date: string | null
          schedule_start_date: string | null
          source: string | null
          tunnel_id: string
          updated_at: string | null
          updated_by: string | null
          version_no: number
        }
        Insert: {
          change_reason?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          remark?: string | null
          schedule_end_date?: string | null
          schedule_start_date?: string | null
          source?: string | null
          tunnel_id: string
          updated_at?: string | null
          updated_by?: string | null
          version_no: number
        }
        Update: {
          change_reason?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          remark?: string | null
          schedule_end_date?: string | null
          schedule_start_date?: string | null
          source?: string | null
          tunnel_id?: string
          updated_at?: string | null
          updated_by?: string | null
          version_no?: number
        }
        Relationships: [
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnel_schedule_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      tunnel_segments: {
        Row: {
          end_ring_no: number
          id: string
          inner_diameter: number | null
          name: string | null
          outer_diameter: number | null
          remark: string | null
          ring_width: number
          start_ring_no: number
          thickness: number | null
          tunnel_id: string
        }
        Insert: {
          end_ring_no: number
          id?: string
          inner_diameter?: number | null
          name?: string | null
          outer_diameter?: number | null
          remark?: string | null
          ring_width: number
          start_ring_no: number
          thickness?: number | null
          tunnel_id: string
        }
        Update: {
          end_ring_no?: number
          id?: string
          inner_diameter?: number | null
          name?: string | null
          outer_diameter?: number | null
          remark?: string | null
          ring_width?: number
          start_ring_no?: number
          thickness?: number | null
          tunnel_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tunnel_segments_tunnel_id_fkey"
            columns: ["tunnel_id"]
            isOneToOne: false
            referencedRelation: "tunnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tunnel_segments_tunnel_id_fkey"
            columns: ["tunnel_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["id"]
          },
        ]
      }
      tunnel_status_timeline: {
        Row: {
          change_type: string | null
          created_at: string | null
          created_by: string | null
          id: string
          remark: string | null
          tunnel_id: string
          tunnel_status_id: string | null
          updated_at: string | null
          updated_by: string | null
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          change_type?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          remark?: string | null
          tunnel_id: string
          tunnel_status_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          valid_from: string
          valid_to?: string | null
        }
        Update: {
          change_type?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          remark?: string | null
          tunnel_id?: string
          tunnel_status_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_tunnel_status_id_fkey"
            columns: ["tunnel_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_tunnel_status_id_fkey"
            columns: ["tunnel_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_tunnel_status_id_fkey"
            columns: ["tunnel_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_tunnel_status_id_fkey"
            columns: ["tunnel_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_tunnel_status_id_fkey"
            columns: ["tunnel_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_tunnel_status_id_fkey"
            columns: ["tunnel_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_tunnel_status_id_fkey"
            columns: ["tunnel_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_tunnel_status_id_fkey"
            columns: ["tunnel_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_tunnel_status_id_fkey"
            columns: ["tunnel_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_tunnel_status_id_fkey"
            columns: ["tunnel_status_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_tunnel_status_id_fkey"
            columns: ["tunnel_status_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_tunnel_status_id_fkey"
            columns: ["tunnel_status_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnel_status_timeline_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      tunnels: {
        Row: {
          adjustment: number | null
          alias_name: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          end_chainage: number
          id: string
          is_disabled: boolean
          name: string
          prefix: string | null
          remark: string | null
          section_id: string
          sort_order: number
          start_chainage: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          adjustment?: number | null
          alias_name?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          end_chainage?: number
          id?: string
          is_disabled?: boolean
          name: string
          prefix?: string | null
          remark?: string | null
          section_id: string
          sort_order?: number
          start_chainage?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          adjustment?: number | null
          alias_name?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          end_chainage?: number
          id?: string
          is_disabled?: boolean
          name?: string
          prefix?: string | null
          remark?: string | null
          section_id?: string
          sort_order?: number
          start_chainage?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnels_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnels_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tunnels_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "v_section_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tunnels_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tunnels_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "v_section_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tunnels_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["section_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "tunnels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
    }
    Views: {
      v_project_contract_module: {
        Row: {
          contract_current: Json | null
          contract_history: Json | null
          project_id: string | null
        }
        Insert: {
          contract_current?: never
          contract_history?: never
          project_id?: string | null
        }
        Update: {
          contract_current?: never
          contract_history?: never
          project_id?: string | null
        }
        Relationships: []
      }
      v_project_detail: {
        Row: {
          actual_end_date: string | null
          actual_start_date: string | null
          address: string | null
          city_name: string | null
          code: string | null
          commissioning_date: string | null
          contract_amount: number | null
          contract_current: Json | null
          contract_end_date: string | null
          contract_history: Json | null
          contract_start_date: string | null
          country_name: string | null
          district_name: string | null
          external_id: string | null
          external_version: number | null
          full_name: string | null
          id: string | null
          latitude: number | null
          longitude: number | null
          name: string | null
          organization_id: string | null
          organization_name: string | null
          project_attention_level_id: string | null
          project_attention_level_name: string | null
          project_chief_engineer_id: string | null
          project_chief_engineer_name: string | null
          project_commercial_manager_id: string | null
          project_commercial_manager_name: string | null
          project_control_level_id: string | null
          project_control_level_name: string | null
          project_discipline_inspection_id: string | null
          project_discipline_inspection_name: string | null
          project_management_mode_id: string | null
          project_management_mode_name: string | null
          project_manager_id: string | null
          project_manager_name: string | null
          project_oversight_leader_id: string | null
          project_oversight_leader_name: string | null
          project_party_secretary_id: string | null
          project_party_secretary_name: string | null
          project_risk_level_id: string | null
          project_risk_level_name: string | null
          project_safety_director_id: string | null
          project_safety_director_name: string | null
          project_status_id: string | null
          project_status_name: string | null
          project_sub_status_id: string | null
          project_sub_status_name: string | null
          project_sub_type_id: string | null
          project_sub_type_name: string | null
          project_type_id: string | null
          project_type_name: string | null
          province_name: string | null
          region_name: string | null
          schedule_current: Json | null
          schedule_end_date: string | null
          schedule_history: Json | null
          schedule_start_date: string | null
          sort_order: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
        ]
      }
      v_project_list: {
        Row: {
          actual_end_date: string | null
          actual_start_date: string | null
          address: string | null
          city_name: string | null
          code: string | null
          commissioning_date: string | null
          contract_amount: number | null
          contract_end_date: string | null
          contract_start_date: string | null
          country_name: string | null
          district_name: string | null
          external_id: string | null
          external_version: number | null
          full_name: string | null
          id: string | null
          latitude: number | null
          longitude: number | null
          name: string | null
          organization_id: string | null
          organization_name: string | null
          project_attention_level_id: string | null
          project_attention_level_name: string | null
          project_chief_engineer_id: string | null
          project_chief_engineer_name: string | null
          project_commercial_manager_id: string | null
          project_commercial_manager_name: string | null
          project_control_level_id: string | null
          project_control_level_name: string | null
          project_discipline_inspection_id: string | null
          project_discipline_inspection_name: string | null
          project_management_mode_id: string | null
          project_management_mode_name: string | null
          project_manager_id: string | null
          project_manager_name: string | null
          project_oversight_leader_id: string | null
          project_oversight_leader_name: string | null
          project_party_secretary_id: string | null
          project_party_secretary_name: string | null
          project_risk_level_id: string | null
          project_risk_level_name: string | null
          project_safety_director_id: string | null
          project_safety_director_name: string | null
          project_status_id: string | null
          project_status_name: string | null
          project_sub_status_id: string | null
          project_sub_status_name: string | null
          project_sub_type_id: string | null
          project_sub_type_name: string | null
          project_type_id: string | null
          project_type_name: string | null
          province_name: string | null
          region_name: string | null
          schedule_end_date: string | null
          schedule_start_date: string | null
          sort_order: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_attention_level_timelin_project_attention_level_id_fkey"
            columns: ["project_attention_level_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_control_level_timeline_project_control_level_id_fkey"
            columns: ["project_control_level_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_management_mode_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_status_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_status_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_sub_type_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_type_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_section_list"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "project_risk_level_timeline_project_risk_level_id_fkey"
            columns: ["project_risk_level_id"]
            isOneToOne: false
            referencedRelation: "v_tunnel_list"
            referencedColumns: ["region_id"]
          },
        ]
      }
      v_project_picker: {
        Row: {
          full_name: string | null
          id: string | null
          name: string | null
          organization_name: string | null
          region_name: string | null
          status_name: string | null
        }
        Relationships: []
      }
      v_project_schedule_module: {
        Row: {
          project_id: string | null
          schedule_current: Json | null
          schedule_history: Json | null
        }
        Insert: {
          project_id?: string | null
          schedule_current?: never
          schedule_history?: never
        }
        Update: {
          project_id?: string | null
          schedule_current?: never
          schedule_history?: never
        }
        Relationships: []
      }
      v_section_detail: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string | null
          is_disabled: boolean | null
          line_mode: Database["proj"]["Enums"]["line_mode"] | null
          name: string | null
          organization_name: string | null
          project_name: string | null
          region_name: string | null
          remark: string | null
          short_name: string | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "sections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "sections_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["project_safety_director_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_chief_engineer_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_commercial_manager_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_discipline_inspection_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_manager_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_oversight_leader_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_party_secretary_id"]
          },
          {
            foreignKeyName: "sections_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["project_safety_director_id"]
          },
        ]
      }
      v_section_list: {
        Row: {
          id: string | null
          is_disabled: boolean | null
          line_mode: Database["proj"]["Enums"]["line_mode"] | null
          name: string | null
          organization_id: string | null
          organization_name: string | null
          project_id: string | null
          project_name: string | null
          region_id: string | null
          region_name: string | null
          remark: string | null
          short_name: string | null
          sort_order: number | null
          type: Database["proj"]["Enums"]["section_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_contract_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_schedule_module"
            referencedColumns: ["project_id"]
          },
        ]
      }
      v_section_picker: {
        Row: {
          id: string | null
          name: string | null
          project_name: string | null
          short_name: string | null
        }
        Relationships: []
      }
      v_tunnel_list: {
        Row: {
          adjustment: number | null
          alias_name: string | null
          end_chainage: number | null
          id: string | null
          is_disabled: boolean | null
          name: string | null
          prefix: string | null
          project_id: string | null
          project_name: string | null
          region_id: string | null
          region_name: string | null
          remark: string | null
          section_id: string | null
          section_name: string | null
          sort_order: number | null
          start_chainage: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_contract_module"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_picker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_project_schedule_module"
            referencedColumns: ["project_id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      advance_direction: "chainage_increase" | "chainage_decrease"
      line_mode: "single" | "double"
      section_type: "station" | "tunnel" | "depot" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_regions: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          full_name: string | null
          id: string
          is_disabled: boolean
          level: number
          name: string
          parent_code: string | null
          pinyin_code: string | null
          short_name: string | null
          sort_order: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          full_name?: string | null
          id?: string
          is_disabled?: boolean
          level: number
          name: string
          parent_code?: string | null
          pinyin_code?: string | null
          short_name?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          full_name?: string | null
          id?: string
          is_disabled?: boolean
          level?: number
          name?: string
          parent_code?: string | null
          pinyin_code?: string | null
          short_name?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_regions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "admin_regions_parent_code_fkey"
            columns: ["parent_code"]
            isOneToOne: false
            referencedRelation: "admin_regions"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "admin_regions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      countries: {
        Row: {
          alpha3_code: string | null
          code: string
          created_at: string | null
          created_by: string | null
          english_name: string | null
          id: string
          is_disabled: boolean
          name: string
          numeric_code: string | null
          sort_order: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          alpha3_code?: string | null
          code: string
          created_at?: string | null
          created_by?: string | null
          english_name?: string | null
          id?: string
          is_disabled?: boolean
          name: string
          numeric_code?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          alpha3_code?: string | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          english_name?: string | null
          id?: string
          is_disabled?: boolean
          name?: string
          numeric_code?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "countries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "countries_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      import_batches: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          failed_count: number | null
          finished_at: string | null
          id: string
          inserted_count: number | null
          skipped_count: number | null
          started_at: string | null
          status: string
          table_name: string
          total_count: number
          updated_at: string | null
          updated_by: string | null
          updated_count: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          failed_count?: number | null
          finished_at?: string | null
          id?: string
          inserted_count?: number | null
          skipped_count?: number | null
          started_at?: string | null
          status?: string
          table_name: string
          total_count: number
          updated_at?: string | null
          updated_by?: string | null
          updated_count?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          failed_count?: number | null
          finished_at?: string | null
          id?: string
          inserted_count?: number | null
          skipped_count?: number | null
          started_at?: string | null
          status?: string
          table_name?: string
          total_count?: number
          updated_at?: string | null
          updated_by?: string | null
          updated_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "import_batches_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "import_batches_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "import_batches_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      import_records: {
        Row: {
          batch_id: string | null
          created_at: string | null
          created_by: string | null
          data: Json | null
          deleted_at: string | null
          deleted_by: string | null
          external_version: number | null
          id: string
          message: string | null
          raw: Json | null
          status: string | null
          table_name: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          created_by?: string | null
          data?: Json | null
          deleted_at?: string | null
          deleted_by?: string | null
          external_version?: number | null
          id?: string
          message?: string | null
          raw?: Json | null
          status?: string | null
          table_name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          created_by?: string | null
          data?: Json | null
          deleted_at?: string | null
          deleted_by?: string | null
          external_version?: number | null
          id?: string
          message?: string | null
          raw?: Json | null
          status?: string | null
          table_name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "import_records_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "import_records_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "import_records_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      master_data: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          definition_id: string
          description: string | null
          id: string
          is_disabled: boolean
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          definition_id: string
          description?: string | null
          id?: string
          is_disabled?: boolean
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          definition_id?: string
          description?: string | null
          id?: string
          is_disabled?: boolean
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "master_data_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "master_data_definition_id_fkey"
            columns: ["definition_id"]
            isOneToOne: false
            referencedRelation: "master_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "master_data_definition_id_fkey"
            columns: ["definition_id"]
            isOneToOne: false
            referencedRelation: "v_master_options"
            referencedColumns: ["definition_id"]
          },
          {
            foreignKeyName: "master_data_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      master_definitions: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_disabled: boolean
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "master_definitions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "master_definitions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      stat_period_settings: {
        Row: {
          code: string
          created_at: string
          day_cutoff_time: string
          effective_from: string
          effective_to: string | null
          id: string
          month_start_day: number
          timezone: string
          week_start_dow: number
        }
        Insert: {
          code: string
          created_at?: string
          day_cutoff_time?: string
          effective_from: string
          effective_to?: string | null
          id?: string
          month_start_day?: number
          timezone?: string
          week_start_dow?: number
        }
        Update: {
          code?: string
          created_at?: string
          day_cutoff_time?: string
          effective_from?: string
          effective_to?: string | null
          id?: string
          month_start_day?: number
          timezone?: string
          week_start_dow?: number
        }
        Relationships: []
      }
    }
    Views: {
      v_master_options: {
        Row: {
          code: string | null
          definition_code: string | null
          definition_id: string | null
          definition_name: string | null
          description: string | null
          id: string | null
          name: string | null
        }
        Relationships: []
      }
      v_runtime_user: {
        Row: {
          employee_id: string | null
          favorite_projects: Json | null
          name: string | null
          org_path: unknown
          organization_id: string | null
          organization_ids: string[] | null
          permissions: string[] | null
          roles: string[] | null
          user_id: string | null
        }
        Relationships: []
      }
      v_user_favorite_projects: {
        Row: {
          icon: string | null
          id: string | null
          name: string | null
          url: string | null
        }
        Relationships: []
      }
      v_user_menu: {
        Row: {
          code: string | null
          created_at: string | null
          created_by: string | null
          icon: string | null
          id: string | null
          is_disabled: boolean | null
          is_leaf: boolean | null
          is_visible: boolean | null
          label: string | null
          level: number | null
          menu_scope: string | null
          name: string | null
          node_key: string | null
          parent_id: string | null
          path: unknown
          path_url: string | null
          permission_code: string | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          icon?: string | null
          id?: string | null
          is_disabled?: boolean | null
          is_leaf?: boolean | null
          is_visible?: boolean | null
          label?: string | null
          level?: number | null
          menu_scope?: string | null
          name?: string | null
          node_key?: string | null
          parent_id?: string | null
          path?: unknown
          path_url?: string | null
          permission_code?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          icon?: string | null
          id?: string | null
          is_disabled?: boolean | null
          is_leaf?: boolean | null
          is_visible?: boolean | null
          label?: string | null
          level?: number | null
          menu_scope?: string | null
          name?: string | null
          node_key?: string | null
          parent_id?: string | null
          path?: unknown
          path_url?: string | null
          permission_code?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menus_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "menus_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_user_menu"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menus_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_runtime_user"
            referencedColumns: ["employee_id"]
          },
        ]
      }
    }
    Functions: {
      bootstrap: { Args: { p_user_id: string }; Returns: undefined }
      text2ltree: { Args: { "": string }; Returns: unknown }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  rbac: {
    Tables: {
      permissions: {
        Row: {
          action: string
          code: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_disabled: boolean | null
          module: string
          name: string
          resource: string | null
          sort_order: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          action: string
          code: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean | null
          module: string
          name: string
          resource?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          action?: string
          code?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean | null
          module?: string
          name?: string
          resource?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permissions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_user_permissions"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "permissions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_user_permissions"
            referencedColumns: ["user_id"]
          },
        ]
      }
      post_data_scopes: {
        Row: {
          id: string
          post_id: string
          resource_id: string | null
          resource_type: string | null
          scope_type_id: string
          sort_order: number
        }
        Insert: {
          id?: string
          post_id: string
          resource_id?: string | null
          resource_type?: string | null
          scope_type_id: string
          sort_order?: number
        }
        Update: {
          id?: string
          post_id?: string
          resource_id?: string | null
          resource_type?: string | null
          scope_type_id?: string
          sort_order?: number
        }
        Relationships: []
      }
      post_roles: {
        Row: {
          id: string
          post_id: string
          role_id: string
          sort_order: number
        }
        Insert: {
          id?: string
          post_id: string
          role_id: string
          sort_order?: number
        }
        Update: {
          id?: string
          post_id?: string
          role_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: string
          permission_id: string
          role_id: string
        }
        Insert: {
          id?: string
          permission_id: string
          role_id: string
        }
        Update: {
          id?: string
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      role_scopes: {
        Row: {
          id: string
          organization_id: string | null
          role_id: string
          scope_type: string
        }
        Insert: {
          id?: string
          organization_id?: string | null
          role_id: string
          scope_type: string
        }
        Update: {
          id?: string
          organization_id?: string | null
          role_id?: string
          scope_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_scopes_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_disabled: boolean | null
          name: string
          sort_order: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean | null
          name: string
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean | null
          name?: string
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_user_permissions"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "roles_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_user_permissions"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_favorite_projects: {
        Row: {
          id: string
          is_disabled: boolean
          project_id: string
          sort_order: number
          user_id: string
        }
        Insert: {
          id?: string
          is_disabled?: boolean
          project_id: string
          sort_order?: number
          user_id: string
        }
        Update: {
          id?: string
          is_disabled?: boolean
          project_id?: string
          sort_order?: number
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          is_disabled: boolean
          role_id: string
          sort_order: number
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          is_disabled?: boolean
          role_id: string
          sort_order?: number
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          is_disabled?: boolean
          role_id?: string
          sort_order?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_user_permissions: {
        Row: {
          permission_code: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      current_role_ids: { Args: never; Returns: string[] }
      has_permission: { Args: { p_code: string }; Returns: boolean }
      is_super_admin: { Args: never; Returns: boolean }
      jwt_permissions: { Args: never; Returns: Json }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  realdata: {
    Tables: {
      shield_xre423: {
        Row: {
          b000000001: boolean | null
          b000000002: boolean | null
          id: number
          recorded_at: string
          s010101010: number | null
          s010102004: number | null
          s010103006: number | null
          s010109001: number | null
          s010111001: number | null
          s010114003: number | null
          s011306002: number | null
          s011311001: number | null
          s020901001: number | null
          s020901002: number | null
          s020901003: number | null
          s020901004: number | null
          s020901005: number | null
          s020901006: number | null
          s020901007: number | null
          s020901009: number | null
          s020901011: number | null
          s020901013: number | null
          s020901015: number | null
          s020906001: number | null
          s020906002: number | null
          s020906003: number | null
          s020906004: number | null
          s021711001: number | null
          s050001001: number | null
          s050001019: number | null
          s050001020: number | null
          s050001021: number | null
          s050001022: number | null
          s050006005: number | null
          s050006006: number | null
          s050006007: number | null
          s050006008: number | null
          s050006009: number | null
          s050006010: number | null
          s050009003: number | null
          s050109001: number | null
          s100100005: number | null
          s100100006: number | null
          s100100007: number | null
          s100100008: number | null
          s100111009: number | null
          s100111010: number | null
          s100111011: number | null
          s100111012: number | null
          s100206003: number | null
          s100206004: number | null
          s100206006: number | null
          s100206007: number | null
          s100206009: number | null
          s100206010: number | null
          tbm_code: string
        }
        Insert: {
          b000000001?: boolean | null
          b000000002?: boolean | null
          id?: never
          recorded_at: string
          s010101010?: number | null
          s010102004?: number | null
          s010103006?: number | null
          s010109001?: number | null
          s010111001?: number | null
          s010114003?: number | null
          s011306002?: number | null
          s011311001?: number | null
          s020901001?: number | null
          s020901002?: number | null
          s020901003?: number | null
          s020901004?: number | null
          s020901005?: number | null
          s020901006?: number | null
          s020901007?: number | null
          s020901009?: number | null
          s020901011?: number | null
          s020901013?: number | null
          s020901015?: number | null
          s020906001?: number | null
          s020906002?: number | null
          s020906003?: number | null
          s020906004?: number | null
          s021711001?: number | null
          s050001001?: number | null
          s050001019?: number | null
          s050001020?: number | null
          s050001021?: number | null
          s050001022?: number | null
          s050006005?: number | null
          s050006006?: number | null
          s050006007?: number | null
          s050006008?: number | null
          s050006009?: number | null
          s050006010?: number | null
          s050009003?: number | null
          s050109001?: number | null
          s100100005?: number | null
          s100100006?: number | null
          s100100007?: number | null
          s100100008?: number | null
          s100111009?: number | null
          s100111010?: number | null
          s100111011?: number | null
          s100111012?: number | null
          s100206003?: number | null
          s100206004?: number | null
          s100206006?: number | null
          s100206007?: number | null
          s100206009?: number | null
          s100206010?: number | null
          tbm_code: string
        }
        Update: {
          b000000001?: boolean | null
          b000000002?: boolean | null
          id?: never
          recorded_at?: string
          s010101010?: number | null
          s010102004?: number | null
          s010103006?: number | null
          s010109001?: number | null
          s010111001?: number | null
          s010114003?: number | null
          s011306002?: number | null
          s011311001?: number | null
          s020901001?: number | null
          s020901002?: number | null
          s020901003?: number | null
          s020901004?: number | null
          s020901005?: number | null
          s020901006?: number | null
          s020901007?: number | null
          s020901009?: number | null
          s020901011?: number | null
          s020901013?: number | null
          s020901015?: number | null
          s020906001?: number | null
          s020906002?: number | null
          s020906003?: number | null
          s020906004?: number | null
          s021711001?: number | null
          s050001001?: number | null
          s050001019?: number | null
          s050001020?: number | null
          s050001021?: number | null
          s050001022?: number | null
          s050006005?: number | null
          s050006006?: number | null
          s050006007?: number | null
          s050006008?: number | null
          s050006009?: number | null
          s050006010?: number | null
          s050009003?: number | null
          s050109001?: number | null
          s100100005?: number | null
          s100100006?: number | null
          s100100007?: number | null
          s100100008?: number | null
          s100111009?: number | null
          s100111010?: number | null
          s100111011?: number | null
          s100111012?: number | null
          s100206003?: number | null
          s100206004?: number | null
          s100206006?: number | null
          s100206007?: number | null
          s100206009?: number | null
          s100206010?: number | null
          tbm_code?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  runtime: {
    Tables: {
      parameter_alarm_history: {
        Row: {
          alarm_id: string
          alarm_value: number | null
          created_at: string | null
          event_type: string
          id: string
          occurred_at: string
          parameter_code: string
          severity: Database["tbm"]["Enums"]["alarm_severity"]
          tbm_code: string
        }
        Insert: {
          alarm_id: string
          alarm_value?: number | null
          created_at?: string | null
          event_type: string
          id?: string
          occurred_at: string
          parameter_code: string
          severity: Database["tbm"]["Enums"]["alarm_severity"]
          tbm_code: string
        }
        Update: {
          alarm_id?: string
          alarm_value?: number | null
          created_at?: string | null
          event_type?: string
          id?: string
          occurred_at?: string
          parameter_code?: string
          severity?: Database["tbm"]["Enums"]["alarm_severity"]
          tbm_code?: string
        }
        Relationships: []
      }
      parameter_alarms: {
        Row: {
          alarm_value: number | null
          chainage: number | null
          created_at: string | null
          id: string
          parameter_code: string
          ring_no: number | null
          severity: Database["tbm"]["Enums"]["alarm_severity"]
          tbm_code: string
          updated_at: string | null
        }
        Insert: {
          alarm_value?: number | null
          chainage?: number | null
          created_at?: string | null
          id?: string
          parameter_code: string
          ring_no?: number | null
          severity: Database["tbm"]["Enums"]["alarm_severity"]
          tbm_code: string
          updated_at?: string | null
        }
        Update: {
          alarm_value?: number | null
          chainage?: number | null
          created_at?: string | null
          id?: string
          parameter_code?: string
          ring_no?: number | null
          severity?: Database["tbm"]["Enums"]["alarm_severity"]
          tbm_code?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tbm_connection_status: {
        Row: {
          created_at: string
          is_online: boolean
          last_seen_at: string
          tbm_code: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          is_online?: boolean
          last_seen_at: string
          tbm_code: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          is_online?: boolean
          last_seen_at?: string
          tbm_code?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tbm_connection_status_history: {
        Row: {
          created_at: string
          end_at: string | null
          id: string
          remark: string | null
          source: string
          start_at: string
          status: string
          tbm_code: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          end_at?: string | null
          id?: string
          remark?: string | null
          source?: string
          start_at: string
          status: string
          tbm_code: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          end_at?: string | null
          id?: string
          remark?: string | null
          source?: string
          start_at?: string
          status?: string
          tbm_code?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tbm_daily_progress: {
        Row: {
          chainage_end: number | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          ring_end: number
          tbm_code: string
          updated_at: string | null
          updated_by: string | null
          work_date: string
        }
        Insert: {
          chainage_end?: number | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          ring_end: number
          tbm_code: string
          updated_at?: string | null
          updated_by?: string | null
          work_date: string
        }
        Update: {
          chainage_end?: number | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          ring_end?: number
          tbm_code?: string
          updated_at?: string | null
          updated_by?: string | null
          work_date?: string
        }
        Relationships: []
      }
      tbm_phase_records: {
        Row: {
          chainage: number | null
          created_at: string
          id: string
          phase_type: Database["tbm"]["Enums"]["tbm_phase_type"]
          ring_no: number | null
          started_at: string
          tbm_code: string
        }
        Insert: {
          chainage?: number | null
          created_at?: string
          id?: string
          phase_type: Database["tbm"]["Enums"]["tbm_phase_type"]
          ring_no?: number | null
          started_at: string
          tbm_code: string
        }
        Update: {
          chainage?: number | null
          created_at?: string
          id?: string
          phase_type?: Database["tbm"]["Enums"]["tbm_phase_type"]
          ring_no?: number | null
          started_at?: string
          tbm_code?: string
        }
        Relationships: []
      }
      tbm_risk_states: {
        Row: {
          chainage: number
          enter_distance: number
          exit_distance: number
          ring_no: number
          risk_id: string
          tbm_code: string
          updated_at: string
        }
        Insert: {
          chainage: number
          enter_distance: number
          exit_distance: number
          ring_no: number
          risk_id: string
          tbm_code: string
          updated_at?: string
        }
        Update: {
          chainage?: number
          enter_distance?: number
          exit_distance?: number
          ring_no?: number
          risk_id?: string
          tbm_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      tbm_runtime_state_current: {
        Row: {
          chainage: number | null
          created_at: string
          cutter_speed: number | null
          cutter_torque: number | null
          penetration_rate: number | null
          phase_type: Database["tbm"]["Enums"]["tbm_phase_type"]
          ring_no: number | null
          tbm_code: string
          thrust_cylinder_stroke: number | null
          thrust_pressure: number | null
          thrust_speed: number | null
          total_thrust: number | null
          updated_at: string | null
        }
        Insert: {
          chainage?: number | null
          created_at?: string
          cutter_speed?: number | null
          cutter_torque?: number | null
          penetration_rate?: number | null
          phase_type: Database["tbm"]["Enums"]["tbm_phase_type"]
          ring_no?: number | null
          tbm_code: string
          thrust_cylinder_stroke?: number | null
          thrust_pressure?: number | null
          thrust_speed?: number | null
          total_thrust?: number | null
          updated_at?: string | null
        }
        Update: {
          chainage?: number | null
          created_at?: string
          cutter_speed?: number | null
          cutter_torque?: number | null
          penetration_rate?: number | null
          phase_type?: Database["tbm"]["Enums"]["tbm_phase_type"]
          ring_no?: number | null
          tbm_code?: string
          thrust_cylinder_stroke?: number | null
          thrust_pressure?: number | null
          thrust_speed?: number | null
          total_thrust?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      v_tbm_daily_progress: {
        Row: {
          chainage_end: number | null
          chainage_start: number | null
          completed_length: number | null
          completed_ring_count: number | null
          id: string | null
          ring_end: number | null
          ring_start: number | null
          tbm_code: string | null
          work_date: string | null
        }
        Relationships: []
      }
      v_tbm_runtime_state: {
        Row: {
          chainage: number | null
          created_at: string | null
          cutter_speed: number | null
          cutter_torque: number | null
          heartbeat_is_online: boolean | null
          heartbeat_last_seen_at: string | null
          penetration_rate: number | null
          phase_type: Database["tbm"]["Enums"]["tbm_phase_type"] | null
          realdata_is_online: boolean | null
          realdata_last_seen_at: string | null
          ring_no: number | null
          tbm_code: string | null
          thrust_cylinder_stroke: number | null
          thrust_pressure: number | null
          thrust_speed: number | null
          total_thrust: number | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      fn_get_tbm_progress_period: {
        Args: { p_end_date?: string; p_start_date?: string }
        Returns: {
          completed_advance_meter: number
          completed_ring_count: number
          end_work_date: string
          plan_advance_meter: number
          plan_ring_count: number
          project_id: string
          project_name: string
          region_id: string
          region_name: string
          sort_order: number
          start_work_date: string
          tbm_code: string
          tbm_name: string
          tunnel_full_name: string
          tunnel_id: string
          tunnel_name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  system: {
    Tables: {
      bootstrap_state: {
        Row: {
          completed: boolean
          executed_at: string | null
          id: string
          version: string
        }
        Insert: {
          completed?: boolean
          executed_at?: string | null
          id?: string
          version: string
        }
        Update: {
          completed?: boolean
          executed_at?: string | null
          id?: string
          version?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string | null
          finished_at: string | null
          id: string
          job_type: string
          payload: Json | null
          started_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          finished_at?: string | null
          id?: string
          job_type: string
          payload?: Json | null
          started_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          finished_at?: string | null
          id?: string
          job_type?: string
          payload?: Json | null
          started_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      menus: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          icon: string | null
          id: string
          is_disabled: boolean
          is_leaf: boolean
          is_visible: boolean
          label: string
          level: number | null
          menu_scope: string
          name: string
          node_key: string
          parent_id: string | null
          path: unknown
          path_url: string | null
          permission_code: string | null
          sort_order: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          icon?: string | null
          id?: string
          is_disabled?: boolean
          is_leaf?: boolean
          is_visible?: boolean
          label: string
          level?: number | null
          menu_scope?: string
          name: string
          node_key: string
          parent_id?: string | null
          path: unknown
          path_url?: string | null
          permission_code?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          icon?: string | null
          id?: string
          is_disabled?: boolean
          is_leaf?: boolean
          is_visible?: boolean
          label?: string
          level?: number | null
          menu_scope?: string
          name?: string
          node_key?: string
          parent_id?: string | null
          path?: unknown
          path_url?: string | null
          permission_code?: string | null
          sort_order?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menus_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menus_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_menu_tree"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      versions: {
        Row: {
          deployed_at: string | null
          id: string
          version: string
        }
        Insert: {
          deployed_at?: string | null
          id?: string
          version: string
        }
        Update: {
          deployed_at?: string | null
          id?: string
          version?: string
        }
        Relationships: []
      }
    }
    Views: {
      v_menu_tree: {
        Row: {
          code: string | null
          has_children: boolean | null
          icon: string | null
          id: string | null
          is_disabled: boolean | null
          is_leaf: boolean | null
          is_visible: boolean | null
          label: string | null
          level: number | null
          menu_scope: string | null
          name: string | null
          node_key: string | null
          parent_id: string | null
          parent_path: string | null
          path: string | null
          path_url: string | null
          permission_code: string | null
          root_key: string | null
          sort_order: number | null
        }
        Insert: {
          code?: string | null
          has_children?: never
          icon?: string | null
          id?: string | null
          is_disabled?: boolean | null
          is_leaf?: boolean | null
          is_visible?: boolean | null
          label?: string | null
          level?: number | null
          menu_scope?: string | null
          name?: string | null
          node_key?: string | null
          parent_id?: string | null
          parent_path?: never
          path?: never
          path_url?: string | null
          permission_code?: string | null
          root_key?: never
          sort_order?: number | null
        }
        Update: {
          code?: string | null
          has_children?: never
          icon?: string | null
          id?: string | null
          is_disabled?: boolean | null
          is_leaf?: boolean | null
          is_visible?: boolean | null
          label?: string | null
          level?: number | null
          menu_scope?: string | null
          name?: string | null
          node_key?: string | null
          parent_id?: string | null
          parent_path?: never
          path?: never
          path_url?: string | null
          permission_code?: string | null
          root_key?: never
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "menus_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menus_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_menu_tree"
            referencedColumns: ["id"]
          },
        ]
      }
      v_tree_nodes: {
        Row: {
          code: string | null
          entity_type: string | null
          has_children: boolean | null
          id: string | null
          is_enabled: boolean | null
          is_leaf: boolean | null
          label: string | null
          level: number | null
          name: string | null
          node_key: string | null
          parent_id: string | null
          path: string | null
          sort_order: number | null
          tree_key: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      allowed_org_ids: { Args: never; Returns: string[] }
      attach_audit_triggers: { Args: { p_table: unknown }; Returns: undefined }
      bootstrap: { Args: { p_user_id: string }; Returns: undefined }
      current_employee_id: { Args: never; Returns: string }
      current_org_id: { Args: never; Returns: string }
      soft_delete: {
        Args: { p_ids: string[]; p_table: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  tbm: {
    Tables: {
      mqtt_acl: {
        Row: {
          action: string
          id: string
          permission: string
          topic: string
          username: string
        }
        Insert: {
          action: string
          id?: string
          permission: string
          topic: string
          username: string
        }
        Update: {
          action?: string
          id?: string
          permission?: string
          topic?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "mqtt_acl_username_fkey"
            columns: ["username"]
            isOneToOne: false
            referencedRelation: "mqtt_user"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "mqtt_acl_username_fkey"
            columns: ["username"]
            isOneToOne: false
            referencedRelation: "v_mqtt_users"
            referencedColumns: ["username"]
          },
        ]
      }
      mqtt_connection_sessions: {
        Row: {
          client_id: string | null
          connected_at: string
          disconnect_reason: string | null
          disconnected_at: string | null
          id: string
          mqtt_user_id: string
          remote_ip: unknown
          session_id: string | null
        }
        Insert: {
          client_id?: string | null
          connected_at?: string
          disconnect_reason?: string | null
          disconnected_at?: string | null
          id?: string
          mqtt_user_id: string
          remote_ip?: unknown
          session_id?: string | null
        }
        Update: {
          client_id?: string | null
          connected_at?: string
          disconnect_reason?: string | null
          disconnected_at?: string | null
          id?: string
          mqtt_user_id?: string
          remote_ip?: unknown
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mqtt_connection_sessions_mqtt_user_id_fkey"
            columns: ["mqtt_user_id"]
            isOneToOne: false
            referencedRelation: "mqtt_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mqtt_connection_sessions_mqtt_user_id_fkey"
            columns: ["mqtt_user_id"]
            isOneToOne: false
            referencedRelation: "v_mqtt_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mqtt_user: {
        Row: {
          created_at: string
          id: string
          is_enabled: boolean
          is_superuser: boolean
          password_hash: string
          salt: string
          tbm_code: string | null
          topic_prefix: string
          updated_at: string
          user_type: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_enabled?: boolean
          is_superuser?: boolean
          password_hash: string
          salt: string
          tbm_code?: string | null
          topic_prefix: string
          updated_at?: string
          user_type: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          is_enabled?: boolean
          is_superuser?: boolean
          password_hash?: string
          salt?: string
          tbm_code?: string | null
          topic_prefix?: string
          updated_at?: string
          user_type?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "mqtt_user_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "tbms"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "mqtt_user_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_detail"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "mqtt_user_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "mqtt_user_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_picker"
            referencedColumns: ["code"]
          },
        ]
      }
      mqtt_user_status: {
        Row: {
          client_id: string | null
          connected_at: string | null
          disconnect_reason: string | null
          disconnected_at: string | null
          is_online: boolean
          last_seen_at: string | null
          mqtt_user_id: string
          remote_ip: unknown
          session_id: string | null
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          connected_at?: string | null
          disconnect_reason?: string | null
          disconnected_at?: string | null
          is_online?: boolean
          last_seen_at?: string | null
          mqtt_user_id: string
          remote_ip?: unknown
          session_id?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          connected_at?: string | null
          disconnect_reason?: string | null
          disconnected_at?: string | null
          is_online?: boolean
          last_seen_at?: string | null
          mqtt_user_id?: string
          remote_ip?: unknown
          session_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mqtt_user_status_mqtt_user_id_fkey"
            columns: ["mqtt_user_id"]
            isOneToOne: true
            referencedRelation: "mqtt_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mqtt_user_status_mqtt_user_id_fkey"
            columns: ["mqtt_user_id"]
            isOneToOne: true
            referencedRelation: "v_mqtt_users"
            referencedColumns: ["id"]
          },
        ]
      }
      parameter_template_items: {
        Row: {
          is_required: boolean
          parameter_code: string
          sort_order: number
          template_id: number
        }
        Insert: {
          is_required?: boolean
          parameter_code: string
          sort_order?: number
          template_id: number
        }
        Update: {
          is_required?: boolean
          parameter_code?: string
          sort_order?: number
          template_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "parameter_template_items_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "parameters"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "parameter_template_items_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameter_template_items"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "parameter_template_items_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "parameter_template_items_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_picker"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "parameter_template_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "parameter_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parameter_template_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "v_parameter_templates_list"
            referencedColumns: ["id"]
          },
        ]
      }
      parameter_templates: {
        Row: {
          code: string
          diameter: number | null
          id: number
          is_default: boolean
          is_disabled: boolean
          name: string
          remark: string | null
          sort_order: number
          tbm_type_id: string
        }
        Insert: {
          code: string
          diameter?: number | null
          id?: never
          is_default?: boolean
          is_disabled?: boolean
          name: string
          remark?: string | null
          sort_order?: number
          tbm_type_id: string
        }
        Update: {
          code?: string
          diameter?: number | null
          id?: never
          is_default?: boolean
          is_disabled?: boolean
          name?: string
          remark?: string | null
          sort_order?: number
          tbm_type_id?: string
        }
        Relationships: []
      }
      parameter_threshold_rules: {
        Row: {
          id: number
          max_value: number | null
          min_value: number | null
          parameter_code: string
          reference_value: number | null
          remark: string | null
          severity: Database["tbm"]["Enums"]["alarm_severity"]
          threshold_type: Database["tbm"]["Enums"]["threshold_type"]
          threshold_value: number | null
        }
        Insert: {
          id?: number
          max_value?: number | null
          min_value?: number | null
          parameter_code: string
          reference_value?: number | null
          remark?: string | null
          severity: Database["tbm"]["Enums"]["alarm_severity"]
          threshold_type: Database["tbm"]["Enums"]["threshold_type"]
          threshold_value?: number | null
        }
        Update: {
          id?: number
          max_value?: number | null
          min_value?: number | null
          parameter_code?: string
          reference_value?: number | null
          remark?: string | null
          severity?: Database["tbm"]["Enums"]["alarm_severity"]
          threshold_type?: Database["tbm"]["Enums"]["threshold_type"]
          threshold_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "parameter_threshold_rules_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "parameters"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "parameter_threshold_rules_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameter_template_items"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "parameter_threshold_rules_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "parameter_threshold_rules_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_picker"
            referencedColumns: ["code"]
          },
        ]
      }
      parameters: {
        Row: {
          code: string
          data_type: string
          description: string | null
          digits: number
          is_disabled: boolean
          name: string
          sort_order: number
          subsystem_code: string
          unit: string | null
        }
        Insert: {
          code: string
          data_type: string
          description?: string | null
          digits?: number
          is_disabled?: boolean
          name: string
          sort_order?: number
          subsystem_code: string
          unit?: string | null
        }
        Update: {
          code?: string
          data_type?: string
          description?: string | null
          digits?: number
          is_disabled?: boolean
          name?: string
          sort_order?: number
          subsystem_code?: string
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parameters_subsystem_code_fkey"
            columns: ["subsystem_code"]
            isOneToOne: false
            referencedRelation: "subsystems"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "parameters_subsystem_code_fkey"
            columns: ["subsystem_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_picker"
            referencedColumns: ["subsystem_code"]
          },
        ]
      }
      plc_tags: {
        Row: {
          archive: boolean
          bit: number | null
          comment: string | null
          data_type: string
          id: number
          internal: string | null
          sort_order: number
          tag_name: string
          tbm_code: string
          unit: string | null
        }
        Insert: {
          archive?: boolean
          bit?: number | null
          comment?: string | null
          data_type: string
          id?: number
          internal?: string | null
          sort_order?: number
          tag_name: string
          tbm_code: string
          unit?: string | null
        }
        Update: {
          archive?: boolean
          bit?: number | null
          comment?: string | null
          data_type?: string
          id?: number
          internal?: string | null
          sort_order?: number
          tag_name?: string
          tbm_code?: string
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plc_tags_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "tbms"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "plc_tags_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_detail"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "plc_tags_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "plc_tags_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_picker"
            referencedColumns: ["code"]
          },
        ]
      }
      subsystems: {
        Row: {
          code: string
          description: string | null
          name: string
          sort_order: number | null
        }
        Insert: {
          code: string
          description?: string | null
          name: string
          sort_order?: number | null
        }
        Update: {
          code?: string
          description?: string | null
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      tbm_assignments: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          end_date: string | null
          id: string
          remark: string | null
          start_date: string
          tbm_code: string
          tunnel_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          end_date?: string | null
          id?: string
          remark?: string | null
          start_date: string
          tbm_code: string
          tunnel_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          end_date?: string | null
          id?: string
          remark?: string | null
          start_date?: string
          tbm_code?: string
          tunnel_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tbm_assignments_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "tbms"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_assignments_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_detail"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_assignments_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_assignments_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_picker"
            referencedColumns: ["code"]
          },
        ]
      }
      tbm_operation_modes: {
        Row: {
          operation_mode_id: string
          tbm_type_id: string
        }
        Insert: {
          operation_mode_id: string
          tbm_type_id: string
        }
        Update: {
          operation_mode_id?: string
          tbm_type_id?: string
        }
        Relationships: []
      }
      tbm_parameter_threshold_rules: {
        Row: {
          id: number
          max_value: number | null
          min_value: number | null
          parameter_code: string
          reference_value: number | null
          remark: string | null
          severity: Database["tbm"]["Enums"]["alarm_severity"]
          tbm_code: string
          threshold_type: Database["tbm"]["Enums"]["threshold_type"]
          threshold_value: number | null
        }
        Insert: {
          id?: number
          max_value?: number | null
          min_value?: number | null
          parameter_code: string
          reference_value?: number | null
          remark?: string | null
          severity: Database["tbm"]["Enums"]["alarm_severity"]
          tbm_code: string
          threshold_type: Database["tbm"]["Enums"]["threshold_type"]
          threshold_value?: number | null
        }
        Update: {
          id?: number
          max_value?: number | null
          min_value?: number | null
          parameter_code?: string
          reference_value?: number | null
          remark?: string | null
          severity?: Database["tbm"]["Enums"]["alarm_severity"]
          tbm_code?: string
          threshold_type?: Database["tbm"]["Enums"]["threshold_type"]
          threshold_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tbm_parameter_threshold_rules_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "parameters"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameter_threshold_rules_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameter_template_items"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameter_threshold_rules_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameter_threshold_rules_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_picker"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameter_threshold_rules_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "tbms"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameter_threshold_rules_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_detail"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameter_threshold_rules_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameter_threshold_rules_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_picker"
            referencedColumns: ["code"]
          },
        ]
      }
      tbm_parameters: {
        Row: {
          custom_name: string | null
          custom_unit: string | null
          id: number
          is_disabled: boolean
          parameter_code: string
          remark: string | null
          tbm_code: string
          value_max: number | null
          value_min: number | null
        }
        Insert: {
          custom_name?: string | null
          custom_unit?: string | null
          id?: number
          is_disabled?: boolean
          parameter_code: string
          remark?: string | null
          tbm_code: string
          value_max?: number | null
          value_min?: number | null
        }
        Update: {
          custom_name?: string | null
          custom_unit?: string | null
          id?: number
          is_disabled?: boolean
          parameter_code?: string
          remark?: string | null
          tbm_code?: string
          value_max?: number | null
          value_min?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tbm_parameters_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "parameters"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameter_template_items"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_picker"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "tbms"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_detail"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_picker"
            referencedColumns: ["code"]
          },
        ]
      }
      tbms: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          diameter: number | null
          external_id: string | null
          external_version: number | null
          is_disabled: boolean
          manage_code: string | null
          manufacturer_id: string
          model: string
          name: string
          power: number | null
          remark: string | null
          serial_no: string | null
          sort_order: number
          tbm_type_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          diameter?: number | null
          external_id?: string | null
          external_version?: number | null
          is_disabled?: boolean
          manage_code?: string | null
          manufacturer_id: string
          model: string
          name: string
          power?: number | null
          remark?: string | null
          serial_no?: string | null
          sort_order?: number
          tbm_type_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          diameter?: number | null
          external_id?: string | null
          external_version?: number | null
          is_disabled?: boolean
          manage_code?: string | null
          manufacturer_id?: string
          model?: string
          name?: string
          power?: number | null
          remark?: string | null
          serial_no?: string | null
          sort_order?: number
          tbm_type_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      tunnel_parameter_threshold_rules: {
        Row: {
          end_chainage: number | null
          end_ring_no: number | null
          id: number
          max_value: number | null
          min_value: number | null
          parameter_code: string
          reference_value: number | null
          remark: string | null
          severity: Database["tbm"]["Enums"]["alarm_severity"]
          start_chainage: number | null
          start_ring_no: number | null
          threshold_type: Database["tbm"]["Enums"]["threshold_type"]
          threshold_value: number | null
          tunnel_id: string
        }
        Insert: {
          end_chainage?: number | null
          end_ring_no?: number | null
          id?: number
          max_value?: number | null
          min_value?: number | null
          parameter_code: string
          reference_value?: number | null
          remark?: string | null
          severity: Database["tbm"]["Enums"]["alarm_severity"]
          start_chainage?: number | null
          start_ring_no?: number | null
          threshold_type: Database["tbm"]["Enums"]["threshold_type"]
          threshold_value?: number | null
          tunnel_id: string
        }
        Update: {
          end_chainage?: number | null
          end_ring_no?: number | null
          id?: number
          max_value?: number | null
          min_value?: number | null
          parameter_code?: string
          reference_value?: number | null
          remark?: string | null
          severity?: Database["tbm"]["Enums"]["alarm_severity"]
          start_chainage?: number | null
          start_ring_no?: number | null
          threshold_type?: Database["tbm"]["Enums"]["threshold_type"]
          threshold_value?: number | null
          tunnel_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tunnel_parameter_threshold_rules_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "parameters"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tunnel_parameter_threshold_rules_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameter_template_items"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tunnel_parameter_threshold_rules_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tunnel_parameter_threshold_rules_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_picker"
            referencedColumns: ["code"]
          },
        ]
      }
    }
    Views: {
      v_mqtt_users: {
        Row: {
          acl: Json | null
          client_id: string | null
          connected_at: string | null
          created_at: string | null
          disconnect_reason: string | null
          disconnected_at: string | null
          id: string | null
          is_enabled: boolean | null
          is_online: boolean | null
          is_superuser: boolean | null
          last_connected_at: string | null
          last_disconnect_reason: string | null
          last_disconnected_at: string | null
          last_seen_at: string | null
          remote_ip: unknown
          session_id: string | null
          tbm_code: string | null
          topic_prefix: string | null
          updated_at: string | null
          user_type: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mqtt_user_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "tbms"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "mqtt_user_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_detail"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "mqtt_user_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "mqtt_user_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_picker"
            referencedColumns: ["code"]
          },
        ]
      }
      v_parameter_template_items: {
        Row: {
          code: string | null
          data_type: string | null
          digits: number | null
          is_disabled: boolean | null
          name: string | null
          sort_order: number | null
          subsystem_code: string | null
          subsystem_name: string | null
          template_code: string | null
          template_id: number | null
          template_name: string | null
          unit: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parameter_template_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "parameter_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parameter_template_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "v_parameter_templates_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parameters_subsystem_code_fkey"
            columns: ["subsystem_code"]
            isOneToOne: false
            referencedRelation: "subsystems"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "parameters_subsystem_code_fkey"
            columns: ["subsystem_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_picker"
            referencedColumns: ["subsystem_code"]
          },
        ]
      }
      v_parameter_templates_list: {
        Row: {
          code: string | null
          diameter: number | null
          id: number | null
          is_default: boolean | null
          is_disabled: boolean | null
          name: string | null
          remark: string | null
          sort_order: number | null
          tbm_type_code: string | null
          tbm_type_id: string | null
          tbm_type_name: string | null
        }
        Relationships: []
      }
      v_parameter_threshold_rules_effective: {
        Row: {
          max_value: number | null
          min_value: number | null
          parameter_code: string | null
          reference_value: number | null
          remark: string | null
          rule_id: number | null
          rule_source: string | null
          severity: Database["tbm"]["Enums"]["alarm_severity"] | null
          tbm_code: string | null
          tbm_rule_id: number | null
          threshold_type: Database["tbm"]["Enums"]["threshold_type"] | null
          threshold_value: number | null
        }
        Relationships: []
      }
      v_parameters_list: {
        Row: {
          code: string | null
          data_type: string | null
          digits: number | null
          is_disabled: boolean | null
          name: string | null
          sort_order: number | null
          subsystem_code: string | null
          subsystem_name: string | null
          unit: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parameters_subsystem_code_fkey"
            columns: ["subsystem_code"]
            isOneToOne: false
            referencedRelation: "subsystems"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "parameters_subsystem_code_fkey"
            columns: ["subsystem_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_picker"
            referencedColumns: ["subsystem_code"]
          },
        ]
      }
      v_parameters_picker: {
        Row: {
          code: string | null
          name: string | null
          subsystem_code: string | null
          subsystem_name: string | null
        }
        Relationships: []
      }
      v_tbm_detail: {
        Row: {
          code: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          diameter: number | null
          external_id: string | null
          external_version: number | null
          is_disabled: boolean | null
          manage_code: string | null
          manufacturer_name: string | null
          model: string | null
          name: string | null
          power: number | null
          remark: string | null
          serial_no: string | null
          sort_order: number | null
          tbm_type_id: string | null
          tbm_type_name: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: []
      }
      v_tbm_list: {
        Row: {
          code: string | null
          diameter: number | null
          is_disabled: boolean | null
          manage_code: string | null
          manufacturer_id: string | null
          manufacturer_name: string | null
          model: string | null
          name: string | null
          power: number | null
          serial_no: string | null
          sort_order: number | null
          tbm_type_id: string | null
          tbm_type_name: string | null
        }
        Relationships: []
      }
      v_tbm_manufacturer_counts: {
        Row: {
          manufacturer_id: string | null
          tbm_count: number | null
        }
        Relationships: []
      }
      v_tbm_parameters: {
        Row: {
          custom_name: string | null
          custom_unit: string | null
          data_type: string | null
          digits: number | null
          id: number | null
          is_disabled: boolean | null
          parameter_code: string | null
          parameter_name: string | null
          remark: string | null
          subsystem_code: string | null
          subsystem_name: string | null
          tbm_code: string | null
          unit: string | null
          value_max: number | null
          value_min: number | null
        }
        Relationships: [
          {
            foreignKeyName: "parameters_subsystem_code_fkey"
            columns: ["subsystem_code"]
            isOneToOne: false
            referencedRelation: "subsystems"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "parameters_subsystem_code_fkey"
            columns: ["subsystem_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_picker"
            referencedColumns: ["subsystem_code"]
          },
          {
            foreignKeyName: "tbm_parameters_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "parameters"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameter_template_items"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_parameter_code_fkey"
            columns: ["parameter_code"]
            isOneToOne: false
            referencedRelation: "v_parameters_picker"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "tbms"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_detail"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_list"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tbm_parameters_tbm_code_fkey"
            columns: ["tbm_code"]
            isOneToOne: false
            referencedRelation: "v_tbm_picker"
            referencedColumns: ["code"]
          },
        ]
      }
      v_tbm_picker: {
        Row: {
          code: string | null
          diameter: number | null
          manage_code: string | null
          manufacturer_name: string | null
          name: string | null
          tbm_type_name: string | null
        }
        Relationships: []
      }
      v_tbm_type_counts: {
        Row: {
          tbm_count: number | null
          tbm_type_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      fn_get_tbm_param_history_by_ring: {
        Args: {
          p_fields: string[]
          p_from_ring: number
          p_tbm_code: string
          p_to_ring: number
          p_work_mode?: string
        }
        Returns: {
          data: Json
          ring: number
          ts: string
        }[]
      }
      fn_get_tbm_param_history_by_time: {
        Args: {
          p_fields: string[]
          p_from: string
          p_tbm_code: string
          p_to: string
          p_work_mode?: string
        }
        Returns: {
          data: Json
          ring: number
          ts: string
        }[]
      }
      fn_get_tbm_realdata_limits: {
        Args: { p_tbm_code: string }
        Returns: {
          max_ring: number
          max_time: string
          min_ring: number
          min_time: string
        }[]
      }
      fn_get_tbm_work_timeline: {
        Args: {
          p_end_at: string
          p_offline_gap_minutes?: number
          p_start_at: string
          p_tbm_code: string
        }
        Returns: {
          duration_seconds: number
          end_at: string
          id: string
          start_at: string
          type: string
          value: string
        }[]
      }
      sync_realdata_table: { Args: { p_tbm_code: string }; Returns: string }
    }
    Enums: {
      alarm_severity: "warning" | "critical" | "emergency"
      tbm_phase_type: "advance" | "assembly" | "stop" | "fault" | "unknown"
      threshold_type: "upper" | "lower" | "deviation" | "range"
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
  eqp: {
    Enums: {},
  },
  hr: {
    Enums: {},
  },
  proj: {
    Enums: {
      advance_direction: ["chainage_increase", "chainage_decrease"],
      line_mode: ["single", "double"],
      section_type: ["station", "tunnel", "depot", "other"],
    },
  },
  public: {
    Enums: {},
  },
  rbac: {
    Enums: {},
  },
  realdata: {
    Enums: {},
  },
  runtime: {
    Enums: {},
  },
  system: {
    Enums: {},
  },
  tbm: {
    Enums: {
      alarm_severity: ["warning", "critical", "emergency"],
      tbm_phase_type: ["advance", "assembly", "stop", "fault", "unknown"],
      threshold_type: ["upper", "lower", "deviation", "range"],
    },
  },
} as const

