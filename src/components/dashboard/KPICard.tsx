import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  loading?: boolean;
  className?: string;
  accent?: boolean; /* true = AI Booked teal treatment */
}

export function KPICard({ title, value, icon: Icon, loading, className, accent }: KPICardProps) {
  if (loading) {
    return (
      <div
        className={cn('rounded-xl border p-6', className)}
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-2.5 w-20 animate-pulse rounded" style={{ background: 'var(--border-medium)' }} />
            <div className="h-10 w-12 animate-pulse rounded" style={{ background: 'var(--border-subtle)' }} />
          </div>
          <div className="h-4 w-4 animate-pulse rounded" style={{ background: 'var(--border-medium)' }} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'animate-fade-up rounded-xl border p-6 transition-colors duration-150',
        className
      )}
      style={{
        background: accent ? 'var(--bg-teal-dim)' : 'var(--bg-surface)',
        borderColor: accent ? 'var(--border-teal)' : 'var(--border-subtle)',
        boxShadow: 'var(--shadow-card)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = accent
          ? 'rgba(13,148,136,0.5)'
          : 'var(--border-medium)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = accent
          ? 'var(--border-teal)'
          : 'var(--border-subtle)';
      }}
    >
      {/* Top row: label + icon */}
      <div className="flex items-start justify-between">
        <p
          className="text-[11px] uppercase"
          style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 400,
            color: accent ? 'var(--text-teal)' : 'var(--text-tertiary)',
            letterSpacing: '0.06em',
          }}
        >
          {accent && <span className="mr-1 text-[#0D9488]" style={{ fontSize: '8px' }}>✦</span>}
          {title}
        </p>
        <Icon
          style={{
            width: '16px',
            height: '16px',
            color: accent ? 'var(--text-teal)' : 'var(--text-tertiary)',
          }}
        />
      </div>

      {/* Spacer */}
      <div className="mt-2" />

      {/* Value — the "wow" moment */}
      <p
        className="leading-none"
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '40px',
          fontWeight: 300,
          color: accent ? 'var(--bg-teal)' : 'var(--text-primary)',
          letterSpacing: '-0.04em',
        }}
      >
        {value}
      </p>

      {/* Decorative trend line */}
      <div
        className="mt-3 h-px w-12 rounded-full"
        style={{ background: accent ? 'var(--bg-teal)' : 'var(--border-medium)' }}
      />
    </div>
  );
}
