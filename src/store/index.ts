import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User,
  Project,
  ProjectMember,
  Task,
  Label,
  Comment,
  TimeEntry,
  Activity,
  Notification,
  Budget,
  TaskFilters,
  TaskSort,
} from '@/types';
import {
  mockUsers,
  mockProjects,
  mockProjectMembers,
  mockBudgets,
  mockLabels,
  mockTasks,
  mockTimeEntries,
  mockComments,
  mockNotifications,
  mockActivities,
} from '@/lib/mock-data';
import { generateId } from '@/lib/utils';

interface AppState {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;

  // Data
  users: User[];
  projects: Project[];
  projectMembers: ProjectMember[];
  budgets: Budget[];
  labels: Label[];
  tasks: Task[];
  timeEntries: TimeEntry[];
  comments: Comment[];
  notifications: Notification[];
  activities: Activity[];

  // UI State
  activeProjectId: string | null;
  taskFilters: TaskFilters;
  taskSort: TaskSort;
  sidebarOpen: boolean;
  theme: 'light' | 'dark';

  // Timer State
  activeTimerId: string | null;
  timerStartTime: number | null;

  // Auth Actions
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string, fullName: string) => boolean;

  // Project Actions
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  archiveProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;

  // Task Actions
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  assignTask: (taskId: string, userIds: string[]) => void;

  // Label Actions
  createLabel: (label: Omit<Label, 'id' | 'createdAt'>) => Label;
  updateLabel: (id: string, updates: Partial<Label>) => void;
  deleteLabel: (id: string) => void;

  // Comment Actions
  createComment: (comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>) => Comment;
  updateComment: (id: string, content: string) => void;
  deleteComment: (id: string) => void;

  // Time Entry Actions
  createTimeEntry: (entry: Omit<TimeEntry, 'id' | 'createdAt' | 'updatedAt'>) => TimeEntry;
  updateTimeEntry: (id: string, updates: Partial<TimeEntry>) => void;
  deleteTimeEntry: (id: string) => void;
  startTimer: (taskId: string) => void;
  stopTimer: () => void;

  // Notification Actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;

  // UI Actions
  setTaskFilters: (filters: TaskFilters) => void;
  setTaskSort: (sort: TaskSort) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleTheme: () => void;

  // Helper Functions
  getProjectById: (id: string) => Project | undefined;
  getTaskById: (id: string) => Task | undefined;
  getProjectTasks: (projectId: string) => Task[];
  getTaskComments: (taskId: string) => Comment[];
  getTaskTimeEntries: (taskId: string) => TimeEntry[];
  getUserNotifications: (userId: string) => Notification[];
  getProjectActivities: (projectId: string) => Activity[];
  getProjectBudget: (projectId: string) => Budget | undefined;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      currentUser: null,
      isAuthenticated: false,
      users: mockUsers,
      projects: mockProjects,
      projectMembers: mockProjectMembers,
      budgets: mockBudgets,
      labels: mockLabels,
      tasks: mockTasks,
      timeEntries: mockTimeEntries,
      comments: mockComments,
      notifications: mockNotifications,
      activities: mockActivities,
      activeProjectId: null,
      taskFilters: {},
      taskSort: { field: 'createdAt', order: 'desc' },
      sidebarOpen: true,
      theme: 'dark',
      activeTimerId: null,
      timerStartTime: null,

      // Auth Actions
      login: (email: string, _password: string) => {
        const user = get().users.find((u) => u.email === email);
        if (user) {
          set({ currentUser: user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false, activeProjectId: null });
      },

      register: (email: string, _password: string, fullName: string) => {
        const existingUser = get().users.find((u) => u.email === email);
        if (existingUser) return false;

        const newUser: User = {
          id: generateId(),
          email,
          fullName,
          isSuperAdmin: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
          isAuthenticated: true,
        }));

        return true;
      },

      // Project Actions
      createProject: (project) => {
        const currentUser = get().currentUser;
        if (!currentUser) throw new Error('Not authenticated');

        const newProject: Project = {
          ...project,
          id: generateId(),
          ownerId: currentUser.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const newMember: ProjectMember = {
          id: generateId(),
          projectId: newProject.id,
          userId: currentUser.id,
          role: 'owner',
          invitedBy: currentUser.id,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          projects: [...state.projects, newProject],
          projectMembers: [...state.projectMembers, newMember],
        }));

        return newProject;
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          tasks: state.tasks.filter((t) => t.projectId !== id),
          activeProjectId: state.activeProjectId === id ? null : state.activeProjectId,
        }));
      },

      archiveProject: (id) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, archived: true, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      setActiveProject: (id) => {
        set({ activeProjectId: id });
      },

      // Task Actions
      createTask: (task) => {
        const currentUser = get().currentUser;
        if (!currentUser) throw new Error('Not authenticated');

        const newTask: Task = {
          ...task,
          id: generateId(),
          createdBy: currentUser.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const activity: Activity = {
          id: generateId(),
          projectId: task.projectId,
          taskId: newTask.id,
          userId: currentUser.id,
          action: 'task_created',
          metadata: { title: task.title },
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          tasks: [...state.tasks, newTask],
          activities: [activity, ...state.activities],
        }));

        return newTask;
      },

      updateTask: (id, updates) => {
        const task = get().tasks.find((t) => t.id === id);
        if (!task) return;

        const currentUser = get().currentUser;
        if (!currentUser) return;

        // Create activity for status changes
        if (updates.status && updates.status !== task.status) {
          const activity: Activity = {
            id: generateId(),
            projectId: task.projectId,
            taskId: id,
            userId: currentUser.id,
            action: 'task_status_changed',
            metadata: { from: task.status, to: updates.status },
            createdAt: new Date().toISOString(),
          };

          set((state) => ({
            activities: [activity, ...state.activities],
          }));
        }

        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
          comments: state.comments.filter((c) => c.taskId !== id),
          timeEntries: state.timeEntries.filter((e) => e.taskId !== id),
        }));
      },

      assignTask: (taskId, userIds) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, assigneeIds: userIds, updatedAt: new Date().toISOString() } : t
          ),
        }));
      },

      // Label Actions
      createLabel: (label) => {
        const newLabel: Label = {
          ...label,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          labels: [...state.labels, newLabel],
        }));

        return newLabel;
      },

      updateLabel: (id, updates) => {
        set((state) => ({
          labels: state.labels.map((l) => (l.id === id ? { ...l, ...updates } : l)),
        }));
      },

      deleteLabel: (id) => {
        set((state) => ({
          labels: state.labels.filter((l) => l.id !== id),
          tasks: state.tasks.map((t) => ({
            ...t,
            labelIds: t.labelIds.filter((lid) => lid !== id),
          })),
        }));
      },

      // Comment Actions
      createComment: (comment) => {
        const currentUser = get().currentUser;
        if (!currentUser) throw new Error('Not authenticated');

        const newComment: Comment = {
          ...comment,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const task = get().tasks.find((t) => t.id === comment.taskId);
        if (task) {
          const activity: Activity = {
            id: generateId(),
            projectId: task.projectId,
            taskId: task.id,
            userId: currentUser.id,
            action: 'comment_added',
            metadata: { comment: comment.content },
            createdAt: new Date().toISOString(),
          };

          set((state) => ({
            activities: [activity, ...state.activities],
          }));
        }

        set((state) => ({
          comments: [...state.comments, newComment],
        }));

        return newComment;
      },

      updateComment: (id, content) => {
        set((state) => ({
          comments: state.comments.map((c) =>
            c.id === id ? { ...c, content, updatedAt: new Date().toISOString() } : c
          ),
        }));
      },

      deleteComment: (id) => {
        set((state) => ({
          comments: state.comments.filter((c) => c.id !== id),
        }));
      },

      // Time Entry Actions
      createTimeEntry: (entry) => {
        const currentUser = get().currentUser;
        if (!currentUser) throw new Error('Not authenticated');

        const newEntry: TimeEntry = {
          ...entry,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const task = get().tasks.find((t) => t.id === entry.taskId);
        if (task) {
          const activity: Activity = {
            id: generateId(),
            projectId: task.projectId,
            taskId: task.id,
            userId: currentUser.id,
            action: 'time_logged',
            metadata: { hours: entry.hours, description: entry.description },
            createdAt: new Date().toISOString(),
          };

          set((state) => ({
            activities: [activity, ...state.activities],
          }));
        }

        set((state) => ({
          timeEntries: [...state.timeEntries, newEntry],
        }));

        return newEntry;
      },

      updateTimeEntry: (id, updates) => {
        set((state) => ({
          timeEntries: state.timeEntries.map((e) =>
            e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
          ),
        }));
      },

      deleteTimeEntry: (id) => {
        set((state) => ({
          timeEntries: state.timeEntries.filter((e) => e.id !== id),
        }));
      },

      startTimer: (taskId) => {
        set({
          activeTimerId: taskId,
          timerStartTime: Date.now(),
        });
      },

      stopTimer: () => {
        const { activeTimerId, timerStartTime, currentUser } = get();
        if (!activeTimerId || !timerStartTime || !currentUser) return;

        const hours = (Date.now() - timerStartTime) / (1000 * 60 * 60);
        const roundedHours = Math.round(hours * 100) / 100; // Round to 2 decimals

        get().createTimeEntry({
          taskId: activeTimerId,
          userId: currentUser.id,
          hours: roundedHours,
          date: new Date().toISOString().split('T')[0],
        });

        set({
          activeTimerId: null,
          timerStartTime: null,
        });
      },

      // Notification Actions
      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        }));
      },

      markAllNotificationsAsRead: () => {
        const currentUser = get().currentUser;
        if (!currentUser) return;

        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.userId === currentUser.id ? { ...n, read: true } : n
          ),
        }));
      },

      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      // UI Actions
      setTaskFilters: (filters) => {
        set({ taskFilters: filters });
      },

      setTaskSort: (sort) => {
        set({ taskSort: sort });
      },

      setSidebarOpen: (open) => {
        set({ sidebarOpen: open });
      },

      toggleTheme: () => {
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }));
      },

      // Helper Functions
      getProjectById: (id) => {
        return get().projects.find((p) => p.id === id);
      },

      getTaskById: (id) => {
        return get().tasks.find((t) => t.id === id);
      },

      getProjectTasks: (projectId) => {
        return get().tasks.filter((t) => t.projectId === projectId);
      },

      getTaskComments: (taskId) => {
        return get().comments.filter((c) => c.taskId === taskId);
      },

      getTaskTimeEntries: (taskId) => {
        return get().timeEntries.filter((e) => e.taskId === taskId);
      },

      getUserNotifications: (userId) => {
        return get().notifications.filter((n) => n.userId === userId);
      },

      getProjectActivities: (projectId) => {
        return get().activities.filter((a) => a.projectId === projectId);
      },

      getProjectBudget: (projectId) => {
        return get().budgets.find((b) => b.projectId === projectId);
      },
    }),
    {
      name: 'emergency-pro-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        // Don't persist mock data - use defaults on reload
      }),
    }
  )
);
