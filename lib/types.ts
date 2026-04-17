export type ProjectStatus = 'planning' | 'building' | 'active' | 'paused';
export type ProjectTier = 'Tier 1 — Presence' | 'Tier 2 — Engine' | 'Tier 3 — Collective' | 'Internal';
export type UpdateType = 'update' | 'note' | 'warning';
export type TaskPriority = 'high' | 'mid' | 'low';

export interface Update {
  id: string;
  text: string;
  type: UpdateType;
  date: string;
}

export interface Task {
  id: string;
  text: string;
  done: boolean;
  priority: TaskPriority;
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  tier: ProjectTier;
  value: number;
  date: string;
  direction: string;
  updates: Update[];
  tasks: Task[];
}

export interface DeletedItem {
  type: 'project' | 'task' | 'update';
  item: Project | Task | Update;
  projectId?: string;
  timestamp: number;
}
