'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { Update } from '@/lib/types';
import { updateTypeColors } from '@/lib/utils/colors';
import { formatDate } from '@/lib/utils/dates';

interface UpdatesFeedProps {
  updates: Update[];
  onAddUpdate: () => void;
  onDeleteUpdate: (updateId: string) => void;
}

const updateTypeLabels: Record<Update['type'], string> = {
  update: 'Progress Update',
  note: 'Note',
  warning: 'Blocker',
};

export function UpdatesFeed({ updates, onAddUpdate, onDeleteUpdate }: UpdatesFeedProps) {
  const sortedUpdates = [...updates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-sans font-medium text-atua-text">Updates</h3>
        <button
          onClick={onAddUpdate}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-atua-accent hover:text-atua-accent-light transition-colors"
        >
          <Plus size={14} />
          Add Update
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {sortedUpdates.length === 0 ? (
          <div className="text-center py-8 text-atua-text-dim text-sm">
            No updates yet
          </div>
        ) : (
          sortedUpdates.map((update) => {
            const colors = updateTypeColors[update.type];
            const isBlocker = update.type === 'warning';

            return (
              <div
                key={update.id}
                className={`p-4 rounded-lg border-l-2 ${colors.border} ${
                  isBlocker ? 'bg-atua-warning/5' : 'bg-atua-card'
                } group`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${colors.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs text-atua-text-dim">
                        {updateTypeLabels[update.type]}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-atua-text-dim">
                          {formatDate(update.date)}
                        </span>
                        <button
                          onClick={() => onDeleteUpdate(update.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-atua-text-dim hover:text-atua-danger transition-all"
                          title="Delete update"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-atua-text leading-relaxed">
                      {update.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
