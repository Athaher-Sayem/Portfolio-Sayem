export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  fork: boolean;
  pushed_at: string;
  updated_at: string;
  created_at: string;
  topics: string[];
}

export interface Project extends GitHubRepo {
  featured: boolean;
  languageColor: string;
  lastUpdatedLabel: string;
}

export type ProjectsState =
  | { status: "loading" }
  | { status: "ok"; projects: Project[] }
  | { status: "fallback"; projects: Project[]; note: string }
  | { status: "error"; message: string };
