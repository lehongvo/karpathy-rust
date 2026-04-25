export type Phase = "foundation" | "specialization" | "portfolio" | "interview";

export type TaskCategory =
  | "learn"
  | "build"
  | "certify"
  | "apply"
  | "interview-prep"
  | "real-interview";

export interface Task {
  id: string;
  category: TaskCategory;
  text: string;
  hours: number;
  resourceUrl?: string;
}

export interface MonthPlan {
  index: number;
  title: string;
  phase: Phase;
  hoursBudget: number;
  tasks: Task[];
  endOfMonthCheck: string[];
  redFlags: string[];
}

export interface PlanMeta {
  startDate: string;
  targetOfferDate: string;
  targetMonthlyUSD: number;
  weeklyHoursBudget: [number, number];
}

export type ResourceType = "book" | "course" | "cert" | "tool" | "doc";
export type ResourcePriority = "must" | "nice-to-have" | "skip";
export type ResourceStatus = "todo" | "doing" | "done";

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  priority: ResourcePriority;
  status: ResourceStatus;
  costUSD: number;
  url: string;
  note?: string;
}

export interface DecisionEntry {
  date: string;
  context: string;
  choice: string;
  outcome?: string;
}

export interface ProgressState {
  hoursPerDay: Record<string, number>;
  taskDone: Record<string, boolean>;
  applicationsSent: number;
  interviewsReached: number;
  resourcesStatus: Record<string, ResourceStatus>;
  lastUpdated: string;
}
