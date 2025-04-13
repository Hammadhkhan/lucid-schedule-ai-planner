
import { Task, Category, AIFeedback } from '@/types';

const TASKS_KEY = 'smartplanner_tasks';
const CATEGORIES_KEY = 'smartplanner_categories';
const AI_FEEDBACK_KEY = 'smartplanner_ai_feedback';
const THEME_KEY = 'smartplanner_theme';

// Task Storage
export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getTasks = (): Task[] => {
  const tasksJson = localStorage.getItem(TASKS_KEY);
  if (!tasksJson) return [];
  try {
    return JSON.parse(tasksJson);
  } catch (error) {
    console.error('Error parsing tasks from localStorage:', error);
    return [];
  }
};

// AI Feedback Storage
export const saveAIFeedback = (feedback: AIFeedback): void => {
  localStorage.setItem(AI_FEEDBACK_KEY, JSON.stringify(feedback));
};

export const getAIFeedback = (): AIFeedback | null => {
  const feedbackJson = localStorage.getItem(AI_FEEDBACK_KEY);
  if (!feedbackJson) return null;
  try {
    return JSON.parse(feedbackJson);
  } catch (error) {
    console.error('Error parsing AI feedback from localStorage:', error);
    return null;
  }
};

// Theme Storage
export const saveTheme = (theme: 'light' | 'dark'): void => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getTheme = (): 'light' | 'dark' => {
  const theme = localStorage.getItem(THEME_KEY);
  if (theme !== 'light' && theme !== 'dark') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme as 'light' | 'dark';
};
