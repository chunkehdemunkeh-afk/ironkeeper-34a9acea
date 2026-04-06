
-- Coach notifications table
CREATE TABLE public.coach_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  exercise_name TEXT NOT NULL,
  previous_weight NUMERIC NOT NULL DEFAULT 0,
  new_weight NUMERIC NOT NULL,
  reps INTEGER NOT NULL DEFAULT 0,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.coach_notifications ENABLE ROW LEVEL SECURITY;

-- Only coach can read notifications
CREATE POLICY "Coach can view all notifications"
  ON public.coach_notifications FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'coach'));

CREATE POLICY "Coach can update notifications"
  ON public.coach_notifications FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'coach'));

-- System insert policy (for trigger using security definer)
CREATE POLICY "System can insert notifications"
  ON public.coach_notifications FOR INSERT
  TO authenticated
  WITH CHECK (false);

-- Trigger function: detect PB on workout_sets insert
CREATE OR REPLACE FUNCTION public.check_personal_best()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  prev_max NUMERIC;
BEGIN
  -- Get previous max weight for this user + exercise
  SELECT MAX(weight) INTO prev_max
  FROM public.workout_sets
  WHERE user_id = NEW.user_id
    AND exercise_id = NEW.exercise_id
    AND id != NEW.id;

  -- If new weight exceeds previous max (or first time with weight > 0), create notification
  IF NEW.weight > 0 AND (prev_max IS NULL OR NEW.weight > prev_max) THEN
    INSERT INTO public.coach_notifications (user_id, exercise_name, previous_weight, new_weight, reps)
    VALUES (NEW.user_id, NEW.exercise_name, COALESCE(prev_max, 0), NEW.weight, NEW.reps);
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_workout_set_check_pb
  AFTER INSERT ON public.workout_sets
  FOR EACH ROW EXECUTE FUNCTION public.check_personal_best();
