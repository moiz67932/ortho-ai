import { format } from 'date-fns';
import { Appointment } from '@/types/appointments';
import { StatusBadge } from './StatusBadge';
import { SourceBadge } from './SourceBadge';

interface AppointmentsTableProps {
  appointments: Appointment[];
  loading?: boolean;
}

const todayLabel = (() => {
  const d = new Date();
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
})();

export function AppointmentsTable({ appointments, loading }: AppointmentsTableProps) {
  if (loading) {
    return (
      <div
        className="overflow-hidden rounded-xl border"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 pb-3.5 pt-[18px]"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-primary)',
            }}
          >
            Today's Appointments
          </span>
        </div>
        <div className="px-6 py-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-3 w-32 animate-pulse rounded" style={{ background: 'var(--border-subtle)' }} />
              <div className="h-3 w-16 animate-pulse rounded" style={{ background: 'var(--border-subtle)' }} />
              <div className="h-3 w-28 animate-pulse rounded" style={{ background: 'var(--border-subtle)' }} />
              <div className="h-5 w-20 animate-pulse rounded" style={{ background: 'var(--border-subtle)' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-6 pb-3.5 pt-[18px]"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <span
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}
        >
          Today's Appointments
        </span>
        <span
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '11px',
            color: 'var(--text-tertiary)',
          }}
        >
          {todayLabel}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-auto" style={{ maxHeight: '350px' }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: 'var(--bg-surface-raised)' }}>
              {['Patient Name', 'Time', 'Reason', 'Status', 'Source'].map((h) => (
                <th
                  key={h}
                  className="text-left"
                  style={{
                    padding: '10px 24px',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '10px',
                    fontWeight: 400,
                    color: 'var(--text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="4" y="8" width="32" height="28" rx="3" stroke="var(--text-tertiary)" strokeWidth="1.5" fill="none"/>
                      <path d="M4 14H36" stroke="var(--text-tertiary)" strokeWidth="1.5"/>
                      <path d="M13 4V10M27 4V10" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="20" cy="25" r="6" fill="var(--bg-teal-dim)" stroke="var(--border-teal)" strokeWidth="1.5"/>
                      <path d="M17.5 25L19 26.5L22.5 23" stroke="var(--text-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span
                      style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '13px',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      No appointments today
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              appointments.map((apt, idx) => (
                <tr
                  key={apt.id}
                  className="transition-colors duration-100"
                  style={{
                    borderBottom: idx < appointments.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F8F7F4')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '13px 24px' }}>
                    <span
                      style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {apt.patientName}
                    </span>
                  </td>
                  <td style={{ padding: '13px 24px' }}>
                    <span
                      style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '13px',
                        color: 'var(--text-teal)',
                      }}
                    >
                      {format(apt.appointmentTime, 'h:mm a')}
                    </span>
                  </td>
                  <td style={{ padding: '13px 24px' }}>
                    <span
                      style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '13px',
                        fontWeight: 400,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {apt.reason}
                    </span>
                  </td>
                  <td style={{ padding: '13px 24px' }}>
                    <StatusBadge status={apt.status} />
                  </td>
                  <td style={{ padding: '13px 24px' }}>
                    <SourceBadge source={apt.source} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
