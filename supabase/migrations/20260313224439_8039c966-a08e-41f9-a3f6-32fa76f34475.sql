
-- Coach can read ALL stretch_completions
CREATE POLICY "Coach can view all stretch completions"
  ON public.stretch_completions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'coach'));

-- Add last_seen column to profiles for login tracking
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ DEFAULT NULL;
