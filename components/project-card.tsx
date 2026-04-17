'use client';

import { Clock } from 'lucide-react';
import type { Project } from '@/lib/types';
import { statusColors, statusLabels } from '@/lib/utils/colors';
import { isOverdue } from '@/lib/utils/dates';

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}

export function ProjectCard({ project, isSelected, onClick }: ProjectCardProps) {
  const colors = statusColors[project.status];
  const completedTasks = project.tasks.filter((t) => t.done).length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const hasBlocker = project.updates.some((u) => u.type === 'warning');
  const projectOverdue = isOverdue(project.date);

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border-l-4 transition-all ${colors.border} ${
        isSelected
          ? 'bg-atua-card ring-1 ring-atua-accent/30'
          : 'bg-atua-sidebar hover:bg-atua-card/50'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-sans font-medium text-atua-text text-sm leading-tight">
          {project.name}
        </h3>
        <div className="flex items-center gap-1.5 shrink-0">
          {hasBlocker && (
            <span className="w-2 h-2 rounded-full bg-atua-warning" title="Has blocker" />
          )}
          {projectOverdue && (
            <Clock size={14} className="text-atua-danger" />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
          {statusLabels[project.status]}
        </span>
        <span className="text-xs text-atua-text-dim">{project.client}</span>
      </div>

      {totalTasks > 0 && (
        <>
          <div className="w-full h-1.5 bg-atua-bg rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-atua-accent progress-bar rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-atua-text-dim">
            <span>{completedTasks} / {totalTasks} tasks</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </>
      )}
    </button>
  );
}
