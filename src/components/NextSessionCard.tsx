import { WORKOUTS } from "@/lib/workout-data";
import { getAllCustomWorkouts } from "@/pages/WorkoutBuilder";
import { useNavigate } from "react-router-dom";
import { Play, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function NextSessionCard() {
  const navigate = useNavigate();
  const allWorkouts = [...WORKOUTS, ...getAllCustomWorkouts()];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        Choose Your Session
      </p>
      <div className="space-y-2.5">
        {allWorkouts.map((workout, i) => {
          const Icon = workout.icon;
          return (
            <motion.button
              key={workout.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              onClick={() => navigate(`/workout/${workout.id}`)}
              className={`w-full glass-card-elevated rounded-2xl overflow-hidden text-left transition-all hover:ring-1 hover:ring-primary/30 active:scale-[0.98]`}
            >
              <div className={`bg-gradient-to-br ${workout.color} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base font-bold text-foreground">
                      {workout.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">{workout.focus}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{workout.exercises.length} ex</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                      <Play className="h-3.5 w-3.5 fill-current text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
