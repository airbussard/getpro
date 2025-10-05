import { TimeEntry } from '@/types';

export const mockTimeEntries: TimeEntry[] = [
  // Task 1: Design System erstellen
  { id: 'time-1', taskId: 'task-1', userId: 'user-4', hours: 8, description: 'Initial Design System Setup', date: '2024-02-05', createdAt: '2024-02-05T17:00:00Z', updatedAt: '2024-02-05T17:00:00Z' },
  { id: 'time-2', taskId: 'task-1', userId: 'user-4', hours: 7.5, description: 'Component Library', date: '2024-02-06', createdAt: '2024-02-06T16:30:00Z', updatedAt: '2024-02-06T16:30:00Z' },
  { id: 'time-3', taskId: 'task-1', userId: 'user-4', hours: 8, description: 'Typography & Colors', date: '2024-02-07', createdAt: '2024-02-07T17:00:00Z', updatedAt: '2024-02-07T17:00:00Z' },
  { id: 'time-4', taskId: 'task-1', userId: 'user-4', hours: 6, description: 'Documentation', date: '2024-02-08', createdAt: '2024-02-08T15:00:00Z', updatedAt: '2024-02-08T15:00:00Z' },
  { id: 'time-5', taskId: 'task-1', userId: 'user-4', hours: 5, description: 'Review & Refinements', date: '2024-02-09', createdAt: '2024-02-09T14:00:00Z', updatedAt: '2024-02-09T14:00:00Z' },

  // Task 2: Homepage Redesign
  { id: 'time-6', taskId: 'task-2', userId: 'user-4', hours: 6, description: 'Hero Section Design', date: '2024-10-02', createdAt: '2024-10-02T15:00:00Z', updatedAt: '2024-10-02T15:00:00Z' },
  { id: 'time-7', taskId: 'task-2', userId: 'user-3', hours: 4, description: 'Hero Implementation', date: '2024-10-03', createdAt: '2024-10-03T13:00:00Z', updatedAt: '2024-10-03T13:00:00Z' },
  { id: 'time-8', taskId: 'task-2', userId: 'user-4', hours: 5, description: 'Navigation & CTA Buttons', date: '2024-10-04', createdAt: '2024-10-04T14:00:00Z', updatedAt: '2024-10-04T14:00:00Z' },

  // Task 3: Backend API
  { id: 'time-9', taskId: 'task-3', userId: 'user-3', hours: 8, description: 'API Architecture Planning', date: '2024-02-10', createdAt: '2024-02-10T17:00:00Z', updatedAt: '2024-02-10T17:00:00Z' },
  { id: 'time-10', taskId: 'task-3', userId: 'user-3', hours: 7, description: 'Auth Endpoints', date: '2024-02-11', createdAt: '2024-02-11T16:00:00Z', updatedAt: '2024-02-11T16:00:00Z' },
  { id: 'time-11', taskId: 'task-3', userId: 'user-3', hours: 6.5, description: 'Content Management Endpoints', date: '2024-10-02', createdAt: '2024-10-02T15:30:00Z', updatedAt: '2024-10-02T15:30:00Z' },
  { id: 'time-12', taskId: 'task-3', userId: 'user-3', hours: 5, description: 'Analytics Integration', date: '2024-10-03', createdAt: '2024-10-03T14:00:00Z', updatedAt: '2024-10-03T14:00:00Z' },

  // Task 7: iOS App Setup
  { id: 'time-13', taskId: 'task-7', userId: 'user-3', hours: 8, description: 'Xcode Project Setup', date: '2024-01-22', createdAt: '2024-01-22T17:00:00Z', updatedAt: '2024-01-22T17:00:00Z' },
  { id: 'time-14', taskId: 'task-7', userId: 'user-3', hours: 8, description: 'Dependencies & Architecture', date: '2024-01-23', createdAt: '2024-01-23T17:00:00Z', updatedAt: '2024-01-23T17:00:00Z' },

  // Task 8: Android App Setup
  { id: 'time-15', taskId: 'task-8', userId: 'user-3', hours: 8, description: 'Android Studio Setup', date: '2024-01-24', createdAt: '2024-01-24T17:00:00Z', updatedAt: '2024-01-24T17:00:00Z' },
  { id: 'time-16', taskId: 'task-8', userId: 'user-3', hours: 8, description: 'Gradle & Dependencies', date: '2024-01-25', createdAt: '2024-01-25T17:00:00Z', updatedAt: '2024-01-25T17:00:00Z' },

  // Task 9: User Auth Flow
  { id: 'time-17', taskId: 'task-9', userId: 'user-3', hours: 7, description: 'Login/Register UI', date: '2024-10-01', createdAt: '2024-10-01T16:00:00Z', updatedAt: '2024-10-01T16:00:00Z' },
  { id: 'time-18', taskId: 'task-9', userId: 'user-3', hours: 6, description: 'Backend Integration', date: '2024-10-02', createdAt: '2024-10-02T15:00:00Z', updatedAt: '2024-10-02T15:00:00Z' },
  { id: 'time-19', taskId: 'task-9', userId: 'user-3', hours: 5, description: 'Social Login', date: '2024-10-03', createdAt: '2024-10-03T14:00:00Z', updatedAt: '2024-10-03T14:00:00Z' },

  // Task 11: App UI/UX Design
  { id: 'time-20', taskId: 'task-11', userId: 'user-4', hours: 8, description: 'Onboarding Screens', date: '2024-09-25', createdAt: '2024-09-25T17:00:00Z', updatedAt: '2024-09-25T17:00:00Z' },
  { id: 'time-21', taskId: 'task-11', userId: 'user-4', hours: 7, description: 'Dashboard Design', date: '2024-09-26', createdAt: '2024-09-26T16:00:00Z', updatedAt: '2024-09-26T16:00:00Z' },
  { id: 'time-22', taskId: 'task-11', userId: 'user-4', hours: 6, description: 'Profile & Settings', date: '2024-10-01', createdAt: '2024-10-01T15:00:00Z', updatedAt: '2024-10-01T15:00:00Z' },

  // Task 12: Content Kalender
  { id: 'time-23', taskId: 'task-12', userId: 'user-2', hours: 8, description: 'Content Planning Q2', date: '2024-03-05', createdAt: '2024-03-05T17:00:00Z', updatedAt: '2024-03-05T17:00:00Z' },

  // Task 13: Instagram Posts
  { id: 'time-24', taskId: 'task-13', userId: 'user-4', hours: 4, description: 'Design 10 Posts', date: '2024-10-01', createdAt: '2024-10-01T13:00:00Z', updatedAt: '2024-10-01T13:00:00Z' },
  { id: 'time-25', taskId: 'task-13', userId: 'user-2', hours: 3, description: 'Copywriting', date: '2024-10-02', createdAt: '2024-10-02T12:00:00Z', updatedAt: '2024-10-02T12:00:00Z' },

  // Task 16: Dashboard Layout
  { id: 'time-26', taskId: 'task-16', userId: 'user-3', hours: 8, description: 'Layout Implementation', date: '2024-02-25', createdAt: '2024-02-25T17:00:00Z', updatedAt: '2024-02-25T17:00:00Z' },

  // Task 17: Analytics Charts
  { id: 'time-27', taskId: 'task-17', userId: 'user-3', hours: 6, description: 'Recharts Setup', date: '2024-10-02', createdAt: '2024-10-02T15:00:00Z', updatedAt: '2024-10-02T15:00:00Z' },
  { id: 'time-28', taskId: 'task-17', userId: 'user-3', hours: 5, description: 'Chart Components', date: '2024-10-03', createdAt: '2024-10-03T14:00:00Z', updatedAt: '2024-10-03T14:00:00Z' },
];
