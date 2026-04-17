import type { ProjectStatus, UpdateType, TaskPriority } from '../types';

export const statusColors: Record<ProjectStatus, { border: string; bg: string; text: string }> = {
  active: {
    border: 'border-atua-success',
    bg: 'bg-atua-success/20',
    text: 'text-atua-success',
  },
  building: {
    border: 'border-atua-warning',
    bg: 'bg-atua-warning/20',
    text: 'text-atua-warning',
  },
  planning: {
    border: 'border-atua-info',
    bg: 'bg-atua-info/20',
    text: 'text-atua-info',
  },
  paused: {
    border: 'border-atua-text-dim',
    bg: 'bg-atua-text-dim/20',
    text: 'text-atua-text-dim',
  },
};

export const updateTypeColors: Record<UpdateType, { dot: string; border: string }> = {
  update: {
    dot: 'bg-atua-accent',
    border: 'border-transparent',
  },
  note: {
    dot: 'bg-atua-info',
    border: 'border-transparent',
  },
  warning: {
    dot: 'bg-atua-warning',
    border: 'border-atua-warning',
  },
};

export const priorityColors: Record<TaskPriority, { bg: string; text: string }> = {
  high: {
    bg: 'bg-atua-danger/20',
    text: 'text-atua-danger',
  },
  mid: {
    bg: 'bg-atua-warning/20',
    text: 'text-atua-warning',
  },
  low: {
    bg: 'bg-atua-text-dim/20',
    text: 'text-atua-text-dim',
  },
};

export const statusLabels: Record<ProjectStatus, string> = {
  active: 'Active',
  building: 'Building',
  planning: 'Planning',
  paused: 'Paused',
};
