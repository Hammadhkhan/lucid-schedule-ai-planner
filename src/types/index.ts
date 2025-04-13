
export interface Task {
  id: string;
  title: string;
  description: string;
  timeSlot: string;
  deadline?: string;
  category: Category;
  completed: boolean;
  tags: string[];
  createdAt: string;
}

export type Category = 'work' | 'study' | 'personal' | 'health' | 'social' | 'other';

export interface CategoryInfo {
  id: Category;
  name: string;
  color: string;
  icon: string;
}

export interface AIFeedback {
  suggestions: string[];
  daySummary: string;
  timestamp: string;
}
