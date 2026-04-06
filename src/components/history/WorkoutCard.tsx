import { useState } from "react";
import { WORKOUTS, type CompletedWorkout } from "@/lib/workout-data";
import { Clock, Trash2, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface WorkoutCardProps {
  workout: CompletedWorkout;
  icon: LucideIcon;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export default function WorkoutCard({ workout: w, icon: Icon, onDelete, isDeleting }: WorkoutCardProps) {
  const [expanded, setExpanded] = useState(false);

  const allExercises = WORKOUTS.flatMap((wk) => wk.exercises);
  const getExerciseMeta = (id: string) => allExercises.find((e) => e.id === id);

  // Group sets by exercise
  const groupedSets = Object.entries(
    w.sets.reduce<Record<string, { exerciseId: string; reps: number; weight: number }[]>>((acc, s) => {
      const ex = getExerciseMeta(s.exerciseId);
      const name = ex?.name || s.exerciseId;
      if (!acc[name]) acc[name] = [];
      acc[name].push(s);
      return acc;
    }, {})
  );

  const formatSet = (s: { exerciseId: string; reps: number; weight: number }) => {
    const ex = getExerciseMeta(s.exerciseId);
    const isTimeBased = ex?.repLabel === "Sec";
    if (isTimeBased) return `${s.reps}s`;
    const showWeight = ex?.trackWeight !== false;
    if (showWeight && s.weight > 0) return `${s.weight}kg × ${s.reps}`;
    return `${s.reps} ${(ex?.repLabel || "reps").toLowerCase()}`;
  };

  return (
    <motion.div
      layout
      className={`glass-card rounded-2xl overflow-hidden transition-all ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 p-4 cursor-pointer"
        onClick={() => w.sets.length > 0 && setExpanded(!expanded)}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{w.workoutName}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {w.duration}m
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span>{w.exercisesCompleted}/{w.totalExercises} exercises</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {w.sets.length > 0 && (
            <div className="p-1.5 rounded-lg text-muted-foreground">
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          )}
        </div>
      </div>

      {/* Expanded sets */}
      <AnimatePresence>
        {expanded && groupedSets.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-2">
              <div className="h-px bg-border/50" />
              {groupedSets.map(([name, sets]) => (
                <div key={name} className="flex items-start justify-between gap-3 py-1">
                  <span className="text-xs text-muted-foreground flex-shrink-0 pt-0.5">{name}</span>
                  <div className="flex flex-wrap justify-end gap-1">
                    {sets.map((s, si) => (
                      <span
                        key={si}
                        className="text-[11px] font-medium text-foreground bg-muted/50 rounded-md px-1.5 py-0.5"
                      >
                        {formatSet(s)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Delete button */}
              <div className="h-px bg-border/50 mt-1" />
              <div className="flex justify-end pt-1">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors px-2 py-1 rounded-lg hover:bg-destructive/10">
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-sm rounded-2xl">
                    <AlertDialogHeader>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 mb-1">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>
                      <AlertDialogTitle>Delete workout session?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your <span className="font-medium text-foreground">{w.workoutName}</span> session and all its set data. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(w.id)}
                        className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
