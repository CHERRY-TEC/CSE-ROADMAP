"use client";

import { useProgress } from "@/lib/hooks";
import { roadmapData } from "@/data/roadmap";
import { useState } from "react";
import { Target, TrendingUp, CheckCircle2, Clock, Plus, Trash2, Sparkles, Zap, Award, Calendar, ArrowRight, Star, Rocket, Brain, Code2, Trophy } from "lucide-react";

const quotes = [
  { text: "The future belongs to those who learn more skills and combine them in creative ways.", author: "Robert Greene" },
  { text: "Every expert was once a beginner.", author: "Helen Hayes" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "AI is the new electricity.", author: "Andrew Ng" },
];

export default function Dashboard() {
  const { progress, completedCount, totalItems, dailyGoals, addGoal, toggleGoal, removeGoal, completedGoals, focusSessions } = useProgress();
  const [newGoal, setNewGoal] = useState("");
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  const stats = [
    { label: "Progress", value: `${progress}%`, icon: TrendingUp, color: "primary", gradient: "from-primary to-blue-500" },
    { label: "Completed", value: `${completedCount}/${totalItems}`, icon: CheckCircle2, color: "success", gradient: "from-success to-emerald-500" },
    { label: "Focus Sessions", value: focusSessions, icon: Zap, color: "accent", gradient: "from-accent to-purple-500" },
    { label: "Goals Done", value: `${dailyGoals.filter((g) => completedGoals[g]).length}/${dailyGoals.length}`, icon: Award, color: "warning", gradient: "from-warning to-orange-500" },
  ];

  const milestones = [
    { month: 6, label: "6 Months", desc: "Python + DSA Mastered", icon: Code2, done: completedCount >= 6 },
    { month: 12, label: "1 Year", desc: "First ML Project", icon: Brain, done: completedCount >= 12 },
    { month: 24, label: "2 Years", desc: "Internship Ready", icon: Rocket, done: completedCount >= 24 },
    { month: 36, label: "3 Years", desc: "Advanced ML", icon: Star, done: completedCount >= 36 },
    { month: 48, label: "4 Years", desc: "Placement Champion", icon: Trophy, done: completedCount >= 30 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Hero Section */}
      <div className="relative mb-12 animate-slide-up">
        <div className="hero-gradient rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-accent/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success font-medium uppercase tracking-widest">Live Roadmap</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Welcome to{" "}
              <span className="text-gradient">InternPrep</span>
            </h1>
            
            <p className="text-muted text-lg sm:text-xl max-w-2xl mb-6 leading-relaxed">
              Your complete 4-year AI/ML internship preparation roadmap. Track progress, master skills, and land your dream internship.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="/roadmap" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/timer" className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-foreground font-semibold hover:border-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Zap className="w-4 h-4 text-warning" />
                Focus Mode
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="glass rounded-2xl p-6 mb-10 border border-border animate-slide-up stagger-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="text-foreground/80 text-sm italic leading-relaxed mb-1">"{quote.text}"</p>
            <p className="text-xs text-muted">— {quote.author}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`glass stat-card rounded-2xl p-5 border border-border hover:border-${stat.color}/30 transition-all hover:card-glow animate-slide-up stagger-${i + 1}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <span className="text-xs text-muted uppercase tracking-wider font-semibold">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              {stat.label === "Progress" && (
                <div className="mt-3 h-2 bg-card rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-700 ease-out`} style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Milestones Timeline */}
      <div className="glass rounded-2xl p-6 mb-10 border border-border animate-slide-up stagger-2">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warning" />
          Milestone Tracker
        </h2>
        <div className="relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
          <div className="flex justify-between relative">
            {milestones.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="flex flex-col items-center text-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all ${m.done ? "bg-gradient-to-br from-success to-emerald-500 shadow-lg shadow-success/20" : "bg-card border-2 border-border"}`}>
                    <Icon className={`w-4 h-4 ${m.done ? "text-white" : "text-muted"}`} />
                  </div>
                  <span className={`text-xs font-semibold ${m.done ? "text-success" : "text-muted"}`}>{m.label}</span>
                  <span className="text-[10px] text-muted hidden sm:block">{m.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Year Progress + Goals */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6 border border-border animate-slide-up stagger-3">
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Year-wise Progress
          </h2>
          <div className="space-y-4">
            {[
              { label: "Year 1 - Foundations", done: Math.min(completedCount, 12), total: 12, gradient: "from-primary to-blue-500", icon: "📘" },
              { label: "Year 2 - Core ML", done: Math.max(0, Math.min(completedCount - 12, 12)), total: 12, gradient: "from-accent to-purple-500", icon: "🧠" },
              { label: "Year 3 - Advanced", done: Math.max(0, Math.min(completedCount - 24, 8)), total: 8, gradient: "from-warning to-orange-500", icon: "🚀" },
              { label: "Year 4 - Placement", done: Math.max(0, completedCount - 32), total: 8, gradient: "from-success to-emerald-500", icon: "🏆" },
            ].map((year) => (
              <div key={year.label} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground/80 flex items-center gap-2">
                    <span>{year.icon}</span>
                    {year.label}
                  </span>
                  <span className="text-xs font-mono text-muted bg-card px-2 py-0.5 rounded-md">{year.done}/{year.total}</span>
                </div>
                <div className="h-2.5 bg-card rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${year.gradient} rounded-full transition-all duration-700 ease-out relative`} style={{ width: `${(year.done / year.total) * 100}%` }}>
                    <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-border animate-slide-up stagger-4">
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Daily Goals
          </h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newGoal.trim()) {
                  addGoal(newGoal.trim());
                  setNewGoal("");
                }
              }}
              placeholder="What will you accomplish today?"
              className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted transition-all"
            />
            <button
              onClick={() => {
                if (newGoal.trim()) {
                  addGoal(newGoal.trim());
                  setNewGoal("");
                }
              }}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {dailyGoals.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-2xl bg-card mx-auto mb-3 flex items-center justify-center">
                  <Target className="w-6 h-6 text-muted" />
                </div>
                <p className="text-sm text-muted">No goals yet. Add one above!</p>
              </div>
            )}
            {dailyGoals.map((goal, i) => (
              <div key={goal} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border group hover:border-primary/20 transition-all animate-scale-in" style={{ animationDelay: `${i * 50}ms` }}>
                <button onClick={() => toggleGoal(goal)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${completedGoals[goal] ? "bg-success border-success scale-110" : "border-border hover:border-primary hover:scale-110"}`}>
                  {completedGoals[goal] && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </button>
                <span className={`flex-1 text-sm transition-all ${completedGoals[goal] ? "line-through text-muted" : "text-foreground"}`}>{goal}</span>
                <button onClick={() => removeGoal(goal)} className="opacity-0 group-hover:opacity-100 text-muted hover:text-error transition-all hover:scale-110">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
