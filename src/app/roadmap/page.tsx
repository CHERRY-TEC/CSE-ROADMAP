"use client";

import { roadmapData } from "@/data/roadmap";
import { useProgress } from "@/lib/hooks";
import { useState } from "react";
import { CheckCircle2, Circle, Video, ExternalLink, Filter, ChevronDown, ChevronUp, BookOpen, Code2, Brain, Wrench, FolderKanban, MessageSquare, Search, Sparkles } from "lucide-react";

const categoryIcons: Record<string, typeof BookOpen> = { programming: Code2, math: Brain, ml: Brain, tools: Wrench, projects: FolderKanban, interview: MessageSquare };
const categoryColors: Record<string, string> = { programming: "text-primary", math: "text-accent", ml: "text-success", tools: "text-warning", projects: "text-orange-400", interview: "text-pink-400" };
const difficultyColors: Record<string, string> = { beginner: "bg-success/10 text-success border-success/20", intermediate: "bg-warning/10 text-warning border-warning/20", advanced: "bg-error/10 text-error border-error/20" };

export default function RoadmapPage() {
  const { checkedItems, toggleItem } = useProgress();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = roadmapData.filter((item) => {
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    if (difficultyFilter !== "all" && item.difficulty !== difficultyFilter) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()) && !item.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const years = [
    { label: "Year 1 - Foundations", desc: "Python, DSA, Math, Tools", range: [1, 12], gradient: "from-primary to-blue-500" },
    { label: "Year 2 - Core ML", desc: "ML, DL, NLP, Projects", range: [13, 24], gradient: "from-accent to-purple-500" },
    { label: "Year 3 - Advanced", desc: "GenAI, MLOps, Research", range: [25, 36], gradient: "from-warning to-orange-500" },
    { label: "Year 4 - Placement", desc: "Interviews, Portfolio, Jobs", range: [37, 48], gradient: "from-success to-emerald-500" },
  ];

  const totalChecked = roadmapData.filter((item) => checkedItems[item.id]).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative mb-10 animate-slide-up">
        <div className="hero-gradient rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-warning" />
              <span className="text-xs text-warning font-medium uppercase tracking-widest">30 Topics</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-gradient">4-Year Roadmap</span>
            </h1>
            <p className="text-muted text-sm sm:text-base">Complete AI/ML internship preparation timeline</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="text-sm text-foreground">
                <span className="font-bold text-primary">{totalChecked}</span> <span className="text-muted">/ 30 completed</span>
              </div>
              <div className="h-2 w-32 bg-card rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" style={{ width: `${(totalChecked / 30) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8 animate-slide-up stagger-1">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search topics..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted transition-all" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted" />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground transition-all">
            <option value="all">All Categories</option>
            <option value="programming">Programming</option>
            <option value="math">Math</option>
            <option value="ml">ML/AI</option>
            <option value="tools">Tools</option>
            <option value="projects">Projects</option>
            <option value="interview">Interview</option>
          </select>
        </div>
        <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground transition-all">
          <option value="all">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="space-y-12">
        {years.map((year, yi) => {
          const yearItems = filtered.filter((item) => item.month >= year.range[0] && item.month <= year.range[1]);
          if (yearItems.length === 0) return null;
          const yearChecked = yearItems.filter((item) => checkedItems[item.id]).length;
          return (
            <div key={year.label} className={`animate-slide-up`} style={{ animationDelay: `${yi * 0.1}s` }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${year.gradient}`} />
                    {year.label}
                  </h2>
                  <p className="text-xs text-muted mt-0.5 ml-3">{year.desc}</p>
                </div>
                <span className="text-xs font-mono text-muted bg-card px-2.5 py-1 rounded-lg border border-border">{yearChecked}/{yearItems.length}</span>
              </div>
              <div className="relative pl-8 border-l-2 border-border space-y-4">
                {yearItems.map((item, ii) => {
                  const Icon = categoryIcons[item.category] || BookOpen;
                  const isExpanded = expandedId === item.id;
                  const isChecked = checkedItems[item.id];
                  return (
                    <div key={item.id} className="relative" style={{ animationDelay: `${ii * 0.05}s` }}>
                      <div className={`absolute -left-[2.55rem] w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isChecked ? "bg-success border-success shadow-lg shadow-success/30 scale-110" : "bg-card border-border hover:border-primary/50"}`}>
                        {isChecked && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <div className={`glass rounded-2xl border transition-all duration-300 cursor-pointer ${isChecked ? "border-success/30 bg-success/5 card-glow" : "border-border hover:border-primary/30 hover:card-glow"}`} onClick={() => setExpandedId(isExpanded ? null : item.id)}>
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
                              <button onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }} className="p-1.5 rounded-lg hover:bg-card transition-all hover:scale-110">
                                {isChecked ? <CheckCircle2 className="w-5 h-5 text-success" /> : <Circle className="w-5 h-5 text-muted hover:text-primary" />}
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
                                <a key={res.name} href={res.url} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-lg bg-card border border-border text-foreground/80 hover:border-primary/30 hover:text-primary flex items-center gap-1.5 transition-all hover:scale-[1.02]" onClick={(e) => e.stopPropagation()}>
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
