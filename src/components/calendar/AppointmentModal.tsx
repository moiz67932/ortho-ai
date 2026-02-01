import { format } from 'date-fns';
import { Appointment } from '@/types/appointments';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { SourceBadge } from '@/components/dashboard/SourceBadge';
import { Clock, User, Stethoscope, Calendar } from 'lucide-react';

interface AppointmentModalProps {
  appointment: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentModal({ appointment, open, onOpenChange }: AppointmentModalProps) {
  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Appointment Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
              <div className="mt-1 flex flex-wrap gap-2">
                <StatusBadge status={appointment.status} />
                <SourceBadge source={appointment.source} />
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-lg bg-accent/50 p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {format(appointment.appointmentTime, 'EEEE, MMMM d, yyyy')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {format(appointment.appointmentTime, 'h:mm a')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{appointment.reason}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
