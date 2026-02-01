import { format } from 'date-fns';
import { Appointment } from '@/types/appointments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, User, Stethoscope } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { SourceBadge } from './SourceBadge';

interface NextAppointmentCardProps {
  appointment: Appointment | null;
  loading?: boolean;
}

export function NextAppointmentCard({ appointment, loading }: NextAppointmentCardProps) {
  if (loading) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-5 w-36" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-40" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!appointment) {
    return (
      <Card className="border-muted bg-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            Next Appointment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No upcoming appointments</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <span>Next Appointment</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">
              {format(appointment.appointmentTime, 'h:mm a')}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(appointment.appointmentTime, 'EEEE, MMM d')}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <StatusBadge status={appointment.status} />
            <SourceBadge source={appointment.source} />
          </div>
        </div>
        
        <div className="space-y-2 rounded-lg bg-accent/50 p-3">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{appointment.patientName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Stethoscope className="h-4 w-4" />
            <span>{appointment.reason}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
