
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { ScrollArea } from "@/components/ui/scroll-area";

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (updatedTask: Task) => void;
}

const TaskList = ({ tasks, onComplete, onDelete, onUpdate }: TaskListProps) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    // First by time
    if (a.timeSlot < b.timeSlot) return -1;
    if (a.timeSlot > b.timeSlot) return 1;
    
    // Then by completion status
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    
    return 0;
  });
  
  return (
    <ScrollArea className="h-[calc(100vh-350px)] pr-4">
      {sortedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
          <p>No tasks for today</p>
          <p className="text-sm">Add a task to get started</p>
        </div>
      ) : (
        <div>
          {sortedTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onComplete={onComplete}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default TaskList;
