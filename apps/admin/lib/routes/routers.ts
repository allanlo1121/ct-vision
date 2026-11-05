export const routes = {
  organizations: {
    list: "/hrm/organizations",

    create: "/hrm/organizations/create",

    import: "/hrm/organizations/import",

    detail: (id: string) => `/hrm/organizations/${id}`,

    edit: (id: string) => `/hrm/organizations/${id}/edit`,
  },

  employees: {
    list: "/hrm/employees",

    create: "/hrm/employees/create",

    import: "/hrm/employees/import",

    detail: (id: string) => `/hrm/employees/${id}`,
    edit: (id: string) => `/hrm/employees/${id}/edit`,
  },

  projects: {
    list: "/proj/projects",
    create: "/proj/projects/create",
    import: "/proj/projects/import",
    detail: (id: string) => `/proj/projects/${id}`,
    edit: (id: string) => `/proj/projects/${id}/edit`,
  },
  sections: {
    list: "/proj/sections",
    create: "/proj/sections/create",
    import: "/proj/sections/import",
    detail: (id: string) => `/proj/sections/${id}`,
    edit: (id: string) => `/proj/sections/${id}/edit`,
  },
  tunnels: {
    list: "/proj/tunnels",
    create: "/proj/tunnels/create",
    import: "/proj/tunnels/import",
    detail: (id: string) => `/proj/tunnels/${id}`,
    edit: (id: string) => `/proj/tunnels/${id}/edit`,
    segments: (id: string) => `/proj/tunnels/${id}/segments`,
    status: (id: string) => `/proj/tunnels/${id}/status`,
    plans: (id: string) => `/proj/tunnels/${id}/plans`,
    risks: (id: string) => `/proj/tunnels/${id}/risks`,
  },

  tbms: {
    list: "/tbm/tbms",
    create: "tbmp/tbms/create",
    import: "/tbm/tbms/import",
    detail: (code: string) => `/tbm/tbms/${code}`,
    edit: (code: string) => `/tbm/tbms/${code}/edit`,
    runtime: (code: string) => `/tbm/tbms/${code}/runtime`,
  },
}
