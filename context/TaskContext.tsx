import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Category, Tag, Priority, TaskStatus, Attachment, Collaborator } from '@/types/task';
import { Platform } from 'react-native';

// Sample data
const initialCategories: Category[] = [
  { id: '1', name: 'Math', color: '#4361EE' },
  { id: '2', name: 'Science', color: '#3A0CA3' },
  { id: '3', name: 'English', color: '#F72585' },
  { id: '4', name: 'History', color: '#4CC9F0' },
  { id: '5', name: 'Computer Science', color: '#7209B7' },
];

const initialTags: Tag[] = [
  { id: '1', name: 'Homework' },
  { id: '2', name: 'Exam' },
  { id: '3', name: 'Project' },
  { id: '4', name: 'Reading' },
  { id: '5', name: 'Research' },
];

const initialCollaborators: Collaborator[] = [
  { 
    id: '1', 
    name: 'Agon Bajgora', 
    email: 'agon.bajgora@umib.net',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  { 
    id: '2', 
    name: 'Arberi Krasniqi', 
    email: 'arberi.krasniqi@umib.net',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  { 
    id: '3', 
    name: 'Berat Ujkani', 
    email: 'berat.ujkani@umib.net',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
];

const generateSampleTasks = (): Task[] => {
  const now = new Date();
  
  return [
    {
      id: '1',
      title: 'Math Assignment',
      description: 'Complete calculus problems 1-20',
      dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2),
      priority: 'high' as Priority,
      status: 'pending' as TaskStatus,
      progress: 0,
      categoryId: '1',
      tags: ['1'],
      attachments: [],
      collaborators: [],
      createdAt: now,
      updatedAt: now,
      reminders: [new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)],
    },
    {
      id: '2',
      title: 'Science Lab Report',
      description: 'Write up results from chemistry experiment',
      dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5),
      priority: 'medium' as Priority,
      status: 'in-progress' as TaskStatus,
      progress: 30,
      categoryId: '2',
      tags: ['3'],
      attachments: [],
      collaborators: ['1'],
      createdAt: now,
      updatedAt: now,
      reminders: [new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4)],
    },
    {
      id: '3',
      title: 'English Essay',
      description: 'Write 1000 word essay on Shakespeare',
      dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
      priority: 'medium' as Priority,
      status: 'in-progress' as TaskStatus,
      progress: 50,
      categoryId: '3',
      tags: ['3'],
      attachments: [],
      collaborators: [],
      createdAt: now,
      updatedAt: now,
      reminders: [new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)],
    },
    {
      id: '4',
      title: 'History Presentation',
      description: 'Prepare slides on World War II',
      dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
      priority: 'high' as Priority,
      status: 'pending' as TaskStatus,
      progress: 0,
      categoryId: '4',
      tags: ['3'],
      attachments: [],
      collaborators: ['2', '3'],
      createdAt: now,
      updatedAt: now,
      reminders: [new Date(now.getFullYear(), now.getMonth(), now.getDate() + 9)],
    },
    {
      id: '5',
      title: 'Programming Project',
      description: 'Build a simple web application',
      dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14),
      priority: 'high' as Priority,
      status: 'pending' as TaskStatus,
      progress: 10,
      categoryId: '5',
      tags: ['3'],
      attachments: [],
      collaborators: ['1'],
      createdAt: now,
      updatedAt: now,
      reminders: [new Date(now.getFullYear(), now.getMonth(), now.getDate() + 13)],
    },
  ];
};

type TaskContextType = {
  tasks: Task[];
  categories: Category[];
  tags: Tag[];
  collaborators: Collaborator[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addTag: (tag: Omit<Tag, 'id'>) => void;
  deleteTag: (id: string) => void;
  addAttachment: (taskId: string, attachment: Omit<Attachment, 'id'>) => void;
  deleteAttachment: (taskId: string, attachmentId: string) => void;
  addCollaborator: (collaborator: Omit<Collaborator, 'id'>) => void;
  removeCollaborator: (taskId: string, collaboratorId: string) => void;
  getTasksByCategory: (categoryId: string) => Task[];
  getTasksByTag: (tagId: string) => Task[];
  getTasksByStatus: (status: TaskStatus) => Task[];
  getTasksByPriority: (priority: Priority) => Task[];
  getTasksByDate: (date: Date) => Task[];
  getUpcomingTasks: (days: number) => Task[];
  getOverdueTasks: () => Task[];
  getTaskProgress: () => { completed: number; total: number };
  getCategoryById: (id: string) => Category | undefined;
  getTagById: (id: string) => Tag | undefined;
  getCollaboratorById: (id: string) => Collaborator | undefined;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(generateSampleTasks());
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [collaborators, setCollaborators] = useState<Collaborator[]>(initialCollaborators);

  // Task operations
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedFields, updatedAt: new Date() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id: string, updatedFields: Partial<Category>) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, ...updatedFields } : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
    setTasks(
      tasks.map((task) =>
        task.categoryId === id ? { ...task, categoryId: '' } : task
      )
    );
  };

  const addTag = (tag: Omit<Tag, 'id'>) => {
    const newTag: Tag = {
      ...tag,
      id: Date.now().toString(),
    };
    setTags([...tags, newTag]);
  };

  const deleteTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
    setTasks(
      tasks.map((task) => ({
        ...task,
        tags: task.tags.filter((tagId) => tagId !== id),
      }))
    );
  };

  const addAttachment = (taskId: string, attachment: Omit<Attachment, 'id'>) => {
    const newAttachment: Attachment = {
      ...attachment,
      id: Date.now().toString(),
    };
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              attachments: [...task.attachments, newAttachment],
              updatedAt: new Date(),
            }
          : task
      )
    );
  };

  const deleteAttachment = (taskId: string, attachmentId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              attachments: task.attachments.filter((a) => a.id !== attachmentId),
              updatedAt: new Date(),
            }
          : task
      )
    );
  };

  const addCollaborator = (collaborator: Omit<Collaborator, 'id'>) => {
    const newCollaborator: Collaborator = {
      ...collaborator,
      id: Date.now().toString(),
    };
    setCollaborators([...collaborators, newCollaborator]);
  };

  const removeCollaborator = (taskId: string, collaboratorId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              collaborators: task.collaborators.filter((id) => id !== collaboratorId),
              updatedAt: new Date(),
            }
          : task
      )
    );
  };

  const getTasksByCategory = (categoryId: string) => {
    return tasks.filter((task) => task.categoryId === categoryId);
  };

  const getTasksByTag = (tagId: string) => {
    return tasks.filter((task) => task.tags.includes(tagId));
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const getTasksByPriority = (priority: Priority) => {
    return tasks.filter((task) => task.priority === priority);
  };

  const getTasksByDate = (date: Date) => {
    return tasks.filter(
      (task) =>
        task.dueDate.getFullYear() === date.getFullYear() &&
        task.dueDate.getMonth() === date.getMonth() &&
        task.dueDate.getDate() === date.getDate()
    );
  };

  const getUpcomingTasks = (days: number) => {
    const now = new Date();
    const futureDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + days
    );
    return tasks.filter(
      (task) => task.dueDate <= futureDate && task.status !== 'completed'
    );
  };

  const getOverdueTasks = () => {
    const now = new Date();
    return tasks.filter(
      (task) => task.dueDate < now && task.status !== 'completed'
    );
  };

  const getTaskProgress = () => {
    const completed = tasks.filter((task) => task.status === 'completed').length;
    return { completed, total: tasks.length };
  };

  const getCategoryById = (id: string) => {
    return categories.find((category) => category.id === id);
  };

  const getTagById = (id: string) => {
    return tags.find((tag) => tag.id === id);
  };

  const getCollaboratorById = (id: string) => {
    return collaborators.find((collaborator) => collaborator.id === id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        tags,
        collaborators,
        addTask,
        updateTask,
        deleteTask,
        addCategory,
        updateCategory,
        deleteCategory,
        addTag,
        deleteTag,
        addAttachment,
        deleteAttachment,
        addCollaborator,
        removeCollaborator,
        getTasksByCategory,
        getTasksByTag,
        getTasksByStatus,
        getTasksByPriority,
        getTasksByDate,
        getUpcomingTasks,
        getOverdueTasks,
        getTaskProgress,
        getCategoryById,
        getTagById,
        getCollaboratorById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};