"use client";

import { interviewData } from "@/data/interview";
import { useState } from "react";
import { Search, Brain, Code2, Layers, Users, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle } from "lucide-react";

const categoryIcons: Record<string, typeof Brain> = { ml: Brain, coding: Code2, "system-design": Layers, behavioral: Users };
const categoryColors: Record<string, string> = { ml: "text-primary", coding: "text-success", "system-design": "text-warning", behavioral: "text-pink-400" };
const difficultyColors: Record<string, string> = { easy: "bg-success/10 text-success border-success/20", medium: "bg-warning/10 text-warning border-warning/20", hard: "bg-error/10 text-error border-error/20" };

export default function InterviewPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState<Record<string, boolean>>({});

  const filtered = interviewData.filter((q) => {
    if (search && !q.question.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryFilter !== "all" && q.category !== categoryFilter) return false;
    if (difficultyFilter !== "all" && q.difficulty !== difficultyFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Interview Prep</span>
        </h1>
        <p className="text-muted text-sm">ML, coding, system design & behavioral questions</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors" />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:border-primary/50">
          <option value="all">All Categories</option>
          <option value="ml">ML/AI</option>
          <option value="coding">Coding</option>
          <option value="system-design">System Design</option>
          <option value="behavioral">Behavioral</option>
        </select>
        <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:border-primary/50">
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((q) => {
          const Icon = categoryIcons[q.category] || Brain;
          const isExpanded = expandedId === q.id;
          return (
            <div key={q.id} className={`glass rounded-2xl border transition-all ${isExpanded ? "border-primary/30" : "border-border hover:border-primary/20"}`}>
              <div className="p-4 sm:p-5 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : q.id)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Icon className={`w-4 h-4 ${categoryColors[q.category]}`} />
                      <span className="text-xs px-2 py-0.5 rounded-lg bg-card border border-border text-muted capitalize">{q.category.replace("-", " ")}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-lg border ${difficultyColors[q.difficulty]}`}>{q.difficulty}</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">{q.question}</h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted" /> : <ChevronDown className="w-4 h-4 text-muted" />}
                  </div>
                </div>
              </div>
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-border pt-4 animate-slide-up">
                  <p className="text-sm text-foreground/80 leading-relaxed">{q.answer}</p>
                  <button onClick={(e) => { e.stopPropagation(); setAnswered((prev) => ({ ...prev, [q.id]: !prev[q.id] })); }} className={`mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${answered[q.id] ? "bg-success/10 text-success border border-success/20" : "bg-card border border-border text-muted hover:border-primary/30"}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {answered[q.id] ? "Reviewed" : "Mark as reviewed"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
