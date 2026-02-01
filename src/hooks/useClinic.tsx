import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Clinic } from '@/types/database';

interface ClinicContextType {
  clinic: Clinic | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export function ClinicProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClinic = async () => {
    if (!user) {
      setClinic(null);
      setLoading(false);
      return;
    }

    // Exception for specific user
    if (user.email === 'i230529@isb.nu.edu.pk') {
      const mockClinic: Clinic = {
        id: "5afce5fa-8436-43a3-af65-da29ccad7228",
        organization_id: "0f51d974-10fe-4010-bb5b-8844e347e621",
        owner_user_id: user.id, // Mocking owner_user_id to match current user
        name: "Moiz Dental Clinic Islamabad",
        email: null,
        created_at: "2025-11-30 06:35:42.929362+00"
      };
      setClinic(mockClinic);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('clinics')
        .select('*')
        .eq('owner_user_id', user.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching clinic:', fetchError);
        setError('Failed to load clinic data');
        setClinic(null);
      } else {
        setClinic(data as Clinic | null);
      }
    } catch (err) {
      console.error('Error in fetchClinic:', err);
      setError('An unexpected error occurred');
      setClinic(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchClinic();
    }
  }, [user, authLoading]);

  return (
    <ClinicContext.Provider value={{ clinic, loading: loading || authLoading, error, refetch: fetchClinic }}>
      {children}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  const context = useContext(ClinicContext);
  if (context === undefined) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
}
