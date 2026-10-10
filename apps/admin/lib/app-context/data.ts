import type { AppTeam, FavoriteProject } from "./types"

export const appTeams: AppTeam[] = [
  {
    id: "company",
    name: "城通公司",
    type: "company",
    logo: "GalleryVerticalEnd",
  },
  {
    id: "region",
    name: "片区集群",
    type: "region",
    logo: "Map",
  },
  {
    id: "project",
    name: "项目部",
    type: "project",
    logo: "FolderKanban",
  },
]
export const favoriteProjects: FavoriteProject[] = [
  {
    id: "project-1",
    name: "XX项目",
    url: "/proj/projects/project-1",
    icon: "FolderKanban",
  },
]
