import { ReactNode } from 'react';
import { SidebarProvider, SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

function DashboardHeader({ title }: { title: string }) {
  const { toggleSidebar } = useSidebar();
  const { user } = useAuth();

  const initial = (
    user?.user_metadata?.full_name?.[0] ?? user?.email?.[0] ?? 'U'
  ).toUpperCase();

  const todayLabel = format(new Date(), "'FRI' dd 'MAR' yyyy").toUpperCase();

  return (
    <header
      className="sticky top-0 z-10 flex h-14 items-center justify-between px-6"
      style={{
        background: 'var(--bg-base)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {/* Left: toggle + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1.5 transition-colors duration-150"
          style={{ color: 'var(--text-tertiary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
        >
          <Menu style={{ width: '18px', height: '18px' }} />
        </button>

        <h1
          className="text-[18px] font-medium leading-none"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h1>
      </div>

      {/* Right: Live pill + avatar */}
      <div className="flex items-center gap-2">
        {/* Live pill */}
        <div
          className="flex items-center gap-1.5 rounded-full border px-2 py-1"
          style={{
            background: 'var(--bg-teal-dim)',
            borderColor: 'var(--border-teal)',
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#0D9488] animate-pulse-soft"
          />
          <span
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '11px',
              color: 'var(--text-teal)',
            }}
          >
            Live
          </span>
        </div>

        {/* User avatar */}
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D9488]"
        >
          <span
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '12px',
              color: 'white',
            }}
          >
            {initial}
          </span>
        </div>
      </div>
    </header>
  );
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col" style={{ background: 'var(--bg-base)' }}>
          <DashboardHeader title={title} />
          <main className="flex-1 p-4 lg:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
