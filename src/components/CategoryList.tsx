
import { CategoryInfo } from '@/types';
import { Card } from "@/components/ui/card";
import { CATEGORIES } from '@/data/initial-data';
import { Briefcase, BookOpen, User, Heart, Users, MoreHorizontal } from "lucide-react";

interface CategoryListProps {
  tasks: any[];
  onSelectCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

const CategoryList = ({ tasks, onSelectCategory, selectedCategory }: CategoryListProps) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="h-5 w-5" />;
      case 'BookOpen': return <BookOpen className="h-5 w-5" />;
      case 'User': return <User className="h-5 w-5" />;
      case 'Heart': return <Heart className="h-5 w-5" />;
      case 'Users': return <Users className="h-5 w-5" />;
      default: return <MoreHorizontal className="h-5 w-5" />;
    }
  };
  
  const getCategoryProgress = (categoryId: string) => {
    const categoryTasks = tasks.filter(task => task.category === categoryId);
    if (categoryTasks.length === 0) return 0;
    
    const completedTasks = categoryTasks.filter(task => task.completed);
    return Math.round((completedTasks.length / categoryTasks.length) * 100);
  };
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card 
        className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
          selectedCategory === null ? 'ring-2 ring-primary' : ''
        }`}
        onClick={() => onSelectCategory(null)}
      >
        <div className="flex flex-col items-center justify-center h-full gap-2">
          <div className="rounded-full bg-muted p-2">
            <MoreHorizontal className="h-5 w-5" />
          </div>
          <span className="font-medium text-sm">All Tasks</span>
        </div>
      </Card>
      
      {CATEGORIES.map(category => {
        const progress = getCategoryProgress(category.id);
        const categoryTasks = tasks.filter(task => task.category === category.id);
        
        return (
          <Card 
            key={category.id}
            className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
              selectedCategory === category.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <div className={`rounded-full category-bg-${category.id} p-2`}>
                {getCategoryIcon(category.icon)}
              </div>
              <span className="font-medium text-sm">{category.name}</span>
              <div className="w-full bg-secondary rounded-full h-1.5 mt-1">
                <div 
                  className={`category-bg-${category.id} h-1.5 rounded-full`} 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {categoryTasks.filter(t => t.completed).length}/{categoryTasks.length} tasks
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CategoryList;
