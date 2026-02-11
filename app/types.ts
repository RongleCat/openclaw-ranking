export interface Project {
  id: number;
  full_name: string;
  stars: number;
  forks: number;
  updated_at: string;
  rank?: number;
  badge?: string;
  description?: string;
}

export interface RankingData {
  timestamp: string;
  projects: Project[];
}
