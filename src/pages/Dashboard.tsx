import { useState, useEffect, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { AppointmentsTable } from '@/components/dashboard/AppointmentsTable';
import { NextAppointmentCard } from '@/components/dashboard/NextAppointmentCard';
import { mockAppointments } from '@/data/mockAppointments';
import { Calendar, Clock, CalendarCheck, Bot } from 'lucide-react';
import { isToday, isFuture, isAfter } from 'date-fns';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const todayAppointments = useMemo(
    () => mockAppointments.filter((apt) => isToday(apt.appointmentTime)),
    []
  );

  const upcomingAppointments = useMemo(
    () => mockAppointments.filter((apt) => isFuture(apt.appointmentTime) && !isToday(apt.appointmentTime)),
    []
  );

  const aiBookedAppointments = useMemo(
    () => mockAppointments.filter((apt) => apt.source === 'ai'),
    []
  );

  const nextAppointment = useMemo(() => {
    const now = new Date();
    const futureAppointments = mockAppointments
      .filter((apt) => isAfter(apt.appointmentTime, now) && apt.status === 'scheduled')
      .sort((a, b) => a.appointmentTime.getTime() - b.appointmentTime.getTime());
    return futureAppointments[0] || null;
  }, []);

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
            value={mockAppointments.length}
            icon={CalendarCheck}
            loading={loading}
          />
          <KPICard
            title="AI-Booked"
            value={aiBookedAppointments.length}
            icon={Bot}
            trend={{ value: 12, isPositive: true }}
            loading={loading}
          />
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AppointmentsTable
              appointments={todayAppointments}
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
