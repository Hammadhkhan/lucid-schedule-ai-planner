
import { Task, CategoryInfo } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentDate } from '@/utils/date-utils';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'work',
    name: 'Work',
    color: 'category-work',
    icon: 'Briefcase'
  },
  {
    id: 'study',
    name: 'Study',
    color: 'category-study',
    icon: 'BookOpen'
  },
  {
    id: 'personal',
    name: 'Personal',
    color: 'category-personal',
    icon: 'User'
  },
  {
    id: 'health',
    name: 'Health',
    color: 'category-health',
    icon: 'Heart'
  },
  {
    id: 'social',
    name: 'Social',
    color: 'category-social',
    icon: 'Users'
  },
  {
    id: 'other',
    name: 'Other',
    color: 'category-other',
    icon: 'MoreHorizontal'
  }
];

export const SAMPLE_TASKS: Task[] = [
  {
    id: uuidv4(),
    title: 'Team meeting',
    description: 'Weekly team sync to discuss project progress',
    timeSlot: '09:00',
    category: 'work',
    completed: false,
    tags: ['important', 'meeting'],
    createdAt: getCurrentDate()
  },
  {
    id: uuidv4(),
    title: 'Study algorithms',
    description: 'Review sorting algorithms for upcoming exam',
    timeSlot: '11:00',
    deadline: `${getCurrentDate()}T23:59:59`,
    category: 'study',
    completed: false,
    tags: ['urgent', 'focus'],
    createdAt: getCurrentDate()
  },
  {
    id: uuidv4(),
    title: 'Gym workout',
    description: 'Cardio and strength training session',
    timeSlot: '17:30',
    category: 'health',
    completed: false,
    tags: ['exercise', 'self-care'],
    createdAt: getCurrentDate()
  },
  {
    id: uuidv4(),
    title: 'Call parents',
    description: 'Weekly call to check in with family',
    timeSlot: '20:00',
    category: 'personal',
    completed: false,
    tags: ['family', '30min'],
    createdAt: getCurrentDate()
  }
];

export const TAGS = [
  'important',
  'urgent',
  'meeting',
  'email',
  'focus',
  'quick',
  '5min',
  '30min',
  'low-energy',
  'high-energy',
  'self-care',
  'learning',
  'family',
  'friends',
  'exercise'
];
