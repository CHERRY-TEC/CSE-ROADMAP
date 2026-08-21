"use client";

import { roadmapData } from "@/data/roadmap";
import { useProgress } from "@/lib/hooks";
import { useState } from "react";
import { CheckCircle2, Circle, Video, ExternalLink, Filter, ChevronDown, ChevronUp, BookOpen, Code2, Brain, Wrench, FolderKanban, MessageSquare } from "lucide-react";

const categoryIcons: Record<string, typeof BookOpen> = { programming: Code2, math: Brain, ml: Brain, tools: Wrench, projects: FolderKanban, interview: MessageSquare };
const categoryColors: Record<string, string> = { programming: "text-primary", math: "text-accent", ml: "text-success", tools: "text-warning", projects: "text-orange-400", interview: "text-pink-400" };
const difficultyColors: Record<string, string> = { beginner: "bg-success/10 text-success border-success/20", intermediate: "bg-warning/10 text-warning border-warning/20", advanced: "bg-error/10 text-error border-error/20" };

export default function RoadmapPage() {
  const { checkedItems, toggleItem } = useProgress();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = roadmapData.filter((item) => {
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    if (difficultyFilter !== "all" && item.difficulty !== difficultyFilter) return false;
    return true;
  });

  const years = [
    { label: "Year 1 - Foundations", range: [1, 12] },
    { label: "Year 2 - Core ML", range: [13, 24] },
    { label: "Year 3 - Advanced", range: [25, 36] },
    { label: "Year 4 - Placement", range: [37, 48] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">4-Year Roadmap</span>
        </h1>
        <p className="text-muted text-sm">Complete AI/ML internship preparation timeline</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted" />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:border-primary/50">
            <option value="all">All Categories</option>
            <option value="programming">Programming</option>
            <option value="math">Math</option>
            <option value="ml">ML/AI</option>
            <option value="tools">Tools</option>
            <option value="projects">Projects</option>
            <option value="interview">Interview</option>
          </select>
        </div>
        <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:border-primary/50">
          <option value="all">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="space-y-10">
        {years.map((year) => {
          const yearItems = filtered.filter((item) => item.month >= year.range[0] && item.month <= year.range[1]);
          if (yearItems.length === 0) return null;
          return (
            <div key={year.label}>
              <h2 className="text-xl font-bold mb-4 text-foreground">{year.label}</h2>
              <div className="relative pl-8 border-l-2 border-border space-y-4">
                {yearItems.map((item) => {
                  const Icon = categoryIcons[item.category] || BookOpen;
                  const isExpanded = expandedId === item.id;
                  const isChecked = checkedItems[item.id];
                  return (
                    <div key={item.id} className="relative animate-slide-up">
                      <div className={`absolute -left-[2.55rem] w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isChecked ? "bg-success border-success" : "bg-card border-border"}`}>
                        {isChecked && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <div className={`glass rounded-2xl border transition-all cursor-pointer ${isChecked ? "border-success/30 bg-success/5" : "border-border hover:border-primary/30"}`} onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                        <div className="p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <Icon className={`w-4 h-4 ${categoryColors[item.category]}`} />
                                <span className="text-xs text-muted">Month {item.month}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-lg border ${difficultyColors[item.difficulty]}`}>{item.difficulty}</span>
                                {item.teluguVideo && (
                                  <span className="text-xs px-2 py-0.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                                    <Video className="w-3 h-3" />
                                    Telugu
                                  </span>
                                )}
                              </div>
                              <h3 className="font-semibold text-foreground text-sm sm:text-base">{item.title}</h3>
                              <p className="text-xs text-muted mt-1">{item.description}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <button onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }} className="p-1.5 rounded-lg hover:bg-card transition-colors">
                                {isChecked ? <CheckCircle2 className="w-5 h-5 text-success" /> : <Circle className="w-5 h-5 text-muted" />}
                              </button>
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-muted" /> : <ChevronDown className="w-4 h-4 text-muted" />}
                            </div>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-border pt-4 animate-slide-up">
                            {item.teluguVideo && (
                              <div className="mb-4 p-3 rounded-xl bg-red-500/5 border border-red-500/20">
                                <p className="text-xs text-red-400 font-semibold mb-1 flex items-center gap-1.5">
                                  <Video className="w-3.5 h-3.5" />
                                  Telugu Video - {item.teluguVideo.channel}
                                </p>
                                <a href={item.teluguVideo.url} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/80 hover:text-primary flex items-center gap-1.5 transition-colors" onClick={(e) => e.stopPropagation()}>
                                  {item.teluguVideo.title}
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            )}
                            <p className="text-xs text-muted uppercase tracking-wider mb-2 font-semibold">Resources</p>
                            <div className="flex flex-wrap gap-2">
                              {item.resources.map((res) => (
                                <a key={res.name} href={res.url} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-lg bg-card border border-border text-foreground/80 hover:border-primary/30 hover:text-primary flex items-center gap-1.5 transition-all" onClick={(e) => e.stopPropagation()}>
                                  {res.name}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
