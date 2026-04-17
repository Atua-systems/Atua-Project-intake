'use client';

import { useState } from 'react';
import { Clock, Pencil, Trash2 } from 'lucide-react';
import type { Project } from '@/lib/types';
import { statusColors, statusLabels } from '@/lib/utils/colors';
import { formatDate, isOverdue } from '@/lib/utils/dates';
import { UpdatesFeed } from './updates-feed';
import { TasksList } from './tasks-list';

interface ProjectDetailProps {
  project: Project;
  onEditProject: () => void;
  onDeleteProject: () => void;
  onAddUpdate: () => void;
  onAddTask: () => void;
  onToggleTask: (taskId: string, done: boolean) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteUpdate: (updateId: string) => void;
}

type TabValue = 'updates' | 'tasks';

export function ProjectDetail({
  project,
  onEditProject,
  onDeleteProject,
  onAddUpdate,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onDeleteUpdate,
}: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<TabValue>('updates');
  const colors = statusColors[project.status];
  const projectOverdue = isOverdue(project.date);

  return (
    <div className="flex gap-6 h-full p-6">
      {/* Left Column - Project Metadata */}
      <div className="w-[30%] shrink-0">
        <div className="bg-atua-card rounded-lg p-6">
          {/* Tier Label */}
          <span className="text-xs text-atua-accent font-medium tracking-wide uppercase">
            {project.tier}
          </span>

          {/* Project Name */}
          <h1 className="font-display text-xl text-atua-text mt-2 mb-1 leading-tight">
            {project.name}
          </h1>

          {/* Client */}
          <p className="font-serif italic text-atua-text-dim text-lg mb-4">
            {project.client}
          </p>

          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}>
              {statusLabels[project.status]}
            </span>
          </div>

          {/* Value */}
          <div className="mb-4">
            <span className="text-xs text-atua-text-dim block mb-1">Value</span>
            <span className="font-serif text-2xl text-atua-accent">
              ${project.value.toLocaleString()}
            </span>
          </div>

          {/* Target Date */}
          <div className="mb-4">
            <span className="text-xs text-atua-text-dim block mb-1">Target Date</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${projectOverdue ? 'text-atua-danger' : 'text-atua-text'}`}>
                {formatDate(project.date)}
              </span>
              {projectOverdue && (
                <span className="flex items-center gap-1 text-xs text-atua-danger">
                  <Clock size={12} />
                  Overdue
                </span>
              )}
            </div>
          </div>

          {/* Direction/Goal */}
          <div className="mb-6">
            <span className="text-xs text-atua-text-dim block mb-1">Direction</span>
            <p className="font-serif italic text-atua-text text-sm leading-relaxed">
              {project.direction}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-atua-bg">
            <button
              onClick={onEditProject}
              className="flex items-center gap-2 px-4 py-2 text-sm text-atua-text-dim hover:text-atua-text bg-atua-bg hover:bg-atua-sidebar rounded transition-colors"
            >
              <Pencil size={14} />
              Edit
            </button>
            <button
              onClick={onDeleteProject}
              className="flex items-center gap-2 px-4 py-2 text-sm text-atua-text-dim hover:text-atua-danger bg-atua-bg hover:bg-atua-danger/10 rounded transition-colors"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Tabs */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tab Switcher */}
        <div className="flex gap-1 p-1 bg-atua-card rounded-lg mb-4 w-fit">
          <button
            onClick={() => setActiveTab('updates')}
            className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
              activeTab === 'updates'
                ? 'bg-atua-sidebar text-atua-text'
                : 'text-atua-text-dim hover:text-atua-text'
            }`}
          >
            Updates
            {project.updates.length > 0 && (
              <span className="ml-2 text-xs text-atua-text-dim">
                ({project.updates.length})
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
              activeTab === 'tasks'
                ? 'bg-atua-sidebar text-atua-text'
                : 'text-atua-text-dim hover:text-atua-text'
            }`}
          >
            Tasks
            {project.tasks.length > 0 && (
              <span className="ml-2 text-xs text-atua-text-dim">
                ({project.tasks.filter((t) => !t.done).length}/{project.tasks.length})
              </span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 bg-atua-sidebar rounded-lg p-4 overflow-hidden">
          {activeTab === 'updates' ? (
            <UpdatesFeed
              updates={project.updates}
              onAddUpdate={onAddUpdate}
              onDeleteUpdate={onDeleteUpdate}
            />
          ) : (
            <TasksList
              tasks={project.tasks}
              onAddTask={onAddTask}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}
