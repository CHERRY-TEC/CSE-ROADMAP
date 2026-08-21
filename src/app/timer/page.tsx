"use client";

import { useProgress } from "@/lib/hooks";
import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Coffee, Brain, Zap } from "lucide-react";

const presets = [
  { label: "Pomodoro", work: 25, break: 5, icon: Brain },
  { label: "Short Focus", work: 15, break: 3, icon: Zap },
  { label: "Deep Work", work: 50, break: 10, icon: Coffee },
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
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Focus Timer</span>
        </h1>
        <p className="text-muted text-sm">Stay focused with Pomodoro technique</p>
      </div>

      <div className="flex justify-center gap-3 mb-10">
        {presets.map((p, i) => {
          const Icon = p.icon;
          return (
            <button key={p.label} onClick={() => { setSelectedPreset(i); setIsRunning(false); }} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedPreset === i ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20" : "glass border border-border text-muted hover:text-foreground hover:border-primary/20"}`}>
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{p.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="relative w-52 h-52 sm:w-64 sm:h-64">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="6" className="text-border" />
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#timerGradient)" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000" />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary, #6366f1)" />
                <stop offset="100%" stopColor="var(--color-accent, #a855f7)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl font-bold text-foreground tabular-nums">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</span>
            <span className={`text-sm font-medium mt-1 ${isWork ? "text-primary" : "text-success"}`}>{isWork ? "Focus Time" : "Break Time"}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-10">
        <button onClick={() => setIsRunning(!isRunning)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all">
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={reset} className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-muted hover:text-foreground hover:border-primary/20 font-medium transition-all">
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      <div className="flex justify-center">
        <div className="glass rounded-2xl px-6 py-4 border border-border text-center">
          <p className="text-xs text-muted uppercase tracking-wider mb-1 font-semibold">Sessions Completed</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{focusSessions}</p>
        </div>
      </div>
    </div>
  );
}
