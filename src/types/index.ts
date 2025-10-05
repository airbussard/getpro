// User Types
export type UserRole = 'super_admin' | 'owner' | 'admin' | 'member' | 'viewer';

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

// Project Types
export interface ProjectSettings {
  timeTracking: boolean;
  fileUploads: boolean;
  comments: boolean;
  calendar: boolean;
  labels: boolean;
  emailNotifications: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  ownerId: string;
  settings: ProjectSettings;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

// Project Member Types
export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: UserRole;
  invitedBy: string;
  createdAt: string;
}

// Project Invitation Types
export type InvitationStatus = 'pending' | 'accepted' | 'declined';

export interface ProjectInvitation {
  id: string;
  projectId: string;
  email: string;
  role: UserRole;
  token: string;
  invitedBy: string;
  status: InvitationStatus;
  expiresAt: string;
  createdAt: string;
}

// Task Types
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  parentTaskId?: string;
  estimatedHours?: number;
  deadline?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  assigneeIds: string[];
  labelIds: string[];
}

// Label Types
export interface Label {
  id: string;
  projectId: string;
  name: string;
  color: string;
  createdAt: string;
}

// Comment Types
export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Time Entry Types
export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  hours: number;
  description?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

// Activity Log Types
export type ActivityAction =
  | 'task_created'
  | 'task_updated'
  | 'task_deleted'
  | 'task_assigned'
  | 'task_status_changed'
  | 'comment_added'
  | 'time_logged'
  | 'member_added'
  | 'member_removed';

export interface Activity {
  id: string;
  projectId: string;
  taskId?: string;
  userId: string;
  action: ActivityAction;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// Notification Types
export type NotificationType =
  | 'task_assigned'
  | 'task_status_changed'
  | 'comment_added'
  | 'deadline_approaching'
  | 'mention';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

// Budget Types
export interface Budget {
  projectId: string;
  totalBudgetHours: number;
  totalBudgetAmount: number;
  defaultHourlyRate: number;
  currency: string;
  userHourlyRates: Record<string, number>; // userId -> rate
}

// Filter & Search Types
export interface TaskFilters {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assigneeIds?: string[];
  labelIds?: string[];
  deadline?: 'overdue' | 'today' | 'this_week' | 'this_month';
  search?: string;
}

export interface TaskSort {
  field: 'priority' | 'deadline' | 'createdAt' | 'updatedAt' | 'title';
  order: 'asc' | 'desc';
}

// View Types
export type ViewType = 'kanban' | 'list' | 'calendar' | 'timeline';
