'use client';

import { AtuaLogo } from './atua-logo';

interface EmptyStateProps {
  onNewProject: () => void;
}

export function EmptyState({ onNewProject }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
      <AtuaLogo size={120} className="text-atua-card mb-8" />
      
      <h2 className="font-display text-lg text-atua-text mb-2">
        No Project Selected
      </h2>
      
      <p className="text-atua-text-dim text-sm mb-6 max-w-xs">
        Select a project from the sidebar or create a new one to get started.
      </p>
      
      <button
        onClick={onNewProject}
        className="px-6 py-2.5 bg-atua-accent hover:bg-atua-accent-light text-atua-bg font-medium text-sm rounded transition-colors"
      >
        Create New Project
      </button>
    </div>
  );
}
