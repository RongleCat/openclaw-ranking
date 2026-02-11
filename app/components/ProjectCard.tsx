import { Star, GitFork, Clock } from "lucide-react";

interface ProjectCardProps {
  rank: number;
  name: string;
  stars: number;
  forks?: number;
  updated?: string;
  description: string;
  badge?: string;
  showStars?: boolean;
  showTime?: boolean;
}

export default function ProjectCard({
  rank,
  name,
  stars,
  forks,
  updated,
  description,
  badge,
  showStars = true,
  showTime = false,
}: ProjectCardProps) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 p-4 hover:bg-card/50 transition-colors">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-8 text-sm font-mono text-muted-foreground shrink-0">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <a
            href={`https://github.com/${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary font-medium truncate block"
          >
            {name}
            {badge && <span className="ml-2">{badge}</span>}
          </a>
          <p className="text-sm text-muted-foreground truncate">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        {showStars && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4" />
            <span className="w-16">{stars.toLocaleString()}</span>
          </div>
        )}
        {showStars && forks !== undefined && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground hidden sm:flex">
            <GitFork className="w-4 h-4" />
            <span className="w-12">{forks.toLocaleString()}</span>
          </div>
        )}
        {showTime && updated && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="w-24">{updated}</span>
          </div>
        )}
      </div>
    </div>
  );
}
