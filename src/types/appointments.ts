export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
export type AppointmentSource = 'ai' | 'manual';

export interface Appointment {
  id: string;
  patientName: string;
  appointmentTime: Date;
  reason: string;
  status: AppointmentStatus;
  source: AppointmentSource;
}
