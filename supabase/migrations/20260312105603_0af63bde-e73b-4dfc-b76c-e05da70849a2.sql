
CREATE TABLE public.stretch_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);

ALTER TABLE public.stretch_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stretch completions"
  ON public.stretch_completions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stretch completions"
  ON public.stretch_completions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stretch completions"
  ON public.stretch_completions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
