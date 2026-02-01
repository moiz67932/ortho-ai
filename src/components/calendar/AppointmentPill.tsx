import { Appointment, AppointmentStatus } from '@/types/appointments';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AppointmentPillProps {
  appointment: Appointment;
  onClick?: () => void;
}

const statusColors: Record<AppointmentStatus, string> = {
  scheduled: 'bg-status-scheduled/20 text-status-scheduled border-status-scheduled/30',
  completed: 'bg-status-completed/20 text-status-completed border-status-completed/30',
  cancelled: 'bg-status-cancelled/20 text-status-cancelled border-status-cancelled/30',
  rescheduled: 'bg-status-rescheduled/20 text-status-rescheduled border-status-rescheduled/30',
};

export function AppointmentPill({ appointment, onClick }: AppointmentPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full truncate rounded-full border px-2 py-0.5 text-left text-xs font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-sm",
        statusColors[appointment.status]
      )}
    >
      <span className="mr-1">{format(appointment.appointmentTime, 'h:mm a')}</span>
      <span className="truncate">{appointment.patientName}</span>
    </button>
  );
}
