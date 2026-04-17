import type { Project } from './types';

export const seedProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'Meridian Rebrand',
    client: 'Meridian Capital',
    status: 'active',
    tier: 'Tier 2 — Engine',
    value: 4500,
    date: '2026-05-15',
    direction: 'Complete brand refresh including new visual identity, website redesign, and marketing collateral suite.',
    updates: [
      {
        id: 'upd-001',
        text: 'Completed initial discovery session with stakeholders. Identified key brand pillars and competitive positioning.',
        type: 'update',
        date: '2026-04-10',
      },
      {
        id: 'upd-002',
        text: 'Waiting on client feedback for moodboard direction. Follow-up scheduled for Friday.',
        type: 'note',
        date: '2026-04-14',
      },
      {
        id: 'upd-003',
        text: 'Asset delivery delayed due to missing brand guidelines from legacy agency.',
        type: 'warning',
        date: '2026-04-16',
      },
    ],
    tasks: [
      { id: 'task-001', text: 'Finalize logo concepts', done: true, priority: 'high' },
      { id: 'task-002', text: 'Create color palette system', done: true, priority: 'high' },
      { id: 'task-003', text: 'Design homepage wireframes', done: false, priority: 'high' },
      { id: 'task-004', text: 'Build component library', done: false, priority: 'mid' },
      { id: 'task-005', text: 'Prepare brand guidelines PDF', done: false, priority: 'low' },
    ],
  },
  {
    id: 'proj-002',
    name: 'Vantage Platform',
    client: 'Vantage Analytics',
    status: 'planning',
    tier: 'Tier 3 — Collective',
    value: 2700,
    date: '2026-06-30',
    direction: 'SaaS dashboard MVP for analytics visualization. Focus on clean data presentation and user onboarding flow.',
    updates: [
      {
        id: 'upd-004',
        text: 'Kickoff call completed. Scope defined for 8-week sprint.',
        type: 'update',
        date: '2026-04-08',
      },
      {
        id: 'upd-005',
        text: 'Technical requirements document drafted and shared with dev team.',
        type: 'note',
        date: '2026-04-12',
      },
    ],
    tasks: [
      { id: 'task-006', text: 'Complete user research interviews', done: true, priority: 'high' },
      { id: 'task-007', text: 'Define information architecture', done: false, priority: 'high' },
      { id: 'task-008', text: 'Create user flow diagrams', done: false, priority: 'mid' },
      { id: 'task-009', text: 'Design system setup', done: false, priority: 'mid' },
    ],
  },
];
