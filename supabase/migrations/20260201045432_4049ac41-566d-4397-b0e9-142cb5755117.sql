-- Create clinics table
CREATE TABLE public.clinics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID,
  owner_user_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table with status and source as text
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID,
  clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  patient_name TEXT NOT NULL,
  patient_phone_masked TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'cancelled', 'completed', 'rescheduled')),
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('ai', 'manual')),
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- RLS policies for clinics: users can only access their own clinic
CREATE POLICY "Users can view their own clinic"
ON public.clinics
FOR SELECT
USING (auth.uid() = owner_user_id);

CREATE POLICY "Users can update their own clinic"
ON public.clinics
FOR UPDATE
USING (auth.uid() = owner_user_id);

-- RLS policies for appointments: users can only access appointments for their clinic
CREATE POLICY "Users can view appointments for their clinic"
ON public.appointments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.clinics 
    WHERE clinics.id = appointments.clinic_id 
    AND clinics.owner_user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert appointments for their clinic"
ON public.appointments
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.clinics 
    WHERE clinics.id = appointments.clinic_id 
    AND clinics.owner_user_id = auth.uid()
  )
);

CREATE POLICY "Users can update appointments for their clinic"
ON public.appointments
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.clinics 
    WHERE clinics.id = appointments.clinic_id 
    AND clinics.owner_user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete appointments for their clinic"
ON public.appointments
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.clinics 
    WHERE clinics.id = appointments.clinic_id 
    AND clinics.owner_user_id = auth.uid()
  )
);

-- Create indexes for better query performance
CREATE INDEX idx_clinics_owner_user_id ON public.clinics(owner_user_id);
CREATE INDEX idx_appointments_clinic_id ON public.appointments(clinic_id);
CREATE INDEX idx_appointments_start_time ON public.appointments(start_time);
CREATE INDEX idx_appointments_status ON public.appointments(status);

-- Enable realtime for appointments
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;