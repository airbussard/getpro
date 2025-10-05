import { Project, ProjectMember, Budget } from '@/types';

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'Website Redesign',
    description: 'Komplettes Redesign der Firmen-Website mit modernem Stack',
    color: '#3b82f6',
    icon: 'Globe',
    ownerId: 'user-1',
    settings: {
      timeTracking: true,
      fileUploads: true,
      comments: true,
      calendar: true,
      labels: true,
      emailNotifications: true,
    },
    archived: false,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'project-2',
    name: 'Mobile App Development',
    description: 'Native iOS und Android App für Kundenbindung',
    color: '#8b5cf6',
    icon: 'Smartphone',
    ownerId: 'user-1',
    settings: {
      timeTracking: true,
      fileUploads: true,
      comments: true,
      calendar: true,
      labels: true,
      emailNotifications: false,
    },
    archived: false,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 'project-3',
    name: 'Marketing Campaign Q2',
    description: 'Social Media und Content Marketing für Q2 2024',
    color: '#ec4899',
    icon: 'Megaphone',
    ownerId: 'user-2',
    settings: {
      timeTracking: false,
      fileUploads: true,
      comments: true,
      calendar: true,
      labels: true,
      emailNotifications: true,
    },
    archived: false,
    createdAt: '2024-03-01T12:00:00Z',
    updatedAt: '2024-03-01T12:00:00Z',
  },
  {
    id: 'project-4',
    name: 'Internal Dashboard',
    description: 'Admin-Dashboard für interne Prozesse',
    color: '#10b981',
    icon: 'BarChart',
    ownerId: 'user-3',
    settings: {
      timeTracking: true,
      fileUploads: false,
      comments: true,
      calendar: false,
      labels: false,
      emailNotifications: false,
    },
    archived: false,
    createdAt: '2024-02-20T14:30:00Z',
    updatedAt: '2024-02-20T14:30:00Z',
  },
];

export const mockProjectMembers: ProjectMember[] = [
  // Website Redesign Team
  { id: 'pm-1', projectId: 'project-1', userId: 'user-1', role: 'owner', invitedBy: 'user-1', createdAt: '2024-02-01T10:00:00Z' },
  { id: 'pm-2', projectId: 'project-1', userId: 'user-2', role: 'admin', invitedBy: 'user-1', createdAt: '2024-02-01T11:00:00Z' },
  { id: 'pm-3', projectId: 'project-1', userId: 'user-3', role: 'member', invitedBy: 'user-1', createdAt: '2024-02-01T11:15:00Z' },
  { id: 'pm-4', projectId: 'project-1', userId: 'user-4', role: 'member', invitedBy: 'user-1', createdAt: '2024-02-01T11:30:00Z' },

  // Mobile App Team
  { id: 'pm-5', projectId: 'project-2', userId: 'user-1', role: 'owner', invitedBy: 'user-1', createdAt: '2024-01-15T09:00:00Z' },
  { id: 'pm-6', projectId: 'project-2', userId: 'user-3', role: 'admin', invitedBy: 'user-1', createdAt: '2024-01-15T10:00:00Z' },

  // Marketing Campaign Team
  { id: 'pm-7', projectId: 'project-3', userId: 'user-2', role: 'owner', invitedBy: 'user-2', createdAt: '2024-03-01T12:00:00Z' },
  { id: 'pm-8', projectId: 'project-3', userId: 'user-4', role: 'member', invitedBy: 'user-2', createdAt: '2024-03-01T12:30:00Z' },

  // Internal Dashboard Team
  { id: 'pm-9', projectId: 'project-4', userId: 'user-3', role: 'owner', invitedBy: 'user-3', createdAt: '2024-02-20T14:30:00Z' },
  { id: 'pm-10', projectId: 'project-4', userId: 'user-1', role: 'viewer', invitedBy: 'user-3', createdAt: '2024-02-20T15:00:00Z' },
];

export const mockBudgets: Budget[] = [
  {
    projectId: 'project-1',
    totalBudgetHours: 200,
    totalBudgetAmount: 20000,
    defaultHourlyRate: 100,
    currency: 'EUR',
    userHourlyRates: {
      'user-1': 120,
      'user-3': 90,
      'user-4': 85,
    },
  },
  {
    projectId: 'project-2',
    totalBudgetHours: 400,
    totalBudgetAmount: 40000,
    defaultHourlyRate: 100,
    currency: 'EUR',
    userHourlyRates: {
      'user-1': 120,
      'user-3': 95,
    },
  },
  {
    projectId: 'project-3',
    totalBudgetHours: 100,
    totalBudgetAmount: 8000,
    defaultHourlyRate: 80,
    currency: 'EUR',
    userHourlyRates: {},
  },
  {
    projectId: 'project-4',
    totalBudgetHours: 150,
    totalBudgetAmount: 15000,
    defaultHourlyRate: 100,
    currency: 'EUR',
    userHourlyRates: {
      'user-3': 100,
    },
  },
];
