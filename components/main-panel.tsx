'use client';

import type { Project, Task, Update } from '@/lib/types';
import { EmptyState } from './empty-state';
import { ProjectDetail } from './project-detail';

interface MainPanelProps {
  project: Project | null;
  onNewProject: () => void;
  onEditProject: () => void;
  onDeleteProject: () => void;
  onAddUpdate: () => void;
  onAddTask: () => void;
  onToggleTask: (taskId: string, done: boolean) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteUpdate: (updateId: string) => void;
}

export function MainPanel({
  project,
  onNewProject,
  onEditProject,
  onDeleteProject,
  onAddUpdate,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onDeleteUpdate,
}: MainPanelProps) {
  if (!project) {
    return <EmptyState onNewProject={onNewProject} />;
  }

  return (
    <ProjectDetail
      project={project}
      onEditProject={onEditProject}
      onDeleteProject={onDeleteProject}
      onAddUpdate={onAddUpdate}
      onAddTask={onAddTask}
      onToggleTask={onToggleTask}
      onDeleteTask={onDeleteTask}
      onDeleteUpdate={onDeleteUpdate}
    />
  );
}
