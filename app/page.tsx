'use client';

import { useState } from 'react';
import { useProjects } from '@/hooks/use-projects';
import { TopBar } from '@/components/top-bar';
import { Sidebar } from '@/components/sidebar';
import { MainPanel } from '@/components/main-panel';
import { ProjectModal } from '@/components/project-modal';
import { UpdateModal } from '@/components/update-modal';
import { TaskModal } from '@/components/task-modal';
import { Toast } from '@/components/toast';
import type { Project, Task, Update } from '@/lib/types';

type ModalType = 'newProject' | 'editProject' | 'addUpdate' | 'addTask' | null;

export default function Home() {
  const {
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
  } = useProjects();

  const [activeModal, setActiveModal] = useState<ModalType>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-atua-bg flex items-center justify-center">
        <div className="text-atua-text-dim text-sm">Loading...</div>
      </div>
    );
  }

  const handleNewProject = (data: Omit<Project, 'id' | 'updates' | 'tasks'>) => {
    addProject(data);
  };

  const handleEditProject = (data: Omit<Project, 'id' | 'updates' | 'tasks'>) => {
    if (selectedProjectId) {
      updateProject(selectedProjectId, data);
    }
  };

  const handleDeleteProject = () => {
    if (selectedProjectId) {
      deleteProject(selectedProjectId);
    }
  };

  const handleAddUpdate = (data: Omit<Update, 'id'>) => {
    if (selectedProjectId) {
      addUpdate(selectedProjectId, data);
    }
  };

  const handleAddTask = (data: Omit<Task, 'id'>) => {
    if (selectedProjectId) {
      addTask(selectedProjectId, data);
    }
  };

  const handleToggleTask = (taskId: string, done: boolean) => {
    if (selectedProjectId) {
      updateTask(selectedProjectId, taskId, { done });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (selectedProjectId) {
      deleteTask(selectedProjectId, taskId);
    }
  };

  const handleDeleteUpdate = (updateId: string) => {
    if (selectedProjectId) {
      deleteUpdate(selectedProjectId, updateId);
    }
  };

  return (
    <div className="min-h-screen bg-atua-bg">
      <TopBar onNewProject={() => setActiveModal('newProject')} />

      <Sidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        stats={stats}
      />

      <main className="ml-[280px] pt-14 min-h-screen flex">
        <MainPanel
          project={selectedProject}
          onNewProject={() => setActiveModal('newProject')}
          onEditProject={() => setActiveModal('editProject')}
          onDeleteProject={handleDeleteProject}
          onAddUpdate={() => setActiveModal('addUpdate')}
          onAddTask={() => setActiveModal('addTask')}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onDeleteUpdate={handleDeleteUpdate}
        />
      </main>

      {/* Modals */}
      <ProjectModal
        isOpen={activeModal === 'newProject'}
        onClose={() => setActiveModal(null)}
        onSubmit={handleNewProject}
      />

      <ProjectModal
        isOpen={activeModal === 'editProject'}
        onClose={() => setActiveModal(null)}
        onSubmit={handleEditProject}
        project={selectedProject}
      />

      <UpdateModal
        isOpen={activeModal === 'addUpdate'}
        onClose={() => setActiveModal(null)}
        onSubmit={handleAddUpdate}
      />

      <TaskModal
        isOpen={activeModal === 'addTask'}
        onClose={() => setActiveModal(null)}
        onSubmit={handleAddTask}
      />

      {/* Undo Toast */}
      {deletedItem && (
        <Toast
          message={`Deleted ${deletedItem.type}`}
          onUndo={undo}
          onDismiss={dismissUndo}
        />
      )}
    </div>
  );
}
