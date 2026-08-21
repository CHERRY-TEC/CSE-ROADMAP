"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item));
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    });
  }, [key]);

  return [storedValue, setValue];
}

export function useProgress() {
  const [checkedItems, setCheckedItems] = useLocalStorage<Record<string, boolean>>("internprep-checked", {});
  const [dailyGoals, setDailyGoals] = useLocalStorage<string[]>("internprep-goals", []);
  const [completedGoals, setCompletedGoals] = useLocalStorage<Record<string, boolean>>("internprep-completed-goals", {});
  const [focusSessions, setFocusSessions] = useLocalStorage<number>("internprep-sessions", 0);

  const toggleItem = useCallback((id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, [setCheckedItems]);

  const addGoal = useCallback((goal: string) => {
    setDailyGoals((prev) => [...prev, goal]);
  }, [setDailyGoals]);

  const toggleGoal = useCallback((goal: string) => {
    setCompletedGoals((prev) => ({ ...prev, [goal]: !prev[goal] }));
  }, [setCompletedGoals]);

  const removeGoal = useCallback((goal: string) => {
    setDailyGoals((prev) => prev.filter((g) => g !== goal));
    setCompletedGoals((prev) => {
      const next = { ...prev };
      delete next[goal];
      return next;
    });
  }, [setDailyGoals, setCompletedGoals]);

  const incrementSessions = useCallback(() => {
    setFocusSessions((prev) => prev + 1);
  }, [setFocusSessions]);

  const totalItems = 30;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((completedCount / totalItems) * 100);

  return { checkedItems, toggleItem, dailyGoals, addGoal, toggleGoal, removeGoal, completedGoals, focusSessions, incrementSessions, progress, completedCount, totalItems };
}
