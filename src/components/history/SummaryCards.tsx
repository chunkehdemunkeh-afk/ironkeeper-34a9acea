import { Calendar as CalendarIcon, Clock, Dumbbell, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface SummaryCardsProps {
  totalWorkouts: number;
  totalMinutes: number;
  thisWeek: number;
  avgPerWeek: string;
}

export default function SummaryCards({ totalWorkouts, totalMinutes, thisWeek, avgPerWeek }: SummaryCardsProps) {
  const items = [
    { icon: Dumbbell, label: "Total Workouts", value: totalWorkouts, color: "text-primary" },
    { icon: Clock, label: "Total Time", value: `${totalMinutes}m`, color: "text-foreground" },
    { icon: CalendarIcon, label: "This Week", value: `${thisWeek}/4`, color: "text-success" },
    { icon: TrendingUp, label: "Avg/Week", value: avgPerWeek, color: "text-foreground" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map(({ icon: Icon, label, value, color }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass-card rounded-xl p-3"
        >
          <Icon className={`h-4 w-4 ${color} mb-1`} />
          <p className={`font-display text-xl font-bold ${color}`}>{value}</p>
          <p className="text-[10px] text-muted-foreground font-medium">{label}</p>
        </motion.div>
      ))}
    </div>
  );
}
