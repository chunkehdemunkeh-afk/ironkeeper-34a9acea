import { WORKOUTS } from "@/lib/workout-data";
import { getAllCustomWorkouts } from "@/pages/WorkoutBuilder";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Plus, Shield, Zap, Wind, Crosshair } from "lucide-react";
import { motion } from "framer-motion";

export default function Sessions() {
  const navigate = useNavigate();
  const customWorkouts = getAllCustomWorkouts();
  const allWorkouts = [...WORKOUTS, ...customWorkouts];

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <div className="mx-auto max-w-lg px-4 pt-6 pb-8 space-y-5">
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-2xl font-bold"
          >
            All Sessions
          </motion.h1>
          <button
            onClick={() => navigate("/builder")}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1.5 hover:bg-primary/20 transition-colors active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" /> Create
          </button>
        </div>

        <div className="space-y-3">
          {allWorkouts.map((workout, i) => {
            const Icon = workout.icon;
            return (
              <motion.button
                key={workout.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => navigate(`/workout/${workout.id}`)}
                className={`w-full glass-card rounded-2xl p-4 text-left transition-all hover:ring-1 hover:ring-primary/30 active:scale-[0.98] bg-gradient-to-br ${workout.color}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/40">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {workout.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{workout.day}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {workout.exercises.length} exercises
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="mt-3 flex gap-1.5 flex-wrap">
                  {workout.exercises.map((ex) => (
                    <span
                      key={ex.id}
                      className="rounded-md bg-background/25 px-2 py-0.5 text-[10px] font-medium text-foreground/70"
                    >
                      {ex.name}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Programme info */}
        <div className="glass-card rounded-2xl p-5 space-y-4">
          <h2 className="font-display text-lg font-bold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            About This Programme
          </h2>
          {[
            { icon: Shield, title: "Goalkeeper-First", desc: "Every exercise directly improves diving, jumping, catching, and throwing — the core skills of a goalkeeper." },
            { icon: Zap, title: "Explosive Power", desc: "Box jumps, depth jumps, and plyometrics to develop the fast-twitch muscles needed for shot-stopping." },
            { icon: Wind, title: "Agility & Reaction", desc: "Lateral drills, T-drills, and reaction work to sharpen footwork and reflexes in the goal." },
            { icon: Crosshair, title: "Injury Prevention", desc: "Nordic curls, Copenhagen adductors, and dead bugs to bulletproof knees, groin, and core." },
          ].map((item) => {
            const ItemIcon = item.icon;
            return (
              <div key={item.title} className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <ItemIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
