export type Priority = 'low' | 'medium' | 'high';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type Attachment = {
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type Collaborator = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: TaskStatus;
  progress: number;
  categoryId: string;
  tags: string[];
  attachments: Attachment[];
  collaborators: Collaborator[];
  createdAt: Date;
  updatedAt: Date;
  reminders: Date[];
};