import { useState, useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
} from 'date-fns';
import { Appointment } from '@/types/appointments';
import { AppointmentPill } from './AppointmentPill';
import { AppointmentModal } from './AppointmentModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MonthCalendarProps {
  appointments: Appointment[];
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function MonthCalendar({ appointments }: MonthCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const calendarDays = useMemo(() => {
    const monthStart    = startOfMonth(currentMonth);
    const monthEnd      = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd   = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonth]);

  const appointmentsByDay = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    appointments.forEach((apt) => {
      const key = format(apt.appointmentTime, 'yyyy-MM-dd');
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(apt);
    });
    return map;
  }, [appointments]);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  return (
    <>
      <div
        className="overflow-hidden rounded-xl border"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Calendar header */}
        <div
          className="flex items-center justify-between px-6 py-[18px]"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <h2
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {format(currentMonth, 'MMMM yyyy')}
          </h2>

          <div className="flex items-center gap-2">
            {/* Prev button */}
            <button
              onClick={handlePrevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-150"
              style={{ borderColor: 'var(--border-medium)', color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--text-teal)';
                el.style.color = 'var(--text-teal)';
                el.style.background = 'var(--bg-teal-dim)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--border-medium)';
                el.style.color = 'var(--text-secondary)';
                el.style.background = 'transparent';
              }}
            >
              <ChevronLeft style={{ width: '14px', height: '14px' }} />
            </button>

            {/* Today button */}
            <button
              onClick={() => setCurrentMonth(new Date())}
              className="rounded-md border-none px-3.5 py-1.5 transition-all duration-150"
              style={{
                background: 'var(--bg-teal)',
                color: 'white',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = '#0F766E';
                el.style.boxShadow = 'var(--shadow-ring-teal)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = 'var(--bg-teal)';
                el.style.boxShadow = 'none';
              }}
            >
              Today
            </button>

            {/* Next button */}
            <button
              onClick={handleNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-150"
              style={{ borderColor: 'var(--border-medium)', color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--text-teal)';
                el.style.color = 'var(--text-teal)';
                el.style.background = 'var(--bg-teal-dim)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--border-medium)';
                el.style.color = 'var(--text-secondary)';
                el.style.background = 'transparent';
              }}
            >
              <ChevronRight style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
        </div>

        {/* Day-of-week headers */}
        <div
          className="grid grid-cols-7"
          style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)' }}
        >
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="pb-3 pt-2.5 text-center"
              style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            const dayKey          = format(day, 'yyyy-MM-dd');
            const dayAppointments = appointmentsByDay.get(dayKey) || [];
            const isCurrentMonth  = isSameMonth(day, currentMonth);
            const isWeekend       = day.getDay() === 0 || day.getDay() === 6;
            const today           = isToday(day);

            return (
              <div
                key={index}
                className="animate-fade-in"
                style={{
                  minHeight: '110px',
                  borderRight: (index + 1) % 7 !== 0 ? '1px solid var(--border-subtle)' : 'none',
                  borderBottom: '1px solid var(--border-subtle)',
                  padding: '10px 10px',
                  background: isWeekend
                    ? 'rgba(26,35,50,0.015)'
                    : !isCurrentMonth
                    ? 'rgba(26,35,50,0.008)'
                    : 'transparent',
                }}
              >
                {/* Day number */}
                <div
                  className={cn(
                    'mb-1.5 flex h-7 w-7 items-center justify-center',
                    today && 'rounded-full'
                  )}
                  style={
                    today
                      ? {
                          background: 'var(--bg-teal)',
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'white',
                        }
                      : {
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: !isCurrentMonth
                            ? 'rgba(148,163,184,0.4)'
                            : 'var(--text-secondary)',
                        }
                  }
                >
                  {format(day, 'd')}
                </div>

                {/* Appointment pills */}
                <div className="space-y-0.5">
                  {dayAppointments.slice(0, 3).map((apt) => (
                    <AppointmentPill
                      key={apt.id}
                      appointment={apt}
                      onClick={() => handleAppointmentClick(apt)}
                    />
                  ))}
                  {dayAppointments.length > 3 && (
                    <button
                      className="pl-1 transition-colors duration-100"
                      style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--text-tertiary)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0 0 0 4px',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-teal)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                      onClick={() => handleAppointmentClick(dayAppointments[3])}
                    >
                      +{dayAppointments.length - 3} more
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AppointmentModal
        appointment={selectedAppointment}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
