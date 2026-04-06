import { fetchWorkoutHistory, fetchActivityLogs } from "@/lib/cloud-data";
import { Flame, Target, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { getUserPreferences } from "@/lib/user-preferences";

export default function StatsBar() {
  const { user } = useAuth();
  const prefs = user ? getUserPreferences(user.id) : null;
  const weekGoal = prefs?.daysPerWeek ?? 4;

  const { data: history = [] } = useQuery({
    queryKey: ["workout-history", user?.id],
    queryFn: fetchWorkoutHistory,
    enabled: !!user,
  });

  const { data: activities = [] } = useQuery({
    queryKey: ["activity-logs", user?.id],
    queryFn: fetchActivityLogs,
    enabled: !!user,
  });

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - (now.getDay() || 7) + 1); // Starting Monday
  weekStart.setHours(0, 0, 0, 0);

  // This week: count unique days with workouts OR activities
  const weekDays = new Set<string>();
  history.forEach((w) => {
    const d = new Date(w.date);
    if (d >= weekStart) weekDays.add(d.toISOString().split("T")[0]);
  });
  activities.forEach((a) => {
    const d = new Date(a.date + "T00:00:00");
    if (d >= weekStart) weekDays.add(a.date);
  });
  const thisWeek = weekDays.size;

  // Streak: consecutive days with workouts or activities
  const allDates = new Set<string>();
  history.forEach((w) => allDates.add(w.date.split("T")[0]));
  activities.forEach((a) => allDates.add(a.date));

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split("T")[0];
    if (allDates.has(dateStr)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  const totalMinutes = history.reduce((s, w) => s + (w.duration || 0), 0)
    + activities.reduce((s, a) => s + (a.duration || 0), 0);

  const items = [
    {
      icon: Flame,
      value: streak,
      label: "Streak",
      color: streak > 0 ? "text-primary" : "text-muted-foreground",
    },
    {
      icon: Target,
      value: `${thisWeek}/${weekGoal}`,
      label: "This Week",
      color: thisWeek >= weekGoal ? "text-success" : "text-foreground",
    },
    {
      icon: Timer,
      value: `${totalMinutes}m`,
      label: "Total Time",
      color: "text-foreground",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="grid grid-cols-3 gap-2"
    >
      {items.map(({ icon: Icon, value, label, color }) => (
        <div key={label} className="glass-card rounded-xl px-3 py-3 text-center">
          <Icon className={`h-4 w-4 mx-auto mb-1 ${color}`} />
          <p className={`font-display text-lg font-bold ${color}`}>{value}</p>
          <p className="text-[10px] text-muted-foreground font-medium">{label}</p>
        </div>
      ))}
    </motion.div>
  );
}
