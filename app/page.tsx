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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-6">
          {/* Title */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent pb-2">
                🦞 OpenClaw 排行榜
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mt-2">
                GitHub OpenClaw 相关项目的实时数据追踪
              </p>
            </div>
            <a
              href="https://github.com/RongleCat/openclaw-ranking"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors rounded-lg border border-border bg-card px-4 py-2 hover:border-primary/50"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">源码</span>
            </a>
          </div>

          {/* View Toggle */}
          <div className="flex gap-3">
            <button
              onClick={() => setViewType("star")}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                viewType === "star"
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card hover:bg-card-hover text-muted-foreground border border-border hover:border-primary/30"
              }`}
            >
              <Star className="w-4 h-4" />
              <span className="text-sm">Star 排行榜</span>
            </button>
            <button
              onClick={() => setViewType("time")}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                viewType === "time"
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card hover:bg-card-hover text-muted-foreground border border-border hover:border-primary/30"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm">时间排行榜</span>
            </button>
          </div>

          {/* Update Time */}
          {currentData && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span>
                更新时间：<span className="font-medium text-card-foreground ml-1">{currentData.timestamp}</span>
              </span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">加载中...</p>
          </div>
        )}

        {/* Table Header */}
        {!loading && currentData && (
          <div className="space-y-1">
            <div className="bg-gradient-to-r from-card to-card-hover rounded-2xl border border-border p-6 shadow-lg">
              <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-1">排名</div>
                <div className="col-span-5">项目</div>
                {viewType === "star" ? (
                  <>
                    <div className="col-span-2 text-center">Star</div>
                    <div className="col-span-2 text-center">Fork</div>
                  </>
                ) : (
                  <>
                    <div className="col-span-3 text-center">最新更新</div>
                    <div className="col-span-2 text-center">Star</div>
                  </>
                )}
              </div>

              {/* Project List */}
              <div className="space-y-2">
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
          <div className="flex items-center justify-center gap-4 py-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/50 border border-border">
              <Sparkles className="w-4 h-4" />
              <span>新上榜</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/50 border border-border">
              <TrendingUp className="w-4 h-4" />
              <span>排名上升</span>
            </span>
          </div>
        )}

        {/* Footer */}
        {!loading && currentData && (
          <footer className="flex flex-col items-center gap-2 py-6 text-sm text-muted-foreground border-t border-border">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>由 Vercel 驱动 · 数据来源 GitHub API</span>
            </div>
            <div className="text-xs">
              Powered by Next.js · Tailwind CSS · Lucide Icons
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
