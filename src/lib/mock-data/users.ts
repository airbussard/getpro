import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@getemergence.com',
    fullName: 'Max Administrator',
    avatarUrl: '/avatars/admin.jpg',
    isSuperAdmin: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'user-2',
    email: 'lisa@example.com',
    fullName: 'Lisa Member',
    avatarUrl: '/avatars/lisa.jpg',
    isSuperAdmin: false,
    createdAt: '2024-01-05T14:30:00Z',
    updatedAt: '2024-01-05T14:30:00Z',
  },
  {
    id: 'user-3',
    email: 'tom@example.com',
    fullName: 'Tom Developer',
    avatarUrl: '/avatars/tom.jpg',
    isSuperAdmin: false,
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-10T09:15:00Z',
  },
  {
    id: 'user-4',
    email: 'sarah@example.com',
    fullName: 'Sarah Designer',
    avatarUrl: '/avatars/sarah.jpg',
    isSuperAdmin: false,
    createdAt: '2024-01-15T11:45:00Z',
    updatedAt: '2024-01-15T11:45:00Z',
  },
];
