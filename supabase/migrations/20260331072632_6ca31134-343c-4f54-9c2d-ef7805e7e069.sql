
-- 1. Block direct inserts into user_roles (only service role / triggers can assign roles)
CREATE POLICY "Deny direct role inserts"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "Deny direct role deletes"
ON public.user_roles
FOR DELETE
TO authenticated
USING (false);

-- 2. Tighten profiles policies from public to authenticated
ALTER POLICY "Users can insert their own profile" ON public.profiles TO authenticated;
ALTER POLICY "Users can update their own profile" ON public.profiles TO authenticated;
ALTER POLICY "Users can view their own profile" ON public.profiles TO authenticated;

-- 3. Tighten workout_history policies from public to authenticated
ALTER POLICY "Users can delete their own workouts" ON public.workout_history TO authenticated;
ALTER POLICY "Users can insert their own workouts" ON public.workout_history TO authenticated;
ALTER POLICY "Users can view their own workouts" ON public.workout_history TO authenticated;

-- 4. Tighten workout_sets policies from public to authenticated
ALTER POLICY "Users can delete their own sets" ON public.workout_sets TO authenticated;
ALTER POLICY "Users can insert their own sets" ON public.workout_sets TO authenticated;
ALTER POLICY "Users can view their own sets" ON public.workout_sets TO authenticated;
