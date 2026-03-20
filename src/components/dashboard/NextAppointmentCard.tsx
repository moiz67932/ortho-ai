import { format } from 'date-fns';
import { Appointment } from '@/types/appointments';
import { Clock, User, Stethoscope, CheckCircle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { SourceBadge } from './SourceBadge';

interface NextAppointmentCardProps {
  appointment: Appointment | null;
  loading?: boolean;
}

export function NextAppointmentCard({ appointment, loading }: NextAppointmentCardProps) {
  if (loading) {
    return (
      <div
        className="rounded-xl p-6"
        style={{
          background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
          boxShadow: '0 8px 24px rgba(13,148,136,0.25)',
        }}
      >
        <div className="space-y-3">
          <div className="h-2.5 w-28 animate-pulse rounded" style={{ background: 'rgba(255,255,255,0.2)' }} />
          <div className="h-12 w-24 animate-pulse rounded" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <div className="h-3 w-32 animate-pulse rounded" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="h-3 w-28 animate-pulse rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-xl p-8 text-center gap-3"
        style={{
          background: 'var(--bg-teal-dim)',
          border: '1px solid var(--border-teal)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <CheckCircle style={{ width: '32px', height: '32px', color: 'var(--text-teal)' }} />
        <div>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--text-teal)',
            }}
          >
            All clear
          </p>
          <p
            style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: '13px',
              fontWeight: 300,
              color: 'var(--text-teal)',
              opacity: 0.7,
              marginTop: '4px',
            }}
          >
            No upcoming appointments
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl"
      style={{
        background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
        boxShadow: '0 8px 24px rgba(13,148,136,0.25)',
        padding: '22px 24px',
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock style={{ width: '14px', height: '14px', color: 'rgba(255,255,255,0.6)' }} />
          <span
            style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Next Appointment
          </span>
        </div>
        {/* Status badge on dark bg */}
        <span
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 500,
          }}
        >
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      </div>

      {/* Time display */}
      <div className="mt-2">
        <p
          className="leading-none"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '48px',
            fontWeight: 300,
            color: 'white',
            letterSpacing: '-0.04em',
          }}
        >
          {format(appointment.appointmentTime, 'h:mm a')}
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: '13px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          {format(appointment.appointmentTime, 'EEEE, d MMMM')}
        </p>
      </div>

      {/* Divider */}
      <div
        className="my-4"
        style={{ height: '1px', background: 'rgba(255,255,255,0.12)' }}
      />

      {/* Patient info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <User style={{ width: '14px', height: '14px', color: 'rgba(255,255,255,0.5)' }} />
          <span
            style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: 'white',
            }}
          >
            {appointment.patientName}
          </span>
        </div>
        {appointment.reason && (
          <div className="flex items-center gap-2">
            <Stethoscope style={{ width: '14px', height: '14px', color: 'rgba(255,255,255,0.5)' }} />
            <span
              style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '13px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {appointment.reason}
            </span>
          </div>
        )}
      </div>

      {/* Source badge */}
      <div className="mt-4">
        <SourceBadge source={appointment.source} />
      </div>
    </div>
  );
}
