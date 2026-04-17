'use client';

import { useState } from 'react';
import { Plus, Trash2, Circle, CheckCircle2 } from 'lucide-react';
import type { Task } from '@/lib/types';
import { priorityColors } from '@/lib/utils/colors';

interface TasksListProps {
  tasks: Task[];
  onAddTask: () => void;
  onToggleTask: (taskId: string, done: boolean) => void;
  onDeleteTask: (taskId: string) => void;
}

const priorityLabels: Record<Task['priority'], string> = {
  high: 'High',
  mid: 'Mid',
  low: 'Low',
};

export function TasksList({ tasks, onAddTask, onToggleTask, onDeleteTask }: TasksListProps) {
  const [completingTasks, setCompletingTasks] = useState<Set<string>>(new Set());

  const handleToggle = (task: Task) => {
    if (!task.done) {
      setCompletingTasks((prev) => new Set(prev).add(task.id));
      setTimeout(() => {
        onToggleTask(task.id, true);
        setCompletingTasks((prev) => {
          const next = new Set(prev);
          next.delete(task.id);
          return next;
        });
      }, 300);
    } else {
      onToggleTask(task.id, false);
    }
  };

  const incompleteTasks = tasks.filter((t) => !t.done);
  const completedTasks = tasks.filter((t) => t.done);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-sans font-medium text-atua-text">Tasks</h3>
        <button
          onClick={onAddTask}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-atua-accent hover:text-atua-accent-light transition-colors"
        >
          <Plus size={14} />
          Add Task
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-atua-text-dim text-sm">
            No tasks yet
          </div>
        ) : (
          <>
            {incompleteTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isCompleting={completingTasks.has(task.id)}
                onToggle={() => handleToggle(task)}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))}

            {completedTasks.length > 0 && incompleteTasks.length > 0 && (
              <div className="border-t border-atua-card my-3 pt-3">
                <span className="text-xs text-atua-text-dim">
                  Completed ({completedTasks.length})
                </span>
              </div>
            )}

            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isCompleting={false}
                onToggle={() => handleToggle(task)}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

interface TaskItemProps {
  task: Task;
  isCompleting: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

function TaskItem({ task, isCompleting, onToggle, onDelete }: TaskItemProps) {
  const colors = priorityColors[task.priority];

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg bg-atua-card group transition-all duration-300 ${
        isCompleting ? 'opacity-50' : ''
      }`}
    >
      <button
        onClick={onToggle}
        className="shrink-0 text-atua-accent hover:text-atua-accent-light transition-colors"
      >
        {task.done ? (
          <CheckCircle2 size={20} className="text-atua-success" />
        ) : (
          <Circle size={20} />
        )}
      </button>

      <span
        className={`flex-1 text-sm transition-all duration-300 ${
          task.done || isCompleting
            ? 'line-through text-atua-text-dim'
            : 'text-atua-text'
        }`}
      >
        {task.text}
      </span>

      <span className={`text-xs px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
        {priorityLabels[task.priority]}
      </span>

      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1 text-atua-text-dim hover:text-atua-danger transition-all"
        title="Delete task"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
