'use client';

import { useState } from 'react';
import type { Project, ProjectStatus } from '@/lib/types';
import { ProjectCard } from './project-card';

interface SidebarProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
  stats: {
    total: number;
    active: number;
    done: number;
    pipeline: number;
  };
}

type FilterValue = 'all' | ProjectStatus;

const filters: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'planning', label: 'Planning' },
  { value: 'paused', label: 'Paused' },
];

export function Sidebar({ projects, selectedProjectId, onSelectProject, stats }: SidebarProps) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.status === filter);

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-[280px] bg-atua-sidebar border-r border-atua-card flex flex-col">
      {/* Stats Header */}
      <div className="p-4 border-b border-atua-card">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="font-serif text-2xl text-atua-text">{stats.total}</div>
            <div className="text-xs text-atua-text-dim">Total</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-2xl text-atua-success">{stats.active}</div>
            <div className="text-xs text-atua-text-dim">Active</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-2xl text-atua-text">{stats.done}</div>
            <div className="text-xs text-atua-text-dim">Done</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-1.5 py-2 px-3 bg-atua-card rounded">
          <span className="font-serif text-xl text-atua-accent">
            ${stats.pipeline.toLocaleString()}
          </span>
          <span className="text-xs text-atua-text-dim">pipeline</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3 border-b border-atua-card">
        <div className="flex rounded-lg bg-atua-bg p-1 gap-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex-1 px-2 py-1.5 text-xs font-medium rounded transition-colors ${
                filter === f.value
                  ? 'bg-atua-card text-atua-text'
                  : 'text-atua-text-dim hover:text-atua-text'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-8 text-atua-text-dim text-sm">
            No projects found
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isSelected={project.id === selectedProjectId}
              onClick={() => onSelectProject(project.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
