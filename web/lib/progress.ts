import type { ProgressState, ResourceStatus, TaskStatus, UIState } from "./types";

const KEY = "karpathy-rust:progress:v1";
const UI_KEY = "karpathy-rust:ui:v1";

const empty = (): ProgressState => ({
  hoursPerDay: {},
  taskDone: {},
  taskStatus: {},
  applicationsSent: 0,
  interviewsReached: 0,
  resourcesStatus: {},
  lastUpdated: new Date().toISOString(),
});

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    const base = empty();
    return {
      ...base,
      ...parsed,
      hoursPerDay: parsed.hoursPerDay ?? {},
      taskDone: parsed.taskDone ?? {},
      taskStatus: parsed.taskStatus ?? {},
      resourcesStatus: parsed.resourcesStatus ?? {},
    };
  } catch {
    return empty();
  }
}

export function saveProgress(p: ProgressState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    KEY,
    JSON.stringify({ ...p, lastUpdated: new Date().toISOString() })
  );
}

export function getTaskStatus(state: ProgressState, id: string): TaskStatus {
  if (state.taskStatus[id]) return state.taskStatus[id];
  if (state.taskDone[id]) return "done";
  return "todo";
}

export function setTaskStatus(id: string, status: TaskStatus): ProgressState {
  const p = loadProgress();
  p.taskStatus[id] = status;
  p.taskDone[id] = status === "done";
  saveProgress(p);
  return p;
}

export function logHours(date: string, hours: number): ProgressState {
  const p = loadProgress();
  p.hoursPerDay[date] = hours;
  saveProgress(p);
  return p;
}

export function setResourceStatus(id: string, status: ResourceStatus): ProgressState {
  const p = loadProgress();
  p.resourcesStatus[id] = status;
  saveProgress(p);
  return p;
}

export function incApplications(delta = 1): ProgressState {
  const p = loadProgress();
  p.applicationsSent = Math.max(0, p.applicationsSent + delta);
  saveProgress(p);
  return p;
}

export function incInterviews(delta = 1): ProgressState {
  const p = loadProgress();
  p.interviewsReached = Math.max(0, p.interviewsReached + delta);
  saveProgress(p);
  return p;
}

export function exportJSON(): string {
  return JSON.stringify(loadProgress(), null, 2);
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function streak(): number {
  const p = loadProgress();
  const days = Object.keys(p.hoursPerDay).sort().reverse();
  let s = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (const d of days) {
    const day = new Date(d);
    day.setHours(0, 0, 0, 0);
    const diff = Math.floor((today.getTime() - day.getTime()) / 86400000);
    if (diff === s && (p.hoursPerDay[d] ?? 0) > 0) s++;
    else break;
  }
  return s;
}

const emptyUI = (): UIState => ({ sidebarCollapsed: false });

export function loadUIState(): UIState {
  if (typeof window === "undefined") return emptyUI();
  try {
    const raw = window.localStorage.getItem(UI_KEY);
    return raw ? { ...emptyUI(), ...(JSON.parse(raw) as Partial<UIState>) } : emptyUI();
  } catch {
    return emptyUI();
  }
}

export function saveUIState(s: UIState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UI_KEY, JSON.stringify(s));
}
