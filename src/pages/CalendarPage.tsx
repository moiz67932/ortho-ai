import { useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MonthCalendar } from '@/components/calendar/MonthCalendar';
import { useAppointments } from '@/hooks/useAppointments';
import { parseISO } from 'date-fns';
import type { Appointment as DisplayAppointment } from '@/types/appointments';

const CalendarPage = () => {
  const { appointments, loading } = useAppointments();

  // Convert database appointments to display format
  const displayAppointments: DisplayAppointment[] = useMemo(
    () => appointments.map((apt) => ({
      id: apt.id,
      patientName: apt.patient_name,
      appointmentTime: parseISO(apt.start_time),
      reason: apt.reason || '',
      status: apt.status,
      source: apt.source,
    })),
    [appointments]
  );

  return (
    <DashboardLayout title="Calendar">
      {loading ? (
        <div className="flex h-[600px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <MonthCalendar appointments={displayAppointments} />
      )}
    </DashboardLayout>
  );
};

export default CalendarPage;
