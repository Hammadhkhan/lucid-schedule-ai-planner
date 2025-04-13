
import { format, parse, isValid } from 'date-fns';

export const formatTime = (timeString: string): string => {
  if (!timeString) return '';
  
  const parsedTime = parse(timeString, 'HH:mm', new Date());
  if (!isValid(parsedTime)) return timeString;
  
  return format(parsedTime, 'h:mm a');
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const parsedDate = new Date(dateString);
  if (!isValid(parsedDate)) return dateString;
  
  return format(parsedDate, 'MMM d, yyyy');
};

export const getCurrentDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const getCurrentDateFormatted = (): string => {
  return format(new Date(), 'EEEE, MMMM d, yyyy');
};

export const getTimeSlots = (): string[] => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};
