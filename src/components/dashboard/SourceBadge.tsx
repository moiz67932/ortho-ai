import { Badge } from '@/components/ui/badge';
import { AppointmentSource } from '@/types/appointments';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SourceBadgeProps {
  source: AppointmentSource;
  className?: string;
}

export function SourceBadge({ source, className }: SourceBadgeProps) {
  const isAI = source === 'ai';
  
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-medium gap-1",
        isAI 
          ? "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20" 
          : "bg-muted text-muted-foreground hover:bg-muted/80 border-border",
        className
      )}
    >
      {isAI ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
      {isAI ? 'AI' : 'Manual'}
    </Badge>
  );
}
