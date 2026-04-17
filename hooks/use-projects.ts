'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Project, Task, Update, DeletedItem } from '@/lib/types';
import { seedProjects } from '@/lib/seed-data';

const STORAGE_KEY = 'atua_projects_v1';
const UNDO_TIMEOUT = 5000;

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [deletedItem, setDeletedItem] = useState<DeletedItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProjects(parsed);
      } catch {
        setProjects(seedProjects);
      }
    } else {
      setProjects(seedProjects);
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects, isLoaded]);

  // Auto-clear undo after timeout
  useEffect(() => {
    if (deletedItem) {
      const timer = setTimeout(() => {
        setDeletedItem(null);
      }, UNDO_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [deletedItem]);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;

  // Project CRUD
  const addProject = useCallback((project: Omit<Project, 'id' | 'updates' | 'tasks'>) => {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      updates: [],
      tasks: [],
    };
    setProjects((prev) => [...prev, newProject]);
    setSelectedProjectId(newProject.id);
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deleteProject = useCallback((id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setDeletedItem({ type: 'project', item: project, timestamp: Date.now() });
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (selectedProjectId === id) {
        setSelectedProjectId(null);
      }
    }
  }, [projects, selectedProjectId]);

  // Task CRUD
  const addTask = useCallback((projectId: string, task: Omit<Task, 'id'>) => {
    const newTask: Task = { ...task, id: `task-${Date.now()}` };
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, tasks: [...p.tasks, newTask] } : p
      )
    );
  }, []);

  const updateTask = useCallback((projectId: string, taskId: string, updates: Partial<Task>) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
            }
          : p
      )
    );
  }, []);

  const deleteTask = useCallback((projectId: string, taskId: string) => {
    const project = projects.find((p) => p.id === projectId);
    const task = project?.tasks.find((t) => t.id === taskId);
    if (task) {
      setDeletedItem({ type: 'task', item: task, projectId, timestamp: Date.now() });
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
            : p
        )
      );
    }
  }, [projects]);

  // Update CRUD
  const addUpdate = useCallback((projectId: string, update: Omit<Update, 'id'>) => {
    const newUpdate: Update = { ...update, id: `upd-${Date.now()}` };
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, updates: [...p.updates, newUpdate] } : p
      )
    );
  }, []);

  const deleteUpdate = useCallback((projectId: string, updateId: string) => {
    const project = projects.find((p) => p.id === projectId);
    const update = project?.updates.find((u) => u.id === updateId);
    if (update) {
      setDeletedItem({ type: 'update', item: update, projectId, timestamp: Date.now() });
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, updates: p.updates.filter((u) => u.id !== updateId) }
            : p
        )
      );
    }
  }, [projects]);

  // Undo
  const undo = useCallback(() => {
    if (!deletedItem) return;

    if (deletedItem.type === 'project') {
      setProjects((prev) => [...prev, deletedItem.item as Project]);
    } else if (deletedItem.type === 'task' && deletedItem.projectId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === deletedItem.projectId
            ? { ...p, tasks: [...p.tasks, deletedItem.item as Task] }
            : p
        )
      );
    } else if (deletedItem.type === 'update' && deletedItem.projectId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === deletedItem.projectId
            ? { ...p, updates: [...p.updates, deletedItem.item as Update] }
            : p
        )
      );
    }

    setDeletedItem(null);
  }, [deletedItem]);

  const dismissUndo = useCallback(() => {
    setDeletedItem(null);
  }, []);

  // Statistics
  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === 'active').length,
    done: projects.filter((p) => p.tasks.length > 0 && p.tasks.every((t) => t.done)).length,
    pipeline: projects.reduce((sum, p) => sum + p.value, 0),
  };

  return {
    projects,
    selectedProject,
    selectedProjectId,
    setSelectedProjectId,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    addUpdate,
    deleteUpdate,
    deletedItem,
    undo,
    dismissUndo,
    stats,
    isLoaded,
  };
}
