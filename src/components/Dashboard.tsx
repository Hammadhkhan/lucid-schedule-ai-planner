
import { useState, useEffect } from 'react';
import { Task } from '@/types';
import { getTasks, saveTasks } from '@/services/storage-service';
import { SAMPLE_TASKS } from '@/data/initial-data';
import DashboardHeader from './DashboardHeader';
import CategoryList from './CategoryList';
import TaskList from './TaskList';
import AIAssistant from './AIAssistant';
import TaskModal from './TaskModal';
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const savedTasks = getTasks();
    if (savedTasks.length > 0) {
      setTasks(savedTasks);
    } else {
      // Use sample tasks for first-time users
      setTasks(SAMPLE_TASKS);
      saveTasks(SAMPLE_TASKS);
    }
  }, []);
  
  useEffect(() => {
    if (selectedCategory) {
      setFilteredTasks(tasks.filter(task => task.category === selectedCategory));
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, selectedCategory]);
  
  const handleAddTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setIsAddTaskModalOpen(false);
    toast({
      title: "Task added",
      description: "Your new task has been added to your schedule",
    });
  };
  
  const handleUpdateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully",
    });
  };
  
  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast({
      title: "Task deleted",
      description: "Your task has been deleted",
      variant: "destructive",
    });
  };
  
  const handleCompleteTask = (id: string, completed: boolean) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    
    if (completed) {
      toast({
        title: "Task completed",
        description: "Nice work! Task marked as complete",
      });
    }
  };
  
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  return (
    <div className="container py-8 max-w-screen-xl">
      <DashboardHeader onAddTask={() => setIsAddTaskModalOpen(true)} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <CategoryList 
            tasks={tasks} 
            onSelectCategory={handleCategorySelect} 
            selectedCategory={selectedCategory} 
          />
          
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedCategory 
                  ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tasks` 
                  : 'All Tasks'}
              </h2>
              <div className="text-sm text-muted-foreground">
                {filteredTasks.filter(t => t.completed).length}/{filteredTasks.length} completed
              </div>
            </div>
            
            <TaskList 
              tasks={filteredTasks} 
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <AIAssistant tasks={tasks} />
        </div>
      </div>
      
      <TaskModal 
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSave={handleAddTask}
        mode="add"
      />
    </div>
  );
};

export default Dashboard;
