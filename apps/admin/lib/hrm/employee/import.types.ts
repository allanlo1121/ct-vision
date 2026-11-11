export type EmployeeImportRow = {
  ctcemti_bltjzz_serial_id: string;

  emp_id: string;
  emp_code: string;
  emp_name: string;

  emp_sex: string;
  emp_sex_transName?: string;

  emp_mail?: string;
  emp_idcard?: string;
  emp_birthday?: string; // ISO date

  emp_tel?: string;
  emp_mianaccount?: string;

  emp_type: string;
  emp_type_transName?: string;

  emp_bel_com?: string;
  emp_bel_com_transName?: string;

  emp_bel_dept?: string;
  emp_bel_dept_transName?: string;

  emp_bel_name?: string;
  emp_bel_name_transName?: string;

  emp_otherid?: string;

  emp_crux_post?: string;
  emp_crux_post_transName?: string;

  emp_education_level?: string;
  emp_education_level_transName?: string;

  emp_positional_titles?: string;
  emp_major?: string;

  emp_worktime?: string; // datetime

  emp_head_sculpture?: string | null;

  create_by?: string;
  create_by_transName?: string;
  create_date?: string;

  update_by?: string;
  update_by_transName?: string;
  update_date?: string;

  audit_by?: string | null;
  audit_by_transName?: string | null;
  audit_date?: string | null;
  audit_state?: string | null;
  audit_opinion?: string | null;

  business_state?: string;

  effect_date?: string;

  ctcemti_bltjzz_serial_version?: string;
};
