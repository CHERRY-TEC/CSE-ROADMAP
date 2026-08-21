"use client";

import { projectsData } from "@/data/projects";
import { useState } from "react";
import { FolderKanban, Clock, ChevronDown, ChevronUp, Lightbulb, Code2, Sparkles } from "lucide-react";

const difficultyColors: Record<string, string> = { beginner: "bg-success/10 text-success border-success/20", intermediate: "bg-warning/10 text-warning border-warning/20", advanced: "bg-error/10 text-error border-error/20" };

export default function ProjectsPage() {
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = projectsData.filter((p) => difficultyFilter === "all" || p.difficulty === difficultyFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative mb-10 animate-slide-up">
        <div className="hero-gradient rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-warning/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-warning" />
              <span className="text-xs text-warning font-medium uppercase tracking-widest">{projectsData.length} Projects</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-gradient">Project Ideas</span>
            </h1>
            <p className="text-muted text-sm sm:text-base">Build these projects to strengthen your portfolio</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-8 animate-slide-up stagger-1">
        <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground transition-all">
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project, i) => {
          const isExpanded = expandedId === project.id;
          return (
            <div key={project.id} className={`glass rounded-2xl border transition-all duration-300 cursor-pointer ${isExpanded ? "border-primary/30 card-glow" : "border-border hover:border-primary/20 hover:card-glow"}`} onClick={() => setExpandedId(isExpanded ? null : project.id)} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 border border-border">
                    <FolderKanban className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-lg border ${difficultyColors[project.difficulty]}`}>{project.difficulty}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted" /> : <ChevronDown className="w-4 h-4 text-muted" />}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{project.title}</h3>
                <p className="text-xs text-muted mb-3">{project.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{project.timeWeeks} weeks</span>
                  <span className="capitalize px-2 py-0.5 rounded-md bg-card border border-border">{project.category}</span>
                </div>
              </div>

              <div className="px-5 pb-4 border-t border-border pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill: string) => (
                    <span key={skill} className="text-xs px-2.5 py-0.5 rounded-lg bg-card border border-border text-muted hover:border-primary/20 transition-all">{skill}</span>
                  ))}
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 border-t border-border pt-4 animate-slide-up">
                  <p className="text-xs text-muted uppercase tracking-wider mb-3 font-semibold flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-warning" />
                    Implementation Ideas
                  </p>
                  <ul className="space-y-2.5">
                    {project.ideas.map((idea: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm">
                        <Code2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/80">{idea}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
