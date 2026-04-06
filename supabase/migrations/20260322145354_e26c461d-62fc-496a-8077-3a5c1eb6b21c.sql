ALTER TABLE public.workout_history 
ADD COLUMN effort_rating integer DEFAULT NULL,
ADD COLUMN session_notes text DEFAULT NULL;