import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useClinic } from '@/hooks/useClinic';
import { Loader2 } from 'lucide-react';

export function ClinicProtectedRoute() {
  const { user, loading: authLoading } = useAuth();
  const { clinic, loading: clinicLoading } = useClinic();

  // Show loading while checking auth
  if (authLoading || clinicLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your clinic...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to access denied if no clinic found
  if (!clinic) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
}
