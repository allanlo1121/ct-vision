export interface AppUser {
  name: string;
  email?: string | null;
  avatarUrl?: string | null;
}

export interface AppTeam {
  id: string;
  name: string;

  logo?: string | null;

  type?: string | null;

  description?: string | null;
}

export interface FavoriteProject {
  id: string;
  name: string;

  url: string;

  icon?: string | null;
}

export interface AppContextType {
  user: AppUser;

  teams: AppTeam[];

  favoriteProjects: FavoriteProject[];
}
