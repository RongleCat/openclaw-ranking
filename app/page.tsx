"use client";

import { useState, useEffect } from "react";
import { Star, Clock, TrendingUp, Sparkles, Github } from "lucide-react";
import type { Project, RankingData } from "./types";
import ProjectCard from "./components/ProjectCard";

type ViewType = "star" | "time";

export default function Home() {
  const [viewType, setViewType] = useState<ViewType>("star");
  const [starData, setStarData] = useState<RankingData | null>(null);
  const [timeData, setTimeData] = useState<RankingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [starRes, timeRes] = await Promise.all([
          fetch("/data/star-ranking.json"),
          fetch("/data/time-ranking.json"),
        ]);

        if (starRes.ok && timeRes.ok) {
          setStarData(await starRes.json());
          setTimeData(await timeRes.json());
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  }

  const currentData = viewType === "star" ? starData : timeData;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <h1 className="title" style={{
                fontSize: '3rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-secondary))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                🦞 OpenClaw 排行榜
              </h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-muted-foreground)', marginTop: '0.5rem' }}>
                GitHub OpenClaw 相关项目的实时数据追踪
              </p>
            </div>
            <a
              href="https://github.com/RongleCat/openclaw-ranking"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-github"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.875rem' }}
            >
              <Github width={20} height={20} />
              <span style={{ display: 'none' }} className="hidden-sm">源码</span>
            </a>
          </div>

          {/* View Toggle */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setViewType("star")}
              className="btn"
              style={{
                background: viewType === "star"
                  ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                  : 'var(--color-card)',
                color: viewType === "star" ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)',
                border: viewType === "star" ? 'transparent' : '1px solid var(--color-border)',
                boxShadow: viewType === "star" ? '0 10px 15px -3px rgba(217, 70, 239, 0.2)' : 'none'
              }}
            >
              <Star width={16} height={16} />
              <span>Star 排行榜</span>
            </button>
            <button
              onClick={() => setViewType("time")}
              className="btn"
              style={{
                background: viewType === "time"
                  ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                  : 'var(--color-card)',
                color: viewType === "time" ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)',
                border: viewType === "time" ? 'transparent' : '1px solid var(--color-border)',
                boxShadow: viewType === "time" ? '0 10px 15px -3px rgba(217, 70, 239, 0.2)' : 'none'
              }}
            >
              <Clock width={16} height={16} />
              <span>时间排行榜</span>
            </button>
          </div>

          {/* Update Time */}
          {currentData && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>
              <Sparkles width={16} height={16} />
              <span>
                更新时间：<span style={{ fontWeight: 500, color: 'var(--color-card-foreground)', marginLeft: '0.25rem' }}>{currentData.timestamp}</span>
              </span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p style={{ marginTop: '1rem', color: 'var(--color-muted-foreground)' }}>加载中...</p>
          </div>
        )}

        {/* Table Header */}
        {!loading && currentData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div className="card">
              <div className="table-header">
                <div style={{ gridColumn: 'span 1' }}>排名</div>
                <div style={{ gridColumn: 'span 5' }}>项目</div>
                {viewType === "star" ? (
                  <>
                    <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>Star</div>
                    <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>Fork</div>
                  </>
                ) : (
                  <>
                    <div style={{ gridColumn: 'span 3', textAlign: 'center' }}>最新更新</div>
                    <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>Star</div>
                  </>
                )}
              </div>

              {/* Project List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {currentData.projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    rank={index + 1}
                    name={project.full_name}
                    stars={project.stars}
                    forks={project.forks}
                    updated={formatDate(project.updated_at)}
                    description={
                      project.description ||
                      project.full_name.split("/")[1] ||
                      "暂无描述"
                    }
                    badge={project.badge}
                    showStars={true}
                    showTime={viewType === "time"}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        {!loading && currentData && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1.5rem 0', fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--color-border)' }}>
              <Sparkles width={16} height={16} />
              <span>新上榜</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--color-border)' }}>
              <TrendingUp width={16} height={16} />
              <span>排名上升</span>
            </span>
          </div>
        )}

        {/* Footer */}
        {!loading && currentData && (
          <footer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1.5rem 0', fontSize: '0.875rem', color: 'var(--color-muted-foreground)', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles width={16} height={16} />
              <span>由 Vercel 驱动 · 数据来源 GitHub API</span>
            </div>
            <div style={{ fontSize: '0.75rem' }}>
              Powered by Next.js · 原生 CSS · Lucide Icons
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
