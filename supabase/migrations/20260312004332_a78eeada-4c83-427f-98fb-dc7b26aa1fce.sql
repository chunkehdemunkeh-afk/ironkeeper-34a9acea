CREATE TABLE public.body_measurements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  date timestamp with time zone NOT NULL DEFAULT now(),
  body_weight numeric,
  body_fat_pct numeric,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.body_measurements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own measurements"
ON public.body_measurements
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own measurements"
ON public.body_measurements
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own measurements"
ON public.body_measurements
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own measurements"
ON public.body_measurements
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);