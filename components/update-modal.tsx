'use client';

import { useState, useEffect } from 'react';
import type { Update, UpdateType } from '@/lib/types';
import {
  Modal,
  FormField,
  TextArea,
  SegmentedControl,
  PrimaryButton,
  SecondaryButton,
} from './modal';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Update, 'id'>) => void;
}

const typeOptions: { value: UpdateType; label: string; color: string }[] = [
  { value: 'update', label: 'Progress', color: 'bg-atua-accent' },
  { value: 'note', label: 'Note', color: 'bg-atua-info' },
  { value: 'warning', label: 'Blocker', color: 'bg-atua-warning' },
];

export function UpdateModal({ isOpen, onClose, onSubmit }: UpdateModalProps) {
  const [text, setText] = useState('');
  const [type, setType] = useState<UpdateType>('update');

  useEffect(() => {
    if (isOpen) {
      setText('');
      setType('update');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!text.trim()) return;

    onSubmit({
      text: text.trim(),
      type,
      date: new Date().toISOString().split('T')[0],
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Update">
      <div className="space-y-4">
        <FormField label="Update Type">
          <SegmentedControl
            options={typeOptions}
            value={type}
            onChange={setType}
          />
        </FormField>

        <FormField label="Update">
          <TextArea
            value={text}
            onChange={setText}
            placeholder="What's the update?"
            rows={4}
          />
        </FormField>

        <div className="flex justify-end gap-2 pt-2">
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSubmit} disabled={!text.trim()}>
            Add Update
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
