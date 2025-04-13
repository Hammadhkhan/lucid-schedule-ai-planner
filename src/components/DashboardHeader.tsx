
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { getCurrentDateFormatted } from '@/utils/date-utils';
import ThemeToggle from "./ThemeToggle";

interface DashboardHeaderProps {
  onAddTask: () => void;
}

const DashboardHeader = ({ onAddTask }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Smart Daily Planner</h1>
          <p className="text-muted-foreground">{getCurrentDateFormatted()}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button onClick={onAddTask} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
