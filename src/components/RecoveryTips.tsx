import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const GK_TIPS = [
  "Get 8-9 hours of sleep — growth hormone peaks during deep sleep.",
  "Stay hydrated — aim for 2-3 litres daily, more on training days.",
  "Eat enough protein — 1.4-1.6g per kg of bodyweight.",
  "Stretch on rest days — focus on hip flexors, hamstrings, and shoulders.",
  "Grip work — squeeze a tennis ball daily for wrist and finger strength.",
];

const GENERAL_TIPS = [
  "Get 7-9 hours of sleep — crucial for muscle repair and growth hormone release.",
  "Stay hydrated — aim for 2-3 litres daily, more on training days.",
  "Eat enough protein — 1.6-2.2g per kg of bodyweight for muscle building.",
  "Prioritise rest days — muscles grow during recovery, not during the session.",
  "Track progressive overload — add small weight or reps each week to keep progressing.",
];

type Props = {
  isGK?: boolean;
};

export default function RecoveryTips({ isGK = false }: Props) {
  const tips = isGK ? GK_TIPS : GENERAL_TIPS;
  const title = isGK ? "GK Recovery Tips" : "Training Tips";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card rounded-2xl p-4"
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/15">
          <Heart className="h-4.5 w-4.5 text-destructive" />
        </div>
        <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
      </div>
      <div className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
        {tips.map((tip, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
            <p>{tip}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
