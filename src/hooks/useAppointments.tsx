import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useClinic } from './useClinic';
import type { Appointment } from '@/types/database';

export function useAppointments() {
  const { clinic } = useClinic();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    if (!clinic?.id) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('appointments')
        .select('*')
        .eq('clinic_id', clinic.id)
        .order('start_time', { ascending: true });

      if (fetchError) {
        console.error('Error fetching appointments:', fetchError);
        setError('Failed to load appointments');
        setAppointments([]);
      } else {
        setAppointments((data as Appointment[]) || []);
      }
    } catch (err) {
      console.error('Error in fetchAppointments:', err);
      setError('An unexpected error occurred');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [clinic?.id]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Set up realtime subscription
  useEffect(() => {
    if (!clinic?.id) return;

    const channel = supabase
      .channel('appointments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments',
          filter: `clinic_id=eq.${clinic.id}`,
        },
        (payload) => {
          console.log('Realtime appointment change:', payload);
          
          if (payload.eventType === 'INSERT') {
            setAppointments(prev => [...prev, payload.new as Appointment].sort(
              (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
            ));
          } else if (payload.eventType === 'UPDATE') {
            setAppointments(prev => 
              prev.map(apt => apt.id === payload.new.id ? payload.new as Appointment : apt)
            );
          } else if (payload.eventType === 'DELETE') {
            setAppointments(prev => prev.filter(apt => apt.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [clinic?.id]);

  return { appointments, loading, error, refetch: fetchAppointments };
}
