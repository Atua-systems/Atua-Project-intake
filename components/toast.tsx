'use client';

import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  onUndo: () => void;
  onDismiss: () => void;
}

export function Toast({ message, onUndo, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-atua-card border border-atua-accent/20 rounded-lg shadow-xl animate-slide-up">
      <span className="text-sm text-atua-text">{message}</span>
      
      <button
        onClick={onUndo}
        className="text-sm font-medium text-atua-accent hover:text-atua-accent-light transition-colors"
      >
        Undo
      </button>
      
      <button
        onClick={onDismiss}
        className="p-1 text-atua-text-dim hover:text-atua-text transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
