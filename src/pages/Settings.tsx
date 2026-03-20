import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useClinic } from '@/hooks/useClinic';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, Mail, Bell, Calendar, Loader2, Copy } from 'lucide-react';
import { toast } from 'sonner';

/* ── Reusable section card ── */
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div
        className="px-6 pb-3.5 pt-[18px]"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}
        >
          {title}
        </p>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

/* ── Read-only field ── */
function FieldRow({ label, value, mono = false, copyable = false }: {
  label: string;
  value: string;
  mono?: boolean;
  copyable?: boolean;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success('Copied to clipboard');
  };

  return (
    <div>
      <p
        className="mb-1.5 uppercase"
        style={{
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontSize: '11px',
          fontWeight: 400,
          color: 'var(--text-tertiary)',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </p>
      <div
        className="flex items-center justify-between rounded-lg"
        style={{
          background: 'var(--bg-base)',
          border: '1px solid var(--border-subtle)',
          padding: '9px 14px',
        }}
      >
        <span
          style={{
            fontFamily: mono ? 'IBM Plex Mono, monospace' : 'IBM Plex Sans, sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            color: 'var(--text-secondary)',
          }}
        >
          {value || '—'}
        </span>
        {copyable && value && (
          <button
            onClick={handleCopy}
            className="transition-colors duration-150"
            style={{ color: 'var(--text-tertiary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-teal)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
          >
            <Copy style={{ width: '14px', height: '14px' }} />
          </button>
        )}
      </div>
    </div>
  );
}

const Settings = () => {
  const { user, signOut } = useAuth();
  const { clinic, loading: clinicLoading } = useClinic();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    appointments: true,
    reminders: true,
  });

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
      setIsLoggingOut(false);
    }
  };

  const initials = clinic?.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'CL';

  const notifRows = [
    { key: 'email',        icon: Mail,     label: 'Email Notifications',   sub: 'Receive updates via email' },
    { key: 'appointments', icon: Calendar,  label: 'New Appointments',       sub: 'Get notified for new bookings' },
    { key: 'reminders',    icon: Bell,      label: 'Appointment Reminders',  sub: 'Daily reminder for upcoming appointments' },
  ] as const;

  return (
    <DashboardLayout title="Settings">
      <div className="mx-auto max-w-[600px] space-y-5 pt-8">

        {/* ── Clinic Profile ── */}
        <SectionCard title="Clinic Profile">
          {clinicLoading ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="space-y-5">
              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)' }}
                  >
                    <span
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '20px',
                        fontWeight: 500,
                        color: 'white',
                      }}
                    >
                      {initials}
                    </span>
                  </div>
                )}
                <div>
                  <p
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {clinic?.name || 'Unknown Clinic'}
                  </p>
                  <p
                    style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '12px',
                      color: 'var(--text-tertiary)',
                      marginTop: '2px',
                    }}
                  >
                    {clinic?.email || user?.email}
                  </p>
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-3">
                <FieldRow label="Clinic Name" value={clinic?.name || ''} />
                <FieldRow label="Contact Email" value={clinic?.email || user?.email || ''} />
                <FieldRow
                  label="Organization ID"
                  value={clinic?.organization_id || 'N/A'}
                  mono
                  copyable
                />
              </div>
            </div>
          )}
        </SectionCard>

        {/* ── Notification Preferences ── */}
        <SectionCard title="Notification Preferences">
          <div className="space-y-0">
            {notifRows.map(({ key, icon: Icon, label, sub }, idx) => (
              <div
                key={key}
                className="flex items-center justify-between py-3.5"
                style={{
                  borderBottom: idx < notifRows.length - 1
                    ? '1px solid var(--border-subtle)'
                    : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Icon in rounded square */}
                  <div
                    className="flex items-center justify-center rounded-lg"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'var(--bg-teal-dim)',
                    }}
                  >
                    <Icon
                      style={{ width: '16px', height: '16px', color: 'var(--text-teal)' }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        color: 'var(--text-tertiary)',
                        marginTop: '1px',
                      }}
                    >
                      {sub}
                    </p>
                  </div>
                </div>

                <Switch
                  checked={notifications[key]}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, [key]: checked })
                  }
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Sign Out ── */}
        <SectionCard title="Sign Out">
          <button
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="flex items-center gap-2 rounded-lg border transition-colors duration-150"
            style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              color: '#DC2626',
              background: '#FEF2F2',
              borderColor: 'rgba(220,38,38,0.2)',
              padding: '8px 18px',
              cursor: isLoggingOut ? 'not-allowed' : 'pointer',
              opacity: isLoggingOut ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoggingOut) (e.currentTarget as HTMLButtonElement).style.background = '#FEE2E2';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#FEF2F2';
            }}
          >
            {isLoggingOut ? (
              <Loader2 style={{ width: '14px', height: '14px' }} className="animate-spin" />
            ) : (
              <LogOut style={{ width: '14px', height: '14px' }} />
            )}
            {isLoggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </SectionCard>

      </div>
    </DashboardLayout>
  );
};

export default Settings;
