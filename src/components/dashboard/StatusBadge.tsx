import { AppointmentStatus } from '@/types/appointments';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: AppointmentStatus;
  className?: string;
}

const statusConfig: Record<AppointmentStatus, { label: string; style: React.CSSProperties }> = {
  scheduled: {
    label: 'Scheduled',
    style: {
      background: '#EFF6FF',
      color: '#2563EB',
      border: '1px solid rgba(37,99,235,0.2)',
    },
  },
  completed: {
    label: 'Completed',
    style: {
      background: 'var(--bg-teal-dim)',
      color: 'var(--text-teal)',
      border: '1px solid var(--border-teal)',
    },
  },
  cancelled: {
    label: 'Cancelled',
    style: {
      background: '#FEF2F2',
      color: '#DC2626',
      border: '1px solid rgba(220,38,38,0.2)',
    },
  },
  rescheduled: {
    label: 'Rescheduled',
    style: {
      background: '#FFFBEB',
      color: '#D97706',
      border: '1px solid rgba(217,119,6,0.2)',
    },
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn('inline-flex items-center rounded', className)}
      style={{
        ...config.style,
        padding: '2px 8px',
        fontSize: '11px',
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontWeight: 500,
        lineHeight: '1.4',
        whiteSpace: 'nowrap',
      }}
    >
      {config.label}
    </span>
  );
}
