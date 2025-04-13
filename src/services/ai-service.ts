
import { Task, AIFeedback } from '@/types';
import { saveAIFeedback } from './storage-service';

// Simulated AI responses for the first version
export const generateTaskSuggestions = (tasks: Task[]): Promise<string[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const suggestions = [
        "Consider moving your study tasks to morning hours for better focus.",
        "You have 3 back-to-back meetings. Try to add short breaks between them.",
        "Your health tasks are all scheduled for the evening. Consider spreading them throughout the day.",
        "You might be overloaded between 2-4 PM. Consider rescheduling some tasks."
      ];
      resolve(suggestions);
    }, 1500);
  });
};

export const generateDaySummary = (tasks: Task[]): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const completedCount = tasks.filter(task => task.completed).length;
      const totalCount = tasks.length;
      const categories = [...new Set(tasks.filter(task => task.completed).map(task => task.category))];
      
      let categoriesText = "";
      if (categories.length > 0) {
        categoriesText = categories.length === 1 
          ? `focused on ${categories[0]}` 
          : `balanced between ${categories.slice(0, -1).join(', ')} and ${categories[categories.length - 1]}`;
      }
      
      const summary = `You completed ${completedCount} out of ${totalCount} tasks today, ${categoriesText}. ${
        completedCount === totalCount ? "Amazing job completing everything!" :
        completedCount > totalCount * 0.7 ? "Great progress today!" :
        completedCount > totalCount * 0.3 ? "You made steady progress." :
        "Consider setting more achievable goals tomorrow."
      }`;
      
      resolve(summary);
    }, 1500);
  });
};

export const getAIFeedback = async (tasks: Task[]): Promise<AIFeedback> => {
  const suggestions = await generateTaskSuggestions(tasks);
  const daySummary = await generateDaySummary(tasks);
  
  const feedback: AIFeedback = {
    suggestions,
    daySummary,
    timestamp: new Date().toISOString()
  };
  
  saveAIFeedback(feedback);
  return feedback;
};
