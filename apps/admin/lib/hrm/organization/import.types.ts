export type OrganizationImportRow = {
  ctcemti_bltjzz_serial_id: string;

  org_id: string;
  org_code: string;
  org_financial_code: string | null;

  org_name: string;
  org_short: string;
  org_parent: string | null;
  org_type: string;

  org_full_path: string;

  org_province: string | null;
  org_city: string | null;
  org_county: string | null;

  org_address: string | null;
  org_address_lat: number | null;
  org_address_lon: number | null;

  org_foreign_org: string | null;
  org_country: string;

  org_subordinate: string | null;

  org_online: string | null;
  org_account: string | null;
  org_business: string | null;
  org_number: string | null;
  org_full_id: string;

  create_by: string | null;
  create_date: string;

  update_by: string | null;
  update_date: string;

  audit_by: string | null;
  audit_date: string | null;

  audit_state: string | null;
  audit_opinion: string | null;
  business_state: string | null;
  effect_date: string | null;

  ctcemti_bltjzz_serial_version: string;
  org_online_transName: string | null;
  org_county_transName: string | null;
  org_parent_transName: string | null;

  org_country_transName: string | null;
  org_city_transName: string | null;
  org_province_transName: string | null;
  org_subordinate_transName: string | null;
  org_type_transName: string | null;
  org_financial_code_transName: string | null;
  org_foreign_org_transName: string | null;
  org_business_transName: string | null;
  create_by_transName: string | null;
  update_by_transName: string | null;
  audit_by_transName: string | null;
};
