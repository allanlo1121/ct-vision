export interface ProjectImportRow {
  ctcemti_bltjzz_serial_id: string;
  project_id: string;

  group_id: string | null;
  org_id: string;

  finance_account_item: string;

  project_manage_model: string;

  project_fullname: string;
  project_name: string;
  project_code: string;

  is_outlands: string;

  project_country: string;
  project_province: string;
  project_city: string;
  project_county: string;

  project_address: string;

  project_long: number;
  project_lat: number;

  project_region: string;

  region_headquarters: string;
  region_user_id: string;

  company_org_id: string;

  parent_project_id: string;

  project_headquarters_id: string | null;

  region_leader_user_id: string;
  region_leader_phone: string;

  manager_user_id: string;
  manager_phone: string;

  guarantee_leader_user_id: string;
  guarantee_leader_phone: string;

  engineering_name: string;

  construction_unit_manage_user_id: string | null;
  construction_unit_manage_phone: string | null;

  project_state: string;
  project_sup_state: string;

  plan_type: string;

  project_manage_level: string;
  risk_level: string;

  owner_open_date: string | null;

  actual_start_date: string | null;
  actual_end_date: string | null;

  project_type: string;
  son_project_type: string;

  railway_admin: string | null;

  project_follow_type: string;
  son_project_follow_type: string | null;

  contract_amount: number | null;
  change_contract_amount: number | null;

  project_scale: string;
  project_overview: string;
  project_key_points: string;

  online_mode: string;

  contract_id: string | null;

  remark: string | null;

  dr: string;

  creater_date: string;
  creater_by: string;

  updater_by: string;
  updater_date: string;

  ts: string;

  secretary_user_id: string;
  secretary_phone: string;

  is_secret_related: string;

  safety_responsible_user_id: string;
  safety_responsible_phone: string;

  business_manager_user_id: string | null;
  business_manager_phone: string | null;

  technology_responsible_user_id: string;
  technology_responsible_phone: string;

  construction_unit_manage_user_name: string;

  create_by: string;
  create_date: string;

  update_by: string;
  update_date: string;

  audit_by: string | null;
  audit_date: string | null;
  audit_state: string | null;
  audit_opinion: string | null;

  business_state: string;

  effect_date: string | null;

  ctcemti_bltjzz_serial_version: string;
}
