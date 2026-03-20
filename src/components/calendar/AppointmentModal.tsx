import { format } from 'date-fns';
import { Appointment } from '@/types/appointments';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

  const initials = appointment.patientName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 overflow-hidden animate-fade-up"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-float)',
          borderRadius: '16px',
          width: '360px',
          maxWidth: '360px',
        }}
      >
        {/* Modal header */}
        <div
          className="px-[22px] py-[18px]"
          style={{ background: 'var(--bg-teal)' }}
        >
          <DialogTitle
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.7)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              margin: 0,
            }}
          >
            Appointment Details
          </DialogTitle>
        </div>

        {/* Patient section */}
        <div className="flex items-center gap-3 px-[22px] pt-5 pb-0">
          {/* Avatar */}
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
            style={{
              background: 'var(--bg-teal-dim)',
              border: '2px solid var(--border-teal)',
            }}
          >
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                color: 'var(--text-teal)',
              }}
            >
              {initials}
            </span>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}
            >
              {appointment.patientName}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <StatusBadge status={appointment.status} />
              <SourceBadge source={appointment.source} />
            </div>
          </div>
        </div>

        {/* Details list */}
        <div className="px-[22px] pb-5 pt-4 space-y-0">
          {[
            {
              icon: Calendar,
              value: format(appointment.appointmentTime, 'EEEE, MMMM d, yyyy'),
              mono: false,
            },
            {
              icon: Clock,
              value: format(appointment.appointmentTime, 'h:mm a'),
              mono: true,
            },
            ...(appointment.reason
              ? [{ icon: Stethoscope, value: appointment.reason, mono: false }]
              : []),
          ].map(({ icon: Icon, value, mono }, idx, arr) => (
            <div
              key={idx}
              className="flex items-center gap-3 py-3"
              style={{
                borderBottom: idx < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <Icon
                style={{ width: '14px', height: '14px', color: 'var(--text-tertiary)', flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: mono ? 'IBM Plex Mono, monospace' : 'IBM Plex Sans, sans-serif',
                  fontSize: '13px',
                  fontWeight: mono ? 500 : 400,
                  color: mono ? 'var(--text-teal)' : 'var(--text-secondary)',
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
