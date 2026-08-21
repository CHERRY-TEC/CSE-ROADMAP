"use client";

import { useProgress } from "@/lib/hooks";
import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Coffee, Brain, Zap, Sparkles } from "lucide-react";

const presets = [
  { label: "Pomodoro", work: 25, break: 5, icon: Brain, gradient: "from-primary to-accent" },
  { label: "Short Focus", work: 15, break: 3, icon: Zap, gradient: "from-cyan to-primary" },
  { label: "Deep Work", work: 50, break: 10, icon: Coffee, gradient: "from-accent to-pink" },
];

export default function TimerPage() {
  const { focusSessions, incrementSessions } = useProgress();
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [isWork, setIsWork] = useState(true);
  const [timeLeft, setTimeLeft] = useState(presets[0].work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const preset = presets[selectedPreset];
  const totalSeconds = isWork ? preset.work * 60 : preset.break * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsWork(true);
    setTimeLeft(preset.work * 60);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [preset]);

  useEffect(() => {
    reset();
  }, [selectedPreset, reset]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (isWork) {
              incrementSessions();
              setIsWork(false);
              return preset.break * 60;
            } else {
              setIsWork(true);
              return preset.work * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isWork, preset, incrementSessions]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative mb-10 animate-slide-up">
        <div className="hero-gradient rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-warning" />
              <span className="text-xs text-warning font-medium uppercase tracking-widest">Pomodoro Timer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-gradient">Focus Timer</span>
            </h1>
            <p className="text-muted text-sm sm:text-base">Stay focused and productive with timed sessions</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-12 animate-slide-up stagger-1">
        {presets.map((p, i) => {
          const Icon = p.icon;
          return (
            <button key={p.label} onClick={() => { setSelectedPreset(i); setIsRunning(false); }} className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${selectedPreset === i ? `bg-gradient-to-r ${p.gradient} text-white shadow-lg shadow-primary/25 scale-105` : "glass border border-border text-muted hover:text-foreground hover:border-primary/20 hover:scale-[1.02]"}`}>
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{p.label}</span>
              <span className="sm:hidden">{p.work}m</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center mb-12 animate-slide-up stagger-2">
        <div className="relative w-56 h-56 sm:w-72 sm:h-72">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl" />
          <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="4" className="text-border/50" />
            <circle cx="100" cy="100" r="90" fill="none" stroke={`url(#timerGradient-${selectedPreset})`} strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]" />
            <defs>
              <linearGradient id={`timerGradient-${selectedPreset}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={selectedPreset === 0 ? "#6366f1" : selectedPreset === 1 ? "#06b6d4" : "#a855f7"} />
                <stop offset="100%" stopColor={selectedPreset === 0 ? "#a855f7" : selectedPreset === 1 ? "#6366f1" : "#ec4899"} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <span className="text-5xl sm:text-6xl font-bold text-foreground tabular-nums tracking-tight">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</span>
            <span className={`text-sm font-semibold mt-2 px-3 py-1 rounded-full ${isWork ? "bg-primary/10 text-primary" : "bg-success/10 text-success"}`}>{isWork ? "Focus Time" : "Break Time"}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-12 animate-slide-up stagger-3">
        <button onClick={() => setIsRunning(!isRunning)} className={`flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r ${preset.gradient} text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]`}>
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={reset} className="flex items-center gap-2 px-8 py-3.5 rounded-xl glass border border-border text-muted hover:text-foreground hover:border-primary/20 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]">
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      <div className="flex justify-center animate-slide-up stagger-4">
        <div className="glass stat-card rounded-2xl px-8 py-5 border border-border text-center">
          <p className="text-xs text-muted uppercase tracking-wider mb-1 font-semibold">Sessions Completed</p>
          <p className="text-4xl font-bold text-gradient">{focusSessions}</p>
          <p className="text-xs text-muted mt-1">{focusSessions * 25} minutes focused</p>
        </div>
      </div>
    </div>
  );
}
