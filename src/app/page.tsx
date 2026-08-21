"use client";

import { useProgress } from "@/lib/hooks";
import { roadmapData } from "@/data/roadmap";
import { useState } from "react";
import { Target, TrendingUp, CheckCircle2, Clock, Plus, Trash2, Sparkles, Zap, Award, Calendar } from "lucide-react";

const quotes = [
  "The future belongs to those who learn more skills and combine them in creative ways. - Robert Greene",
  "Every expert was once a beginner. - Helen Hayes",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
];

export default function Dashboard() {
  const { progress, completedCount, totalItems, dailyGoals, addGoal, toggleGoal, removeGoal, completedGoals, focusSessions } = useProgress();
  const [newGoal, setNewGoal] = useState("");
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  const year1Done = roadmapData.filter((r) => r.month <= 12 && completedCount > 0).length;
  const year2Done = roadmapData.filter((r) => r.month > 12 && r.month <= 24 && completedCount > 0).length;
  const year3Done = roadmapData.filter((r) => r.month > 24 && r.month <= 36 && completedCount > 0).length;
  const year4Done = roadmapData.filter((r) => r.month > 36 && completedCount > 0).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Welcome to <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">InternPrep</span>
        </h1>
        <p className="text-muted text-sm sm:text-base">Your 4-year AI/ML internship preparation roadmap</p>
      </div>

      <div className="glass rounded-2xl p-5 mb-8 border border-border animate-float">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <p className="text-foreground/80 text-sm italic leading-relaxed">{quote}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-2xl p-5 border border-border hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted uppercase tracking-wider font-semibold">Progress</span>
          </div>
          <div className="text-3xl font-bold text-foreground">{progress}%</div>
          <div className="mt-2 h-2 bg-card rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-border hover:border-success/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <span className="text-xs text-muted uppercase tracking-wider font-semibold">Completed</span>
          </div>
          <div className="text-3xl font-bold text-foreground">{completedCount}<span className="text-lg text-muted">/{totalItems}</span></div>
          <p className="text-xs text-muted mt-1">topics finished</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border hover:border-accent/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xs text-muted uppercase tracking-wider font-semibold">Focus</span>
          </div>
          <div className="text-3xl font-bold text-foreground">{focusSessions}</div>
          <p className="text-xs text-muted mt-1">pomodoro sessions</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border hover:border-warning/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-warning" />
            </div>
            <span className="text-xs text-muted uppercase tracking-wider font-semibold">Streak</span>
          </div>
          <div className="text-3xl font-bold text-foreground">{dailyGoals.filter((g) => completedGoals[g]).length}<span className="text-lg text-muted">/{dailyGoals.length}</span></div>
          <p className="text-xs text-muted mt-1">goals today</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6 border border-border">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Year-wise Progress
          </h2>
          <div className="space-y-3">
            {[
              { label: "Year 1 - Foundations", done: Math.min(completedCount, 12), total: 12, color: "from-primary to-blue-500" },
              { label: "Year 2 - Core ML", done: Math.max(0, Math.min(completedCount - 12, 12)), total: 12, color: "from-accent to-purple-500" },
              { label: "Year 3 - Advanced", done: Math.max(0, Math.min(completedCount - 24, 8)), total: 8, color: "from-warning to-orange-500" },
              { label: "Year 4 - Placement", done: Math.max(0, completedCount - 32), total: 8, color: "from-success to-emerald-500" },
            ].map((year) => (
              <div key={year.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground/80">{year.label}</span>
                  <span className="text-muted">{year.done}/{year.total}</span>
                </div>
                <div className="h-2 bg-card rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${year.color} rounded-full transition-all duration-500`} style={{ width: `${(year.done / year.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-border">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
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
              placeholder="Add a goal for today..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button
              onClick={() => {
                if (newGoal.trim()) {
                  addGoal(newGoal.trim());
                  setNewGoal("");
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {dailyGoals.length === 0 && (
              <p className="text-sm text-muted text-center py-6">No goals yet. Add one above!</p>
            )}
            {dailyGoals.map((goal) => (
              <div key={goal} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border group hover:border-primary/20 transition-colors">
                <button onClick={() => toggleGoal(goal)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${completedGoals[goal] ? "bg-success border-success" : "border-border hover:border-primary"}`}>
                  {completedGoals[goal] && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </button>
                <span className={`flex-1 text-sm ${completedGoals[goal] ? "line-through text-muted" : "text-foreground"}`}>{goal}</span>
                <button onClick={() => removeGoal(goal)} className="opacity-0 group-hover:opacity-100 text-muted hover:text-error transition-all">
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
