import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MonthCalendar } from '@/components/calendar/MonthCalendar';
import { mockAppointments } from '@/data/mockAppointments';

const CalendarPage = () => {
  return (
    <DashboardLayout title="Calendar">
      <MonthCalendar appointments={mockAppointments} />
    </DashboardLayout>
  );
};

export default CalendarPage;
