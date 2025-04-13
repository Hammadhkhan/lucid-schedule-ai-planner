
import Dashboard from '@/components/Dashboard';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Tip: Drag and Drop",
      description: "You can now reorder tasks by dragging and dropping them in the list.",
      duration: 5000,
    });
  }, []);
  
  return <Dashboard />;
};

export default Index;
