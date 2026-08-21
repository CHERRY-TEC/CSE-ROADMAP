"use client";

import { resourcesData } from "@/data/resources";
import { useState } from "react";
import { ExternalLink, Search, BookOpen, Video, Globe, Wrench, GraduationCap, Sparkles } from "lucide-react";

const typeIcons: Record<string, typeof BookOpen> = { course: GraduationCap, book: BookOpen, youtube: Video, website: Globe, tool: Wrench };
const typeColors: Record<string, string> = { course: "text-primary", book: "text-accent", youtube: "text-red-400", website: "text-success", tool: "text-warning" };

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = [...new Set(resourcesData.map((r) => r.category))].sort();

  const filtered = resourcesData.filter((r) => {
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (categoryFilter !== "all" && r.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative mb-10 animate-slide-up">
        <div className="hero-gradient rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-warning" />
              <span className="text-xs text-warning font-medium uppercase tracking-widest">{resourcesData.length} Resources</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-gradient">Resources</span>
            </h1>
            <p className="text-muted text-sm sm:text-base">Curated courses, books, tools and websites for your AI/ML journey</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8 animate-slide-up stagger-1">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search resources..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted transition-all" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground transition-all">
          <option value="all">All Types</option>
          <option value="course">Courses</option>
          <option value="book">Books</option>
          <option value="youtube">YouTube</option>
          <option value="website">Websites</option>
          <option value="tool">Tools</option>
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground transition-all">
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((resource, i) => {
          const Icon = typeIcons[resource.type] || Globe;
          return (
            <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-5 border border-border hover:border-primary/30 transition-all group animate-slide-up card-glow" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center flex-shrink-0 border border-border group-hover:border-primary/20 transition-all">
                  <Icon className={`w-5 h-5 ${typeColors[resource.type]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">{resource.title}</h3>
                    <ExternalLink className="w-3.5 h-3.5 text-muted flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-card border border-border text-muted capitalize">{resource.type}</span>
                </div>
              </div>
              <p className="text-xs text-muted leading-relaxed">{resource.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-lg bg-card border border-border text-muted capitalize">{resource.category}</span>
                {resource.free && <span className="text-xs px-2 py-0.5 rounded-lg bg-success/10 text-success border border-success/20">Free</span>}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
