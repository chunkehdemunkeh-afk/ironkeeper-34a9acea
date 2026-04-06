export type Stretch = {
  id: string;
  name: string;
  holdTime: string;       // e.g. "30s each side"
  sets: number;
  targetArea: string;
  notes: string;
  videoUrl: string;
};

export const DAILY_STRETCHES: Stretch[] = [
  {
    id: "str1",
    name: "Hip Flexor Lunge Stretch",
    holdTime: "30s each side",
    sets: 2,
    targetArea: "Hip Flexors",
    notes: "Rear knee down, squeeze glute, push hips forward — essential for diving range",
    videoUrl: "https://www.youtube.com/shorts/-D1HDRNXkoc",
  },
  {
    id: "str2",
    name: "Standing Hamstring Stretch",
    holdTime: "30s each side",
    sets: 2,
    targetArea: "Hamstrings",
    notes: "Straight leg on raised surface, hinge at hips, keep back flat",
    videoUrl: "https://www.youtube.com/shorts/vC_MRFVreq8",
  },
  {
    id: "str3",
    name: "Standing Quad Stretch",
    holdTime: "30s each side",
    sets: 2,
    targetArea: "Quadriceps",
    notes: "Pull heel to glute, keep knees together, squeeze glute for deeper stretch",
    videoUrl: "https://www.youtube.com/shorts/AgaPoGEYTZ4",
  },
  {
    id: "str4",
    name: "Pigeon Stretch",
    holdTime: "45s each side",
    sets: 2,
    targetArea: "Hips / Glutes",
    notes: "Key for goalkeeper hip mobility — front shin parallel, fold forward slowly",
    videoUrl: "https://www.youtube.com/shorts/sjSJcXS9tXA",
  },
  {
    id: "str5",
    name: "Cross-Body Shoulder Stretch",
    holdTime: "30s each side",
    sets: 2,
    targetArea: "Shoulders",
    notes: "Pull arm across chest, keep shoulder down — maintains throwing & catching range",
    videoUrl: "https://www.youtube.com/shorts/aIq0fLi8iak",
  },
  {
    id: "str6",
    name: "Cat-Cow",
    holdTime: "10 reps",
    sets: 2,
    targetArea: "Spine / Core",
    notes: "Slow controlled breathing, full arch and round — great for spinal recovery after diving",
    videoUrl: "https://www.youtube.com/shorts/WHUevrqeKIg",
  },
  {
    id: "str7",
    name: "Wrist Flexor & Extensor Stretch",
    holdTime: "20s each direction",
    sets: 2,
    targetArea: "Wrists / Forearms",
    notes: "Arm straight, pull fingers back then down — protects wrists from shot-stopping impact",
    videoUrl: "https://www.youtube.com/shorts/rhMlBSWMdEI",
  },
  {
    id: "str8",
    name: "Butterfly Groin Stretch",
    holdTime: "45s",
    sets: 2,
    targetArea: "Groin / Adductors",
    notes: "Soles together, gently press knees down with elbows — injury prevention for splits saves",
    videoUrl: "https://www.youtube.com/shorts/dF2olILOtjM",
  },
];

export function getTotalStretchTime(): string {
  // Rough estimate: ~10 minutes
  return "~10 min";
}
