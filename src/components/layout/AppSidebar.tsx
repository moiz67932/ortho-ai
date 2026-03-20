import { LayoutDashboard, CalendarDays, Settings2, LogOut } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Calendar',  url: '/calendar',  icon: CalendarDays },
  { title: 'Settings',  url: '/settings',  icon: Settings2 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location  = useLocation();
  const { user, signOut } = useAuth();
  const collapsed = state === 'collapsed';

  const email    = user?.email ?? '';
  const initial  = (user?.user_metadata?.full_name?.[0] ?? user?.email?.[0] ?? 'U').toUpperCase();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      {/* ── Header / Logo ── */}
      <SidebarHeader className="px-0 py-0">
        <div className={cn('flex items-center gap-3 px-5 py-6', collapsed && 'justify-center px-3')}>
          {/* Logo mark */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0D9488]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M5 3.5C5 3.5 4 3.5 3.5 5C3 6.5 3 8.5 4 10.5C5 12.5 6 13 7 13C7.5 13 7.8 12.5 8 12.5C8.2 12.5 8.5 13 9 13C10 13 11 12.5 12 10.5C13 8.5 13 6.5 12.5 5C12 3.5 11 3.5 11 3.5C11 3.5 10 3.5 9.5 4.5C9.2 5.2 8.8 5.5 8 5.5C7.2 5.5 6.8 5.2 6.5 4.5C6 3.5 5 3.5 5 3.5Z" />
            </svg>
          </div>

          {!collapsed && (
            <div className="flex flex-col">
              <span
                className="text-[15px] font-medium leading-none text-white"
                style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.01em' }}
              >
                Ortho AI
              </span>
              <span
                className="mt-0.5 text-[11px] font-light leading-none"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif', color: 'rgba(255,255,255,0.4)' }}
              >
                Clinic Dashboard
              </span>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="mx-5 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
      </SidebarHeader>

      {/* ── Nav Items ── */}
      <SidebarContent className="px-0 py-3">
        <div className="flex flex-col gap-0.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <NavLink
                key={item.title}
                to={item.url}
                className={cn('group mx-3 block rounded-lg', collapsed && 'mx-2')}
              >
                <div
                  className={cn(
                    'relative flex items-center gap-2.5 rounded-lg px-4 py-[9px] transition-colors duration-150',
                    collapsed && 'justify-center px-3',
                    isActive
                      ? 'bg-[rgba(13,148,136,0.2)]'
                      : 'hover:bg-[rgba(255,255,255,0.06)]'
                  )}
                >
                  {/* Active left-border indicator */}
                  {isActive && (
                    <span
                      className="absolute left-0 rounded-r-sm"
                      style={{
                        top: '20%',
                        height: '60%',
                        width: '2px',
                        background: '#14B8A6',
                      }}
                    />
                  )}

                  <item.icon
                    className={cn(
                      'shrink-0 transition-colors duration-150',
                      isActive ? 'text-[#14B8A6]' : 'group-hover:text-[rgba(255,255,255,0.85)]'
                    )}
                    style={{
                      width: '15px',
                      height: '15px',
                      color: isActive ? '#14B8A6' : 'rgba(255,255,255,0.45)',
                    }}
                  />

                  {!collapsed && (
                    <span
                      className={cn(
                        'text-[13px] transition-colors duration-150',
                        isActive
                          ? 'font-medium text-white'
                          : 'font-medium group-hover:text-[rgba(255,255,255,0.85)]'
                      )}
                      style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                      }}
                    >
                      {item.title}
                    </span>
                  )}
                </div>
              </NavLink>
            );
          })}
        </div>
      </SidebarContent>

      {/* ── Footer / User ── */}
      <SidebarFooter className="px-0 py-0">
        <div
          className="border-t px-5 py-4"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div className={cn('flex items-center justify-between', collapsed && 'justify-center')}>
            <div className={cn('flex items-center gap-2.5', collapsed && 'gap-0')}>
              {/* Avatar */}
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D9488]"
              >
                <span
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '11px',
                    color: 'white',
                  }}
                >
                  {initial}
                </span>
              </div>

              {!collapsed && (
                <span
                  className="max-w-[110px] truncate"
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  {email}
                </span>
              )}
            </div>

            {!collapsed && (
              <button
                onClick={signOut}
                className="rounded p-1 transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                title="Sign out"
              >
                <LogOut style={{ width: '14px', height: '14px' }} />
              </button>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
