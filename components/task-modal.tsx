'use client';

import { useState, useEffect } from 'react';
import type { Task, TaskPriority } from '@/lib/types';
import {
  Modal,
  FormField,
  TextInput,
  SegmentedControl,
  PrimaryButton,
  SecondaryButton,
} from './modal';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Task, 'id'>) => void;
}

const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
  { value: 'high', label: 'High', color: 'bg-atua-danger' },
  { value: 'mid', label: 'Mid', color: 'bg-atua-warning' },
  { value: 'low', label: 'Low', color: 'bg-atua-text-dim' },
];

export function TaskModal({ isOpen, onClose, onSubmit }: TaskModalProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('mid');

  useEffect(() => {
    if (isOpen) {
      setText('');
      setPriority('mid');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!text.trim()) return;

    onSubmit({
      text: text.trim(),
      priority,
      done: false,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Task">
      <div className="space-y-4">
        <FormField label="Task">
          <TextInput
            value={text}
            onChange={setText}
            placeholder="What needs to be done?"
          />
        </FormField>

        <FormField label="Priority">
          <SegmentedControl
            options={priorityOptions}
            value={priority}
            onChange={setPriority}
          />
        </FormField>

        <div className="flex justify-end gap-2 pt-2">
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSubmit} disabled={!text.trim()}>
            Add Task
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
