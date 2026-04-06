
CREATE TABLE public.activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  activity_type TEXT NOT NULL DEFAULT 'rest',
  label TEXT,
  duration INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own activity logs"
  ON public.activity_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity logs"
  ON public.activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activity logs"
  ON public.activity_logs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Coach can view all activity logs"
  ON public.activity_logs FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'coach'::app_role));
