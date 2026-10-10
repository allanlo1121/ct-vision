
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  
  "api": {
          Tables: {
            [_ in never]: never
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "get_current_auth_context":
{ Args: Record<PropertyKey, never>; Returns: Json
                           }
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        },"iam": {
          Tables: {
            "permissions": {
                  Row: {
                    "action": string,"code": string,"created_at": string,"created_by": string | null,"description": string | null,"id": string,"is_disabled": boolean,"module": string,"name": string,"resource": string | null,"sort_order": number,"updated_at": string | null,"updated_by": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "action": string,"code": string,"created_at"?: string,"created_by"?: string | null,"description"?: string | null,"id"?: string,"is_disabled"?: boolean,"module": string,"name": string,"resource"?: string | null,"sort_order"?: number,"updated_at"?: string | null,"updated_by"?: string | null
                  }
                  Update: {
                    "action"?: string,"code"?: string,"created_at"?: string,"created_by"?: string | null,"description"?: string | null,"id"?: string,"is_disabled"?: boolean,"module"?: string,"name"?: string,"resource"?: string | null,"sort_order"?: number,"updated_at"?: string | null,"updated_by"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"role_permissions": {
                  Row: {
                    "created_at": string,"created_by": string | null,"id": string,"permission_id": string,"role_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"created_by"?: string | null,"id"?: string,"permission_id": string,"role_id": string
                  }
                  Update: {
                    "created_at"?: string,"created_by"?: string | null,"id"?: string,"permission_id"?: string,"role_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "role_permissions_permission_id_fkey"
      columns: ["permission_id"]
isOneToOne: false
      referencedRelation: "permissions"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "role_permissions_role_id_fkey"
      columns: ["role_id"]
isOneToOne: false
      referencedRelation: "roles"
      referencedColumns: ["id"]
    }
                  ]
                },"roles": {
                  Row: {
                    "code": string,"created_at": string,"created_by": string | null,"description": string | null,"id": string,"is_disabled": boolean,"name": string,"sort_order": number,"updated_at": string | null,"updated_by": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "code": string,"created_at"?: string,"created_by"?: string | null,"description"?: string | null,"id"?: string,"is_disabled"?: boolean,"name": string,"sort_order"?: number,"updated_at"?: string | null,"updated_by"?: string | null
                  }
                  Update: {
                    "code"?: string,"created_at"?: string,"created_by"?: string | null,"description"?: string | null,"id"?: string,"is_disabled"?: boolean,"name"?: string,"sort_order"?: number,"updated_at"?: string | null,"updated_by"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"user_profiles": {
                  Row: {
                    "avatar_path": string | null,"created_at": string,"display_name": string | null,"updated_at": string | null,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "avatar_path"?: string | null,"created_at"?: string,"display_name"?: string | null,"updated_at"?: string | null,"user_id": string
                  }
                  Update: {
                    "avatar_path"?: string | null,"created_at"?: string,"display_name"?: string | null,"updated_at"?: string | null,"user_id"?: string
                  }
                  Relationships: [
                    
                  ]
                },"user_roles": {
                  Row: {
                    "assigned_at": string,"assigned_by": string | null,"id": string,"is_disabled": boolean,"role_id": string,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "assigned_at"?: string,"assigned_by"?: string | null,"id"?: string,"is_disabled"?: boolean,"role_id": string,"user_id": string
                  }
                  Update: {
                    "assigned_at"?: string,"assigned_by"?: string | null,"id"?: string,"is_disabled"?: boolean,"role_id"?: string,"user_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "user_roles_role_id_fkey"
      columns: ["role_id"]
isOneToOne: false
      referencedRelation: "roles"
      referencedColumns: ["id"]
    }
                  ]
                }
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "get_current_auth_context":
{ Args: Record<PropertyKey, never>; Returns: Json
                           },
"has_permission":
{ Args: { "p_permission_code": string }; Returns: boolean
                           }
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        },"master_data": {
          Tables: {
            "admin_regions": {
                  Row: {
                    "code": string,"created_at": string | null,"created_by": string | null,"full_name": string,"is_disabled": boolean,"level": number,"name": string,"parent_code": string | null,"pinyin_code": string,"short_name": string,"updated_at": string | null,"updated_by": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "code": string,"created_at"?: string | null,"created_by"?: string | null,"full_name": string,"is_disabled"?: boolean,"level": number,"name": string,"parent_code"?: string | null,"pinyin_code": string,"short_name": string,"updated_at"?: string | null,"updated_by"?: string | null
                  }
                  Update: {
                    "code"?: string,"created_at"?: string | null,"created_by"?: string | null,"full_name"?: string,"is_disabled"?: boolean,"level"?: number,"name"?: string,"parent_code"?: string | null,"pinyin_code"?: string,"short_name"?: string,"updated_at"?: string | null,"updated_by"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "admin_regions_parent_code_fkey"
      columns: ["parent_code"]
isOneToOne: false
      referencedRelation: "admin_regions"
      referencedColumns: ["code"]
    }
                  ]
                },"countries": {
                  Row: {
                    "code": string,"created_at": string | null,"created_by": string | null,"full_name": string | null,"is_disabled": boolean,"name": string,"sort_order": number,"updated_at": string | null,"updated_by": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "code": string,"created_at"?: string | null,"created_by"?: string | null,"full_name"?: string | null,"is_disabled"?: boolean,"name": string,"sort_order"?: number,"updated_at"?: string | null,"updated_by"?: string | null
                  }
                  Update: {
                    "code"?: string,"created_at"?: string | null,"created_by"?: string | null,"full_name"?: string | null,"is_disabled"?: boolean,"name"?: string,"sort_order"?: number,"updated_at"?: string | null,"updated_by"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"dictionary_items": {
                  Row: {
                    "code": string,"created_at": string | null,"created_by": string | null,"description": string | null,"dictionary_type_code": string,"is_disabled": boolean,"name": string,"updated_at": string | null,"updated_by": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "code": string,"created_at"?: string | null,"created_by"?: string | null,"description"?: string | null,"dictionary_type_code": string,"is_disabled"?: boolean,"name": string,"updated_at"?: string | null,"updated_by"?: string | null
                  }
                  Update: {
                    "code"?: string,"created_at"?: string | null,"created_by"?: string | null,"description"?: string | null,"dictionary_type_code"?: string,"is_disabled"?: boolean,"name"?: string,"updated_at"?: string | null,"updated_by"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "dictionary_items_dictionary_type_code_fkey"
      columns: ["dictionary_type_code"]
isOneToOne: false
      referencedRelation: "dictionary_types"
      referencedColumns: ["code"]
    }
                  ]
                },"dictionary_types": {
                  Row: {
                    "code": string,"created_at": string | null,"created_by": string | null,"description": string | null,"is_disabled": boolean,"name": string,"updated_at": string | null,"updated_by": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "code": string,"created_at"?: string | null,"created_by"?: string | null,"description"?: string | null,"is_disabled"?: boolean,"name": string,"updated_at"?: string | null,"updated_by"?: string | null
                  }
                  Update: {
                    "code"?: string,"created_at"?: string | null,"created_by"?: string | null,"description"?: string | null,"is_disabled"?: boolean,"name"?: string,"updated_at"?: string | null,"updated_by"?: string | null
                  }
                  Relationships: [
                    
                  ]
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
        },"public": {
          Tables: {
            [_ in never]: never
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
        },"system": {
          Tables: {
            "menus": {
                  Row: {
                    "code": string,"created_at": string,"created_by": string | null,"icon": string | null,"id": string,"is_disabled": boolean,"is_visible": boolean,"menu_scope": string,"name": string,"parent_id": string | null,"path_url": string | null,"sort_order": number,"updated_at": string,"updated_by": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "code": string,"created_at"?: string,"created_by"?: string | null,"icon"?: string | null,"id"?: string,"is_disabled"?: boolean,"is_visible"?: boolean,"menu_scope"?: string,"name": string,"parent_id"?: string | null,"path_url"?: string | null,"sort_order"?: number,"updated_at"?: string,"updated_by"?: string | null
                  }
                  Update: {
                    "code"?: string,"created_at"?: string,"created_by"?: string | null,"icon"?: string | null,"id"?: string,"is_disabled"?: boolean,"is_visible"?: boolean,"menu_scope"?: string,"name"?: string,"parent_id"?: string | null,"path_url"?: string | null,"sort_order"?: number,"updated_at"?: string,"updated_by"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "menus_parent_id_fkey"
      columns: ["parent_id"]
isOneToOne: false
      referencedRelation: "menus"
      referencedColumns: ["id"]
    }
                  ]
                },"settings": {
                  Row: {
                    "created_at": string,"created_by": string | null,"description": string | null,"key": string,"updated_at": string | null,"updated_by": string | null,"value": NonNullable<Json>
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"created_by"?: string | null,"description"?: string | null,"key": string,"updated_at"?: string | null,"updated_by"?: string | null,"value": NonNullable<Json>
                  }
                  Update: {
                    "created_at"?: string,"created_by"?: string | null,"description"?: string | null,"key"?: string,"updated_at"?: string | null,"updated_by"?: string | null,"value"?: NonNullable<Json>
                  }
                  Relationships: [
                    
                  ]
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
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

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
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
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
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  "api": {
          Enums: {
            
          }
        },"iam": {
          Enums: {
            
          }
        },"master_data": {
          Enums: {
            
          }
        },"public": {
          Enums: {
            
          }
        },"system": {
          Enums: {
            
          }
        }
} as const
