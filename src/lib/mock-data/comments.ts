import { Comment } from '@/types';

export const mockComments: Comment[] = [
  // Task 2: Homepage Redesign
  {
    id: 'comment-1',
    taskId: 'task-2',
    userId: 'user-1',
    content: 'Das Hero-Design sieht fantastisch aus! Können wir noch einen Call-to-Action Button hinzufügen?',
    createdAt: '2024-10-03T09:30:00Z',
    updatedAt: '2024-10-03T09:30:00Z',
  },
  {
    id: 'comment-2',
    taskId: 'task-2',
    userId: 'user-4',
    content: 'Gute Idee! Ich füge zwei CTA Buttons hinzu - "Jetzt starten" und "Mehr erfahren"',
    createdAt: '2024-10-03T10:15:00Z',
    updatedAt: '2024-10-03T10:15:00Z',
  },
  {
    id: 'comment-3',
    taskId: 'task-2',
    userId: 'user-3',
    content: 'Navigation ist jetzt implementiert. Bitte um Design-Review @user-4',
    createdAt: '2024-10-04T14:45:00Z',
    updatedAt: '2024-10-04T14:45:00Z',
  },

  // Task 3: Backend API
  {
    id: 'comment-4',
    taskId: 'task-3',
    userId: 'user-1',
    content: 'Denk bitte an Rate Limiting für die Auth-Endpoints',
    createdAt: '2024-10-02T11:00:00Z',
    updatedAt: '2024-10-02T11:00:00Z',
  },
  {
    id: 'comment-5',
    taskId: 'task-3',
    userId: 'user-3',
    content: 'Ist bereits eingeplant! Verwende Redis für Rate Limiting.',
    createdAt: '2024-10-02T11:30:00Z',
    updatedAt: '2024-10-02T11:30:00Z',
  },

  // Task 6: Bug Navigation
  {
    id: 'comment-6',
    taskId: 'task-6',
    userId: 'user-4',
    content: 'Ich konnte das Problem reproduzieren. Scheint ein z-index Issue zu sein.',
    createdAt: '2024-10-03T16:00:00Z',
    updatedAt: '2024-10-03T16:00:00Z',
  },

  // Task 9: User Auth Flow
  {
    id: 'comment-7',
    taskId: 'task-9',
    userId: 'user-1',
    content: 'Wie ist der Stand? Deadline ist in 4 Tagen.',
    createdAt: '2024-10-05T09:00:00Z',
    updatedAt: '2024-10-05T09:00:00Z',
  },
  {
    id: 'comment-8',
    taskId: 'task-9',
    userId: 'user-3',
    content: 'Login und Register sind fertig. Social Login läuft noch. Schaffe ich bis Deadline!',
    createdAt: '2024-10-05T09:30:00Z',
    updatedAt: '2024-10-05T09:30:00Z',
  },

  // Task 11: App UI/UX
  {
    id: 'comment-9',
    taskId: 'task-11',
    userId: 'user-1',
    content: 'Die Onboarding-Screens sind wirklich gelungen! Großartige Arbeit 🎨',
    createdAt: '2024-09-26T15:00:00Z',
    updatedAt: '2024-09-26T15:00:00Z',
  },
  {
    id: 'comment-10',
    taskId: 'task-11',
    userId: 'user-4',
    content: 'Danke! Dashboard und Profile Screens sind jetzt auch fertig zum Review.',
    createdAt: '2024-10-02T10:00:00Z',
    updatedAt: '2024-10-02T10:00:00Z',
  },

  // Task 13: Instagram Posts
  {
    id: 'comment-11',
    taskId: 'task-13',
    userId: 'user-2',
    content: 'Erste 10 Posts sind scheduled. Noch 10 weitere bis zum 20.',
    createdAt: '2024-10-03T11:00:00Z',
    updatedAt: '2024-10-03T11:00:00Z',
  },

  // Task 17: Analytics Charts
  {
    id: 'comment-12',
    taskId: 'task-17',
    userId: 'user-3',
    content: 'Bar Charts und Line Charts sind implementiert. Fehlt noch Pie Chart.',
    createdAt: '2024-10-04T15:00:00Z',
    updatedAt: '2024-10-04T15:00:00Z',
  },
  {
    id: 'comment-13',
    taskId: 'task-17',
    userId: 'user-1',
    content: 'Sieht gut aus! Können wir die Charts auch exportieren?',
    createdAt: '2024-10-05T10:00:00Z',
    updatedAt: '2024-10-05T10:00:00Z',
  },
];
