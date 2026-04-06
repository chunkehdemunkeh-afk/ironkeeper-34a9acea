
-- Assign coach role to existing user jacart1988@gmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'coach'::app_role FROM auth.users WHERE email = 'jacart1988@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Coach can read ALL workout_history
CREATE POLICY "Coach can view all workouts"
  ON public.workout_history FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'coach'));

-- Coach can read ALL workout_sets
CREATE POLICY "Coach can view all sets"
  ON public.workout_sets FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'coach'));

-- Coach can read ALL profiles
CREATE POLICY "Coach can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'coach'));
