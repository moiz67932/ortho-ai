import { Appointment } from '@/types/appointments';
import { format } from 'date-fns';

interface AppointmentPillProps {
  appointment: Appointment;
  onClick?: () => void;
}

export function AppointmentPill({ appointment, onClick }: AppointmentPillProps) {
  return (
    <button
      onClick={onClick}
      className="w-full truncate text-left transition-colors duration-100"
      style={{
        background: 'var(--bg-teal-dim)',
        borderLeft: '3px solid var(--bg-teal)',
        borderRadius: '0 4px 4px 0',
        padding: '3px 8px',
        fontFamily: 'IBM Plex Mono, monospace',
        fontSize: '12.5px',
        fontWeight: 500,
        color: '#0C7A72',
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(13,148,136,0.12)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-teal-dim)';
      }}
    >
      {format(appointment.appointmentTime, 'h:mm a')} {appointment.patientName}
    </button>
  );
}
