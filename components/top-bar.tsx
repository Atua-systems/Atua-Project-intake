'use client';

import { Plus } from 'lucide-react';
import { AtuaLogoMark } from './atua-logo';
import { getTodayFormatted } from '@/lib/utils/dates';

interface TopBarProps {
  onNewProject: () => void;
}

export function TopBar({ onNewProject }: TopBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 bg-atua-bg border-b border-atua-accent/30">
      <AtuaLogoMark />
      
      <div className="flex items-center gap-6">
        <span className="text-sm text-atua-text-dim font-sans">
          {getTodayFormatted()}
        </span>
        
        <button
          onClick={onNewProject}
          className="flex items-center gap-2 px-4 py-2 bg-atua-accent hover:bg-atua-accent-light text-atua-bg font-medium text-sm rounded transition-colors"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>
    </header>
  );
}
