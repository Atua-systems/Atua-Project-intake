'use client';

import { useState, useEffect } from 'react';
import type { Project, ProjectStatus, ProjectTier } from '@/lib/types';
import {
  Modal,
  FormField,
  TextInput,
  TextArea,
  SegmentedControl,
  PrimaryButton,
  SecondaryButton,
} from './modal';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Project, 'id' | 'updates' | 'tasks'>) => void;
  project?: Project | null;
}

const statusOptions: { value: ProjectStatus; label: string; color: string }[] = [
  { value: 'planning', label: 'Planning', color: 'bg-atua-info' },
  { value: 'building', label: 'Building', color: 'bg-atua-warning' },
  { value: 'active', label: 'Active', color: 'bg-atua-success' },
  { value: 'paused', label: 'Paused', color: 'bg-atua-text-dim' },
];

const tierOptions: { value: ProjectTier; label: string }[] = [
  { value: 'Tier 1 — Presence', label: 'Tier 1' },
  { value: 'Tier 2 — Engine', label: 'Tier 2' },
  { value: 'Tier 3 — Collective', label: 'Tier 3' },
  { value: 'Internal', label: 'Internal' },
];

export function ProjectModal({ isOpen, onClose, onSubmit, project }: ProjectModalProps) {
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('planning');
  const [tier, setTier] = useState<ProjectTier>('Tier 1 — Presence');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [direction, setDirection] = useState('');

  const isEdit = !!project;

  useEffect(() => {
    if (project) {
      setName(project.name);
      setClient(project.client);
      setStatus(project.status);
      setTier(project.tier);
      setValue(project.value.toString());
      setDate(project.date);
      setDirection(project.direction);
    } else {
      setName('');
      setClient('');
      setStatus('planning');
      setTier('Tier 1 — Presence');
      setValue('');
      setDate('');
      setDirection('');
    }
  }, [project, isOpen]);

  const handleSubmit = () => {
    if (!name.trim() || !client.trim()) return;

    onSubmit({
      name: name.trim(),
      client: client.trim(),
      status,
      tier,
      value: parseInt(value) || 0,
      date,
      direction: direction.trim(),
    });

    onClose();
  };

  const isValid = name.trim() && client.trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Project' : 'New Project'}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Project Name">
            <TextInput
              value={name}
              onChange={setName}
              placeholder="Enter project name"
            />
          </FormField>
          <FormField label="Client">
            <TextInput
              value={client}
              onChange={setClient}
              placeholder="Enter client name"
            />
          </FormField>
        </div>

        <FormField label="Status">
          <SegmentedControl
            options={statusOptions}
            value={status}
            onChange={setStatus}
          />
        </FormField>

        <FormField label="Tier">
          <SegmentedControl
            options={tierOptions}
            value={tier}
            onChange={setTier}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Value ($)">
            <TextInput
              value={value}
              onChange={setValue}
              placeholder="0"
              type="number"
            />
          </FormField>
          <FormField label="Target Date">
            <TextInput
              value={date}
              onChange={setDate}
              type="date"
            />
          </FormField>
        </div>

        <FormField label="Direction / Goal">
          <TextArea
            value={direction}
            onChange={setDirection}
            placeholder="Describe the project direction and goals..."
            rows={3}
          />
        </FormField>

        <div className="flex justify-end gap-2 pt-2">
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSubmit} disabled={!isValid}>
            {isEdit ? 'Save Changes' : 'Create Project'}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
