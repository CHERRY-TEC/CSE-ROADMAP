"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, GraduationCap, Home, Map, BookOpen, FolderKanban, MessageSquare, Timer, Sparkles } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/interview", label: "Interview", icon: MessageSquare },
  { href: "/timer", label: "Focus", icon: Timer },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border glow-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all group-hover:scale-105">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-background animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-gradient">InternPrep</span>
              <span className="text-[10px] text-muted block -mt-0.5">AI/ML Roadmap</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-card/50 rounded-2xl px-2 py-1.5 border border-border/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all relative ${
                    isActive
                      ? "bg-gradient-to-r from-primary/15 to-accent/15 text-primary"
                      : "text-muted hover:text-foreground hover:bg-card"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20" />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a href="https://github.com/CHERRY-TEC/AIML-ROADMAP" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl glass border border-border text-muted hover:text-foreground hover:border-primary/20 text-sm transition-all">
              <Sparkles className="w-4 h-4" />
              <span className="hidden lg:inline">Star on GitHub</span>
            </a>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-muted hover:text-foreground hover:bg-card transition-all"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass-strong border-t border-border animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all animate-slide-up stagger-${i + 1} ${
                    isActive
                      ? "bg-gradient-to-r from-primary/15 to-accent/15 text-primary border border-primary/20"
                      : "text-muted hover:text-foreground hover:bg-card"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
