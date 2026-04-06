import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, GripVertical, Save, Play, Dumbbell } from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { toast } from "sonner";
import { hapticMedium, hapticSuccess } from "@/lib/haptics";
import type { Exercise, WorkoutDay } from "@/lib/workout-data";

const MUSCLE_GROUPS = [
  "Explosive Power", "Lateral Speed", "Quads/Glutes", "Hamstrings",
  "Core Stability", "Grip Strength", "Shoulders", "Reactive Power",
  "Hip Power", "Agility", "Wrist Strength", "Adductors",
];

const COLORS = [
  "from-amber-500/20 to-orange-500/10",
  "from-cyan-500/20 to-blue-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-purple-500/20 to-fuchsia-500/10",
  "from-rose-500/20 to-pink-500/10",
  "from-lime-500/20 to-green-500/10",
];

const EMOJIS = ["🧤", "⚡", "🏃", "🦵", "💪", "🎯", "🛡️", "🔥"];

const STORAGE_KEY = "ironkeeper_custom_workouts";

function getCustomWorkouts(): WorkoutDay[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCustomWorkouts(workouts: WorkoutDay[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
}

export function getAllCustomWorkouts(): WorkoutDay[] {
  return getCustomWorkouts();
}

export default function WorkoutBuilder() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🧤");
  const [focus, setFocus] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<WorkoutDay[]>([]);

  useEffect(() => {
    setSavedWorkouts(getCustomWorkouts());
  }, []);

  const addExercise = () => {
    hapticMedium();
    setExercises((prev) => [
      ...prev,
      {
        id: `custom-${crypto.randomUUID().slice(0, 8)}`,
        name: "",
        sets: 3,
        reps: "10",
        notes: "",
        targetMuscle: MUSCLE_GROUPS[0],
      },
    ]);
  };

  const updateExercise = (id: string, field: keyof Exercise, value: string | number) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const removeExercise = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const saveWorkout = () => {
    if (!name.trim()) {
      toast.error("Give your workout a name");
      return;
    }
    if (exercises.length === 0) {
      toast.error("Add at least one exercise");
      return;
    }
    if (exercises.some((ex) => !ex.name.trim())) {
      toast.error("Fill in all exercise names");
      return;
    }

    const workout: WorkoutDay = {
      id: `custom-${crypto.randomUUID().slice(0, 8)}`,
      name: name.trim(),
      icon: Dumbbell,
      day: "Custom",
      focus: focus.trim() || "Custom Workout",
      exercises,
      color,
    };

    const existing = getCustomWorkouts();
    existing.push(workout);
    saveCustomWorkouts(existing);
    setSavedWorkouts(existing);

    hapticSuccess();
    toast.success("Workout saved! 💪");

    // Reset
    setName("");
    setFocus("");
    setExercises([]);
  };

  const deleteCustomWorkout = (id: string) => {
    const existing = getCustomWorkouts().filter((w) => w.id !== id);
    saveCustomWorkouts(existing);
    setSavedWorkouts(existing);
    toast("Workout deleted");
  };

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <div className="mx-auto max-w-lg px-4 pt-6 pb-8 space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-2xl font-bold">Workout Builder</h1>
        </div>

        {/* Builder form */}
        <div className="glass-card-elevated rounded-2xl p-5 space-y-4">
          <div className="flex gap-3">
            {/* Emoji picker */}
            <div className="flex flex-wrap gap-1.5 max-w-[120px]">
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`h-9 w-9 rounded-lg text-lg flex items-center justify-center transition-all ${
                    emoji === e
                      ? "bg-primary/20 ring-1 ring-primary/50"
                      : "bg-muted/50"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>

            <div className="flex-1 space-y-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Workout Name"
                className="w-full h-10 rounded-lg bg-muted/50 border border-border/50 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 font-display font-semibold"
              />
              <input
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                placeholder="Focus area (e.g., Diving Power)"
                className="w-full h-9 rounded-lg bg-muted/50 border border-border/50 px-3 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Color picker */}
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`h-6 flex-1 rounded-md bg-gradient-to-br ${c} transition-all ${
                  color === c ? "ring-2 ring-primary/60" : "ring-1 ring-border/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Exercises */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Exercises</h2>
            <button
              onClick={addExercise}
              className="flex items-center gap-1 text-xs font-medium text-primary"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>

          <AnimatePresence>
            {exercises.map((ex, i) => (
              <motion.div
                key={ex.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-card rounded-xl p-3 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground/40" />
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <input
                    value={ex.name}
                    onChange={(e) => updateExercise(ex.id, "name", e.target.value)}
                    placeholder="Exercise name"
                    className="flex-1 h-8 rounded-lg bg-muted/50 border border-border/50 px-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <button
                    onClick={() => removeExercise(ex.id)}
                    className="text-destructive/70 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 pl-8">
                  <div>
                    <label className="text-[10px] text-muted-foreground uppercase">Sets</label>
                    <input
                      type="number"
                      value={ex.sets}
                      onChange={(e) => updateExercise(ex.id, "sets", Number(e.target.value))}
                      className="w-full h-7 rounded-md bg-muted/50 border border-border/50 px-2 text-xs text-center text-foreground outline-none focus:ring-1 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground uppercase">Reps</label>
                    <input
                      value={ex.reps}
                      onChange={(e) => updateExercise(ex.id, "reps", e.target.value)}
                      className="w-full h-7 rounded-md bg-muted/50 border border-border/50 px-2 text-xs text-center text-foreground outline-none focus:ring-1 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground uppercase">Target</label>
                    <select
                      value={ex.targetMuscle}
                      onChange={(e) => updateExercise(ex.id, "targetMuscle", e.target.value)}
                      className="w-full h-7 rounded-md bg-muted/50 border border-border/50 px-1 text-[10px] text-foreground outline-none"
                    >
                      {MUSCLE_GROUPS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <input
                  value={ex.notes || ""}
                  onChange={(e) => updateExercise(ex.id, "notes", e.target.value)}
                  placeholder="Notes (optional)"
                  className="w-full h-7 rounded-md bg-muted/50 border border-border/50 px-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 ml-8"
                  style={{ width: "calc(100% - 2rem)" }}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {exercises.length === 0 && (
            <button
              onClick={addExercise}
              className="w-full glass-card rounded-xl p-8 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Plus className="h-8 w-8" />
              <span className="text-sm font-medium">Add your first exercise</span>
            </button>
          )}
        </div>

        {/* Save button */}
        {exercises.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={saveWorkout}
            className="w-full rounded-xl gradient-primary py-4 text-base font-bold text-primary-foreground glow-primary flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Save className="h-5 w-5" /> Save Workout
          </motion.button>
        )}

        {/* Saved custom workouts */}
        {savedWorkouts.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-display text-base font-semibold mt-6">Your Custom Workouts</h2>
            {savedWorkouts.map((w) => (
              <div
                key={w.id}
                className={`glass-card rounded-xl p-4 bg-gradient-to-br ${w.color}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      {w.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {w.exercises.length} exercises · {w.focus}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/workout/${w.id}`)}
                      className="h-8 w-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center"
                    >
                      <Play className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCustomWorkout(w.id)}
                      className="h-8 w-8 rounded-lg bg-destructive/20 text-destructive flex items-center justify-center"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
