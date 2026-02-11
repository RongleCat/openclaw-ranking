import { Star, GitFork, Clock, TrendingUp, Sparkles } from "lucide-react";

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
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card hover:bg-card-hover hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      {/* Rank Badge */}
      <div className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground text-xs font-bold shadow-lg">
        {rank}
      </div>

      <div className="flex items-center justify-between pl-12 pr-4 py-4 gap-4">
        <div className="flex-1 min-w-0">
          <a
            href={`https://github.com/${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group/link"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-card-foreground group-hover/link:text-primary transition-colors">
                  {name}
                </h3>
                {description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {description}
                  </p>
                )}
              </div>
              {badge && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent text-accent-foreground text-xs font-medium">
                  {badge === '🆕' ? <Sparkles className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                </span>
              )}
            </div>
          </a>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {showStars && (
            <div className="flex flex-col items-center gap-1 bg-background/50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5 text-primary">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm font-semibold text-card-foreground">
                {stars.toLocaleString()}
              </span>
            </div>
          )}
          {showStars && forks !== undefined && (
            <div className="flex flex-col items-center gap-1 bg-background/50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <GitFork className="w-4 h-4" />
              </div>
              <span className="text-sm text-card-foreground">
                {forks.toLocaleString()}
              </span>
            </div>
          )}
          {showTime && updated && (
            <div className="flex flex-col items-center gap-1 bg-background/50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-sm text-card-foreground font-mono">
                {updated}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
