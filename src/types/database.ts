export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
export type AppointmentSource = 'ai' | 'manual';

export interface Clinic {
  id: string;
  organization_id: string | null;
  owner_user_id: string;
  name: string;
  email: string | null;
  timezone: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  organization_id: string | null;
  clinic_id: string;
  patient_name: string;
  patient_phone_masked: string | null;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  source: AppointmentSource;
  reason: string | null;
  created_at: string;
}
