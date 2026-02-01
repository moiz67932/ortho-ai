import { Badge } from '@/components/ui/badge';
import { AppointmentStatus } from '@/types/appointments';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: AppointmentStatus;
  className?: string;
}

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  scheduled: {
    label: 'Scheduled',
    className: 'bg-status-scheduled/10 text-status-scheduled hover:bg-status-scheduled/20 border-status-scheduled/20',
  },
  completed: {
    label: 'Completed',
    className: 'bg-status-completed/10 text-status-completed hover:bg-status-completed/20 border-status-completed/20',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-status-cancelled/10 text-status-cancelled hover:bg-status-cancelled/20 border-status-cancelled/20',
  },
  rescheduled: {
    label: 'Rescheduled',
    className: 'bg-status-rescheduled/10 text-status-rescheduled hover:bg-status-rescheduled/20 border-status-rescheduled/20',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={cn(config.className, "font-medium border", className)}
    >
      {config.label}
    </Badge>
  );
}
