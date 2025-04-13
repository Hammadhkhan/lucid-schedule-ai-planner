
import { useState } from 'react';
import { Task } from '@/types';
import { formatTime } from '@/utils/date-utils';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Clock, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TaskModal from './TaskModal';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (updatedTask: Task) => void;
}

const TaskItem = ({ task, onComplete, onDelete, onUpdate }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleComplete = () => {
    onComplete(task.id, !task.completed);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleDelete = () => {
    onDelete(task.id);
  };
  
  const handleUpdate = (updatedTask: Task) => {
    onUpdate(updatedTask);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };
  
  return (
    <>
      <div className={`task-category-${task.category} p-4 mb-3 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in`}>
        <div className="flex items-start gap-3">
          <Checkbox 
            checked={task.completed} 
            onCheckedChange={handleComplete}
            className={`mt-1 ${task.completed ? 'opacity-100' : 'opacity-90'}`}
          />
          
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleEdit} className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleDelete} className="h-8 w-8 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {task.description && (
              <p className={`text-sm mt-1 ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground/80'}`}>
                {task.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatTime(task.timeSlot)}</span>
              </div>
              
              {task.deadline && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarClock className="h-3 w-3" />
                  <span>Due {new Date(task.deadline).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {task.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs py-0 px-2">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {isEditing && (
        <TaskModal 
          isOpen={isEditing} 
          onClose={handleCancel} 
          onSave={handleUpdate} 
          task={task} 
          mode="edit" 
        />
      )}
    </>
  );
};

export default TaskItem;
