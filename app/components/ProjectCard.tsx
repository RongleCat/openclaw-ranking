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
    <div className="project-card">
      {/* Rank Badge */}
      <div className="rank-badge">{rank}</div>

      <div className="content">
        <div className="info">
          <a
            href={`https://github.com/${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 className="project-name">{name}</h3>
                {description && (
                  <p className="project-desc">{description}</p>
                )}
              </div>
              {badge && (
                <span className="badge">
                  {badge === '🆕' ? <Sparkles width={12} height={12} /> : <TrendingUp width={12} height={12} />}
                </span>
              )}
            </div>
          </a>
        </div>

        <div className="stats">
          {showStars && (
            <div className="stat">
              <div className="stat-icon" style={{ color: 'var(--color-primary)' }}>
                <Star width={16} height={16} fill="currentColor" />
              </div>
              <span className="stat-value">{stars.toLocaleString()}</span>
            </div>
          )}
          {showStars && forks !== undefined && (
            <div className="stat">
              <div className="stat-icon" style={{ color: 'var(--color-muted-foreground)' }}>
                <GitFork width={16} height={16} />
              </div>
              <span className="stat-value">{forks.toLocaleString()}</span>
            </div>
          )}
          {showTime && updated && (
            <div className="stat">
              <div className="stat-icon" style={{ color: 'var(--color-muted-foreground)' }}>
                <Clock width={16} height={16} />
              </div>
              <span className="stat-value mono">{updated}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
