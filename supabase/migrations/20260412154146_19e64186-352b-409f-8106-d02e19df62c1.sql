CREATE TABLE public.favourite_foods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  food_name TEXT NOT NULL,
  brand TEXT,
  serving_size TEXT,
  serving_qty NUMERIC NOT NULL DEFAULT 1,
  calories NUMERIC NOT NULL DEFAULT 0,
  protein_g NUMERIC NOT NULL DEFAULT 0,
  carbs_g NUMERIC NOT NULL DEFAULT 0,
  fat_g NUMERIC NOT NULL DEFAULT 0,
  barcode TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, food_name)
);

ALTER TABLE public.favourite_foods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favourites"
ON public.favourite_foods FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favourites"
ON public.favourite_foods FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favourites"
ON public.favourite_foods FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Coach can view all favourites"
ON public.favourite_foods FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'coach'::app_role));