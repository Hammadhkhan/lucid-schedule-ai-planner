
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { ScrollArea } from "@/components/ui/scroll-area";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (updatedTask: Task) => void;
  onReorder?: (reorderedTasks: Task[]) => void;
}

const TaskList = ({ tasks, onComplete, onDelete, onUpdate, onReorder }: TaskListProps) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    // First by time
    if (a.timeSlot < b.timeSlot) return -1;
    if (a.timeSlot > b.timeSlot) return 1;
    
    // Then by completion status
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    
    return 0;
  });
  
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !onReorder) return;
    
    const items = Array.from(sortedTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onReorder(items);
  };
  
  return (
    <ScrollArea className="h-[calc(100vh-350px)] pr-4">
      {sortedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
          <p>No tasks for today</p>
          <p className="text-sm">Add a task to get started</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {sortedTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem 
                          key={task.id} 
                          task={task} 
                          onComplete={onComplete}
                          onDelete={onDelete}
                          onUpdate={onUpdate}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </ScrollArea>
  );
};

export default TaskList;
