import { AppointmentSource } from '@/types/appointments';
import { cn } from '@/lib/utils';

interface SourceBadgeProps {
  source: AppointmentSource;
  className?: string;
}

export function SourceBadge({ source, className }: SourceBadgeProps) {
  const isAI = source === 'ai';

  if (isAI) {
    return (
      <span
        className={cn('inline-flex items-center gap-1 rounded', className)}
        style={{
          background: 'var(--bg-teal-dim)',
          color: 'var(--text-teal)',
          border: '1px solid var(--border-teal)',
          padding: '2px 8px',
          fontSize: '11px',
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '8px' }}>✦</span>
        AI
      </span>
    );
  }

  return (
    <span
      className={cn('inline-flex items-center rounded', className)}
      style={{
        background: '#F1F5F9',
        color: '#64748B',
        border: '1px solid rgba(100,116,139,0.2)',
        padding: '2px 8px',
        fontSize: '11px',
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      Manual
    </span>
  );
}
