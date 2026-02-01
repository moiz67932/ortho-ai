import { Appointment } from '@/types/appointments';

const today = new Date();
const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    appointmentTime: new Date(startOfDay.getTime() + 9 * 60 * 60 * 1000),
    reason: 'Regular Checkup',
    status: 'completed',
    source: 'ai',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    appointmentTime: new Date(startOfDay.getTime() + 10 * 60 * 60 * 1000),
    reason: 'Teeth Cleaning',
    status: 'scheduled',
    source: 'manual',
  },
  {
    id: '3',
    patientName: 'Emily Rodriguez',
    appointmentTime: new Date(startOfDay.getTime() + 11 * 60 * 60 * 1000),
    reason: 'Cavity Filling',
    status: 'scheduled',
    source: 'ai',
  },
  {
    id: '4',
    patientName: 'David Kim',
    appointmentTime: new Date(startOfDay.getTime() + 14 * 60 * 60 * 1000),
    reason: 'Root Canal',
    status: 'cancelled',
    source: 'manual',
  },
  {
    id: '5',
    patientName: 'Lisa Thompson',
    appointmentTime: new Date(startOfDay.getTime() + 15 * 60 * 60 * 1000),
    reason: 'Dental X-Ray',
    status: 'scheduled',
    source: 'ai',
  },
  {
    id: '6',
    patientName: 'James Wilson',
    appointmentTime: new Date(startOfDay.getTime() + 16 * 60 * 60 * 1000),
    reason: 'Consultation',
    status: 'rescheduled',
    source: 'ai',
  },
  // Tomorrow's appointments
  {
    id: '7',
    patientName: 'Anna Martinez',
    appointmentTime: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000),
    reason: 'Teeth Whitening',
    status: 'scheduled',
    source: 'ai',
  },
  {
    id: '8',
    patientName: 'Robert Brown',
    appointmentTime: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000),
    reason: 'Crown Fitting',
    status: 'scheduled',
    source: 'manual',
  },
  // More appointments for calendar
  {
    id: '9',
    patientName: 'Jessica Lee',
    appointmentTime: new Date(startOfDay.getTime() + 48 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000),
    reason: 'Regular Checkup',
    status: 'scheduled',
    source: 'ai',
  },
  {
    id: '10',
    patientName: 'Thomas Anderson',
    appointmentTime: new Date(startOfDay.getTime() + 72 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
    reason: 'Extraction',
    status: 'scheduled',
    source: 'manual',
  },
  {
    id: '11',
    patientName: 'Sophie White',
    appointmentTime: new Date(startOfDay.getTime() + 96 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000),
    reason: 'Dental Implant Consultation',
    status: 'scheduled',
    source: 'ai',
  },
  {
    id: '12',
    patientName: 'Daniel Garcia',
    appointmentTime: new Date(startOfDay.getTime() + 120 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000),
    reason: 'Orthodontic Consultation',
    status: 'scheduled',
    source: 'ai',
  },
];
