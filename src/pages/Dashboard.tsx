import { useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { AppointmentsTable } from '@/components/dashboard/AppointmentsTable';
import { NextAppointmentCard } from '@/components/dashboard/NextAppointmentCard';
import { useAppointments } from '@/hooks/useAppointments';
import { useClinic } from '@/hooks/useClinic';
import { Calendar, Clock, CalendarCheck, Bot } from 'lucide-react';
import { isToday, isFuture, isAfter, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import type { Appointment } from '@/types/database';

// Convert database appointment to display format
const toDisplayAppointment = (apt: Appointment, timezone: string) => ({
  id: apt.id,
  patientName: apt.patient_name,
  appointmentTime: toZonedTime(parseISO(apt.start_time), timezone),
  reason: apt.reason || '',
  status: apt.status,
  source: apt.source,
});

const Dashboard = () => {
  const { appointments, loading } = useAppointments();
  const { clinic } = useClinic();
  const clinicTimezone = clinic?.timezone ?? 'America/New_York';

  const todayAppointments = useMemo(
    () => appointments.filter((apt) => isToday(parseISO(apt.start_time))),
    [appointments]
  );

  const upcomingAppointments = useMemo(
    () => appointments.filter((apt) => isFuture(parseISO(apt.start_time)) && !isToday(parseISO(apt.start_time))),
    [appointments]
  );

  const aiBookedAppointments = useMemo(
    () => appointments.filter((apt) => apt.source === 'ai'),
    [appointments]
  );

  const nextAppointment = useMemo(() => {
    const now = new Date();
    const futureAppointments = appointments
      .filter((apt) => isAfter(parseISO(apt.start_time), now) && apt.status === 'scheduled')
      .sort((a, b) => parseISO(a.start_time).getTime() - parseISO(b.start_time).getTime());
    return futureAppointments[0] ? toDisplayAppointment(futureAppointments[0], clinicTimezone) : null;
  }, [appointments, clinicTimezone]);

  const displayTodayAppointments = useMemo(
    () => todayAppointments.map((apt) => toDisplayAppointment(apt, clinicTimezone)),
    [todayAppointments, clinicTimezone]
  );

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Today's Appointments"
            value={todayAppointments.length}
            icon={Calendar}
            loading={loading}
          />
          <KPICard
            title="Upcoming Appointments"
            value={upcomingAppointments.length}
            icon={Clock}
            loading={loading}
          />
          <KPICard
            title="Total Appointments"
            value={appointments.length}
            icon={CalendarCheck}
            loading={loading}
          />
          <KPICard
            title="AI-Booked"
            value={aiBookedAppointments.length}
            icon={Bot}
            loading={loading}
          />
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AppointmentsTable
              appointments={displayTodayAppointments}
              loading={loading}
            />
          </div>
          <div>
            <NextAppointmentCard
              appointment={nextAppointment}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
