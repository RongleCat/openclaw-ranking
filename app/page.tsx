"use client";

import { useState, useEffect } from "react";
import { Star, Clock } from "lucide-react";
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
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            🦞 OpenClaw 项目排行榜
          </h1>
          {currentData && (
            <div className="text-sm text-muted-foreground">
              更新时间: {currentData.timestamp}
            </div>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewType("star")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              viewType === "star"
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-card/80 text-muted-foreground"
            }`}
          >
            <Star className="w-4 h-4" />
            Star 排行榜
          </button>
          <button
            onClick={() => setViewType("time")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              viewType === "time"
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-card/80 text-muted-foreground"
            }`}
          >
            <Clock className="w-4 h-4" />
            时间排行榜
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 text-muted-foreground">
          加载中...
        </div>
      )}

      {/* Table Header */}
      {!loading && currentData && (
        <div className="bg-card rounded-lg border border-border">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border text-sm font-medium text-muted-foreground">
            <div className="w-8">排名</div>
            <div className="flex-1">项目</div>
            {viewType === "star" ? (
              <>
                <div className="w-16">Star</div>
                <div className="w-12 hidden sm:block">Fork</div>
              </>
            ) : (
              <>
                <div className="w-24">最新更新</div>
                <div className="w-16">Star</div>
              </>
            )}
          </div>

          {/* Project List */}
          <div>
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
      )}

      {/* Legend */}
      {!loading && currentData && (
        <div className="text-sm text-muted-foreground text-center">
          图标说明：⬆️ 排名上升 | 🆕 新上榜
        </div>
      )}
    </div>
  );
}
