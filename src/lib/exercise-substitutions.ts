/**
 * Exercise substitution map.
 * Each key is an exercise ID from workout-data.ts.
 * Values are arrays of substitute exercises (at least 2 per exercise).
 * Substitutes hit the same muscle groups and use similar equipment.
 */

import type { Exercise } from "./workout-data";

export type SubstituteExercise = Omit<Exercise, "sets" | "reps"> & {
  description: string;
};

// Substitutes inherit the sets/reps of the exercise they replace.
export const EXERCISE_SUBSTITUTIONS: Record<string, SubstituteExercise[]> = {
  // ── Explosive Power ──
  pw1: [ // Box Jumps
    { id: "sub-pw1a", name: "Squat Jumps", targetMuscle: "Explosive Power", notes: "Full squat then jump max height, soft landing", trackWeight: false, repLabel: "Reps", description: "Bodyweight squat to max height jump" },
    { id: "sub-pw1b", name: "Tuck Jumps", targetMuscle: "Explosive Power", notes: "Jump high, tuck knees to chest at peak", trackWeight: false, repLabel: "Reps", description: "Jump and tuck knees to chest" },
  ],
  pw2: [ // Depth Jumps
    { id: "sub-pw2a", name: "Drop Jumps", targetMuscle: "Reactive Power", notes: "Step off lower box, immediately rebound max height", trackWeight: false, repLabel: "Reps", description: "Lower box reactive jump variation" },
    { id: "sub-pw2b", name: "Hurdle Hops", targetMuscle: "Reactive Power", notes: "Consecutive hops over low hurdles, minimise ground contact", trackWeight: false, repLabel: "Reps", description: "Consecutive plyometric hurdle hops" },
  ],
  pw3: [ // Med Ball Slam
    { id: "sub-pw3a", name: "Med Ball Overhead Throw", targetMuscle: "Core Power", notes: "Throw ball overhead backwards for distance", description: "Explosive overhead backward throw" },
    { id: "sub-pw3b", name: "Battle Rope Slams", targetMuscle: "Core Power", notes: "Alternating or double arm slams, max intensity", trackWeight: false, repLabel: "Reps", description: "High-intensity rope slams" },
  ],
  pw4: [ // Single-Leg Broad Jump
    { id: "sub-pw4a", name: "Single-Leg Box Jump", targetMuscle: "Unilateral Power", notes: "Jump onto box from one leg, step down", trackWeight: false, repLabel: "Reps", description: "Single-leg explosive box jump" },
    { id: "sub-pw4b", name: "Bounding", targetMuscle: "Unilateral Power", notes: "Exaggerated running leaps, max distance per stride", trackWeight: false, repLabel: "Reps", description: "Alternating exaggerated leaps for distance" },
  ],
  pw7: [ // Lateral Bounds
    { id: "sub-pw7a", name: "Skater Jumps", targetMuscle: "Lateral Power", notes: "Side-to-side jumps, reach across with opposite hand", trackWeight: false, repLabel: "Reps", description: "Dynamic lateral skater-style jumps" },
    { id: "sub-pw7b", name: "Lateral Hurdle Hops", targetMuscle: "Lateral Power", notes: "Hop sideways over low hurdle, stick landing", trackWeight: false, repLabel: "Reps", description: "Lateral plyometric hurdle hops" },
  ],
  pw5: [ // Kettlebell Swing
    { id: "sub-pw5a", name: "Dumbbell Swing", targetMuscle: "Hip Power", notes: "Same hip-hinge pattern as KB swing, use single dumbbell", description: "Dumbbell hip-snap swing" },
    { id: "sub-pw5b", name: "Kettlebell Clean", targetMuscle: "Hip Power", notes: "Explosive hip drive, catch at rack position", description: "Explosive kettlebell clean" },
  ],
  pw6: [ // Plyo Push-Up
    { id: "sub-pw6a", name: "Clap Push-Up", targetMuscle: "Upper Body Reactive", notes: "Explosive push, clap hands, land soft", trackWeight: false, repLabel: "Reps", description: "Explosive clapping push-up" },
    { id: "sub-pw6b", name: "Med Ball Push-Up", targetMuscle: "Upper Body Reactive", notes: "Hands on med ball, alternate hands each rep", trackWeight: false, repLabel: "Reps", description: "Push-up with hands on medicine ball" },
  ],

  // ── Agility ──
  ag1: [ // Lateral Shuffle
    { id: "sub-ag1a", name: "Defensive Slide", targetMuscle: "Lateral Speed", notes: "Low athletic stance, stay in quarter squat", trackWeight: false, repLabel: "Sec", description: "Basketball-style defensive slide drill" },
    { id: "sub-ag1b", name: "Lateral Band Walk", targetMuscle: "Lateral Speed", notes: "Mini band above knees, stay low, constant tension", trackWeight: false, repLabel: "Sec", description: "Resistance band lateral walk" },
  ],
  ag2: [ // T-Drill
    { id: "sub-ag2a", name: "5-10-5 Pro Agility", targetMuscle: "Change of Direction", notes: "Sprint 5yd, turn, 10yd, turn, 5yd", trackWeight: false, repLabel: "Sec", description: "Pro agility shuttle drill" },
    { id: "sub-ag2b", name: "L-Drill", targetMuscle: "Change of Direction", notes: "Sprint, change direction in L-shape pattern", trackWeight: false, repLabel: "Sec", description: "L-shaped change of direction drill" },
  ],
  ag3: [ // Ladder Drills
    { id: "sub-ag3a", name: "Quick Feet Taps", targetMuscle: "Foot Speed", notes: "Rapid alternating toe taps on step or ball", trackWeight: false, repLabel: "Rounds", description: "Rapid foot taps on low platform" },
    { id: "sub-ag3b", name: "Dot Drill", targetMuscle: "Foot Speed", notes: "Jump between dots in specific pattern, max speed", trackWeight: false, repLabel: "Rounds", description: "5-dot pattern foot speed drill" },
  ],
  ag4: [ // Lateral Bound
    { id: "sub-ag4a", name: "Skater Jumps", targetMuscle: "Lateral Power", notes: "Side-to-side jumps, reach across with opposite hand", trackWeight: false, repLabel: "Reps", description: "Dynamic lateral skater-style jumps" },
    { id: "sub-ag4b", name: "Single-Leg Lateral Hop", targetMuscle: "Lateral Power", notes: "Hop sideways on one leg, stick each landing 1s", trackWeight: false, repLabel: "Reps", description: "Single-leg sideways hops" },
  ],
  ag5: [ // Reactive Ball Drop
    { id: "sub-ag5a", name: "Reaction Light Drill", targetMuscle: "Reaction Time", notes: "React to visual cue, tap light as fast as possible", trackWeight: false, repLabel: "Reps", description: "Visual stimulus reaction drill" },
    { id: "sub-ag5b", name: "Mirror Drill", targetMuscle: "Reaction Time", notes: "Partner leads, you mirror their movements", trackWeight: false, repLabel: "Reps", description: "Partner mirror reaction drill" },
  ],
  ag6: [ // Carioca
    { id: "sub-ag6a", name: "Side Shuffle with Cross-Over", targetMuscle: "Hip Mobility", notes: "Shuffle with high-knee crossover step every 3rd step", trackWeight: false, repLabel: "Metres", description: "Shuffle with crossover step" },
    { id: "sub-ag6b", name: "Hip Circle Walk", targetMuscle: "Hip Mobility", notes: "Walk forward, circle each leg outward with each step", trackWeight: false, repLabel: "Metres", description: "Walking hip circles for mobility" },
  ],

  // ── GK Strength ──
  st1: [ // Goblet Squat
    { id: "sub-st1a", name: "Dumbbell Front Squat", targetMuscle: "Quads/Glutes", notes: "Dumbbells on shoulders, squat deep", description: "Front-loaded dumbbell squat" },
    { id: "sub-st1b", name: "Kettlebell Goblet Squat", targetMuscle: "Quads/Glutes", notes: "Kettlebell at chest, sit deep into squat", description: "Kettlebell goblet squat variation" },
  ],
  st2: [ // Romanian Deadlift (DB)
    { id: "sub-st2a", name: "Single-Leg Dumbbell RDL", targetMuscle: "Hamstrings", notes: "One leg, hinge forward, slow 3s negative", description: "Unilateral dumbbell Romanian deadlift" },
    { id: "sub-st2b", name: "Dumbbell Stiff-Leg Deadlift", targetMuscle: "Hamstrings", notes: "Legs straighter than RDL, deep stretch", description: "Stiff-leg deadlift with dumbbells" },
  ],
  st3: [ // Bulgarian Split Squat
    { id: "sub-st3a", name: "Reverse Lunge (DB)", targetMuscle: "Single-Leg Strength", notes: "Step back into lunge, drive through front heel", description: "Dumbbell reverse lunge" },
    { id: "sub-st3b", name: "Step-Up (DB)", targetMuscle: "Single-Leg Strength", notes: "Step onto bench, drive up, control descent", description: "Dumbbell step-up on bench" },
  ],
  st4: [ // Nordic Hamstring Curl
    { id: "sub-st4a", name: "Slider Leg Curl", targetMuscle: "Hamstring Resilience", notes: "Lie on back, curl heels in on sliders", trackWeight: false, repLabel: "Reps", description: "Supine hamstring slider curl" },
    { id: "sub-st4b", name: "Swiss Ball Hamstring Curl", targetMuscle: "Hamstring Resilience", notes: "Feet on ball, hips up, curl ball toward glutes", trackWeight: false, repLabel: "Reps", description: "Stability ball hamstring curl" },
  ],
  st5: [ // Copenhagen Adductor
    { id: "sub-st5a", name: "Side-Lying Adductor Raise", targetMuscle: "Groin/Adductors", notes: "Lie on side, raise bottom leg, squeeze adductors", trackWeight: false, repLabel: "Reps", description: "Side-lying bottom leg raise" },
    { id: "sub-st5b", name: "Cable Hip Adduction", targetMuscle: "Groin/Adductors", notes: "Ankle strap, pull leg inward across body", description: "Cable adductor pull" },
  ],
  st6: [ // Dead Bug
    { id: "sub-st6a", name: "Bird Dog", targetMuscle: "Core Stability", notes: "Opposite arm/leg extension, keep hips level", trackWeight: false, repLabel: "Reps", description: "Quadruped opposite limb extension" },
    { id: "sub-st6b", name: "Pallof Press", targetMuscle: "Core Stability", notes: "Anti-rotation cable press, hold 2s extended", description: "Cable anti-rotation press" },
  ],

  // ── Reflexes & Upper Body ──
  rf1: [ // Med Ball Chest Pass
    { id: "sub-rf1a", name: "Med Ball Rotational Throw", targetMuscle: "Throwing Power", notes: "Side-on to wall, rotate and throw at chest height", description: "Rotational medicine ball wall throw" },
    { id: "sub-rf1b", name: "Med Ball Push Pass", targetMuscle: "Throwing Power", notes: "Kneeling chest pass, explosive from chest", description: "Kneeling explosive chest pass" },
  ],
  rf2: [ // Face Pulls
    { id: "sub-rf2a", name: "Band Pull-Apart", targetMuscle: "Rear Delts/Posture", notes: "Pull band apart at chest height, squeeze shoulder blades", trackWeight: false, repLabel: "Reps", description: "Resistance band horizontal pull-apart" },
    { id: "sub-rf2b", name: "Prone Y-Raise", targetMuscle: "Rear Delts/Posture", notes: "Lie face down on incline bench, raise arms in Y shape", description: "Incline bench prone Y-raise" },
  ],
  rf3: [ // Farmer's Walk
    { id: "sub-rf3a", name: "Dead Hang", targetMuscle: "Grip Strength", notes: "Hang from pull-up bar, max time, squeeze hard", repLabel: "Sec", description: "Pull-up bar dead hang for grip" },
    { id: "sub-rf3b", name: "Plate Pinch Walk", targetMuscle: "Grip Strength", notes: "Pinch two plates together, walk for distance", repLabel: "Metres", description: "Walk while pinching weight plates" },
  ],
  rf4: [ // Wrist Curls (DB)
    { id: "sub-rf4a", name: "Reverse Wrist Curls (DB)", targetMuscle: "Wrist Strength", notes: "Palms down, curl wrists up for extensors", description: "Dumbbell reverse wrist curl" },
    { id: "sub-rf4b", name: "Wrist Roller", targetMuscle: "Wrist Strength", notes: "Roll weight up and down with wrist rotation", description: "Wrist roller for forearm strength" },
  ],
  rf5: [ // Overhead DB Press
    { id: "sub-rf5a", name: "Arnold Press", targetMuscle: "Shoulders", notes: "Rotating press — palms in to palms out at top", description: "Rotating dumbbell shoulder press" },
    { id: "sub-rf5b", name: "Seated Dumbbell Press", targetMuscle: "Shoulders", notes: "Seated, press dumbbells to full lockout", description: "Seated overhead dumbbell press" },
  ],
  rf6: [ // Plank Shoulder Taps
    { id: "sub-rf6a", name: "Renegade Row", targetMuscle: "Core/Stability", notes: "Plank position, row dumbbell each side, resist rotation", description: "Plank with alternating dumbbell rows" },
    { id: "sub-rf6b", name: "Bear Crawl", targetMuscle: "Core/Stability", notes: "Crawl forward/backward, knees 1 inch off ground", trackWeight: false, repLabel: "Reps", description: "Low bear crawl for core stability" },
  ],

  // ── Push ──
  pu1: [ // 45° Incline DB Bench Press
    { id: "sub-pu1a", name: "Incline Barbell Bench Press", targetMuscle: "Upper Chest", notes: "45° incline, barbell variation", description: "Barbell press at 45° incline" },
    { id: "sub-pu1b", name: "Incline Smith Machine Press", targetMuscle: "Upper Chest", notes: "45° incline on Smith machine, controlled reps", description: "Smith machine incline press" },
  ],
  pu2: [ // Dumbbell Lateral Raises
    { id: "sub-pu2a", name: "Cable Lateral Raise", targetMuscle: "Side Delts", notes: "Single arm, constant tension from cable", description: "Cable single-arm lateral raise" },
    { id: "sub-pu2b", name: "Machine Lateral Raise", targetMuscle: "Side Delts", notes: "Machine variation, focus on contraction at top", description: "Machine lateral raise" },
  ],
  pu3: [ // 15° Incline DB Bench Press
    { id: "sub-pu3a", name: "Low Incline Barbell Bench Press", targetMuscle: "Upper Chest", notes: "15° incline, barbell variation", description: "Low incline barbell bench press" },
    { id: "sub-pu3b", name: "Incline Dumbbell Squeeze Press", targetMuscle: "Upper Chest", notes: "15° incline, press dumbbells together throughout", description: "Incline squeeze press for inner chest" },
  ],
  pu4: [ // Flat Dumbbell Flies
    { id: "sub-pu4a", name: "Cable Crossover Flies", targetMuscle: "Chest", notes: "Cables from high position, cross at bottom", description: "High-to-low cable crossover flies" },
    { id: "sub-pu4b", name: "Pec Deck Machine", targetMuscle: "Chest", notes: "Machine fly, squeeze and hold at peak contraction", description: "Pec deck machine fly" },
  ],
  pu5: [ // X-Over Cable Tricep Extensions
    { id: "sub-pu5a", name: "Tricep Rope Pushdown", targetMuscle: "Triceps", notes: "Rope attachment, spread at the bottom", description: "Cable rope tricep pushdown" },
    { id: "sub-pu5b", name: "Straight Bar Pushdown", targetMuscle: "Triceps", notes: "Straight or EZ bar attachment, strict elbows", description: "Cable straight bar tricep pushdown" },
  ],
  pu6: [ // Single Arm Overhead Cable Tricep Extensions
    { id: "sub-pu6a", name: "Overhead Dumbbell Tricep Extension", targetMuscle: "Triceps", notes: "Single arm, lower behind head, full stretch", description: "Single-arm overhead dumbbell extension" },
    { id: "sub-pu6b", name: "Cable Kickback", targetMuscle: "Triceps", notes: "Hinge forward, extend arm back, squeeze at top", description: "Single-arm cable tricep kickback" },
  ],

  // ── Pull ──
  pl1: [ // Seated Row Machine
    { id: "sub-pl1a", name: "Cable Seated Row - Wide Grip", targetMuscle: "Mid Back", notes: "Wide grip bar, pull to lower chest", description: "Wide-grip cable seated row" },
    { id: "sub-pl1b", name: "Chest-Supported Row Machine", targetMuscle: "Mid Back", notes: "Chest pad supported, isolate back muscles", description: "Chest-supported machine row" },
  ],
  pl2: [ // T-Bar Row
    { id: "sub-pl2a", name: "Barbell Bent-Over Row", targetMuscle: "Back Thickness", notes: "Overhand grip, row to lower chest", description: "Classic barbell bent-over row" },
    { id: "sub-pl2b", name: "Meadows Row", targetMuscle: "Back Thickness", notes: "Single arm landmine row, squeeze at top", description: "Landmine single-arm Meadows row" },
  ],
  pl3: [ // Lat Pull Down - Pronated
    { id: "sub-pl3a", name: "Lat Pull Down - Supinated Grip", targetMuscle: "Lats", notes: "Underhand grip, pull to upper chest, squeeze lats", description: "Supinated (underhand) lat pulldown" },
    { id: "sub-pl3b", name: "Straight-Arm Pulldown", targetMuscle: "Lats", notes: "Arms straight, pull bar to thighs, feel lats stretch", description: "Cable straight-arm lat pulldown" },
  ],
  pl4: [ // Single Arm Cross Body Reverse Fly
    { id: "sub-pl4a", name: "Cable Reverse Fly", targetMuscle: "Rear Delts", notes: "Both arms, cables crossed, fly out to sides", description: "Dual cable reverse fly" },
    { id: "sub-pl4b", name: "Bent-Over Dumbbell Reverse Fly", targetMuscle: "Rear Delts", notes: "Hinged forward, raise dumbbells to sides", description: "Bent-over dumbbell rear delt fly" },
  ],
  pl5: [ // Dumbbell Preacher Curls
    { id: "sub-pl5a", name: "EZ Bar Preacher Curl", targetMuscle: "Biceps", notes: "EZ bar on preacher bench, full range of motion", description: "EZ bar preacher curl" },
    { id: "sub-pl5b", name: "Machine Preacher Curl", targetMuscle: "Biceps", notes: "Preacher curl machine, controlled eccentric", description: "Machine preacher curl" },
  ],
  pl6: [ // Dumbbell Preacher Hammer Curls
    { id: "sub-pl6a", name: "Cross-Body Hammer Curl", targetMuscle: "Biceps", notes: "Curl dumbbell across body, neutral grip", description: "Cross-body dumbbell hammer curl" },
    { id: "sub-pl6b", name: "Rope Hammer Curl (Cable)", targetMuscle: "Biceps", notes: "Rope attachment on low cable, hammer grip curl", description: "Cable rope hammer curl" },
  ],

  // ── Legs ──
  lg1: [ // Laying Hamstring Curl
    { id: "sub-lg1a", name: "Seated Hamstring Curl", targetMuscle: "Hamstrings", notes: "Seated machine curl, squeeze at bottom", description: "Seated machine hamstring curl" },
    { id: "sub-lg1b", name: "Single-Leg Lying Curl", targetMuscle: "Hamstrings", notes: "One leg at a time, focus on contraction", description: "Single-leg lying hamstring curl" },
  ],
  lg2: [ // Barbell RDL
    { id: "sub-lg2a", name: "Dumbbell RDL", targetMuscle: "Hamstrings/Glutes", notes: "Dumbbells along legs, hinge at hips", description: "Romanian deadlift with dumbbells" },
    { id: "sub-lg2b", name: "Trap Bar RDL", targetMuscle: "Hamstrings/Glutes", notes: "Trap/hex bar, hinge pattern, neutral grip", description: "Trap bar Romanian deadlift" },
  ],
  lg3: [ // DB Split Squat - Bilateral
    { id: "sub-lg3a", name: "Walking Lunges (DB)", targetMuscle: "Quads/Glutes", notes: "Step forward alternating, dumbbells at sides", description: "Dumbbell walking lunges" },
    { id: "sub-lg3b", name: "Reverse Lunge (DB)", targetMuscle: "Quads/Glutes", notes: "Step back into lunge, drive through front heel", description: "Dumbbell reverse lunge" },
  ],
  lg4: [ // Goblet Squat - To Bench
    { id: "sub-lg4a", name: "Box Squat (DB/KB)", targetMuscle: "Quads", notes: "Squat to box/bench height, pause, drive up", description: "Dumbbell or kettlebell box squat" },
    { id: "sub-lg4b", name: "Leg Press (Narrow Stance)", targetMuscle: "Quads", notes: "Feet close together on leg press, quad focus", description: "Narrow stance leg press" },
  ],
  lg5: [ // Leg Extension
    { id: "sub-lg5a", name: "Sissy Squat", targetMuscle: "Quads", notes: "Lean back, bend knees, isolate quads", trackWeight: false, repLabel: "Reps", description: "Bodyweight sissy squat for quad isolation" },
    { id: "sub-lg5b", name: "Single-Leg Extension", targetMuscle: "Quads", notes: "One leg at a time for balanced development", description: "Unilateral machine leg extension" },
  ],
  lg6: [ // Seated Calf Raise
    { id: "sub-lg6a", name: "Standing Calf Raise", targetMuscle: "Calves", notes: "Standing machine or Smith machine, full range", description: "Standing machine calf raise" },
    { id: "sub-lg6b", name: "Single-Leg Calf Raise (DB)", targetMuscle: "Calves", notes: "One leg on step, hold dumbbell, full stretch at bottom", description: "Single-leg dumbbell calf raise" },
  ],

  // ── Upper ──
  up1: [ // Seated Cable Row - V Bar
    { id: "sub-up1a", name: "Seated Cable Row - Wide Grip", targetMuscle: "Mid Back", notes: "Wide grip bar, pull to lower chest", description: "Wide-grip cable seated row" },
    { id: "sub-up1b", name: "Chest-Supported Dumbbell Row", targetMuscle: "Mid Back", notes: "Lie chest down on incline bench, row dumbbells", description: "Incline chest-supported dumbbell row" },
  ],
  up2: [ // Lat Pull Down - V Bar
    { id: "sub-up2a", name: "Close-Grip Lat Pulldown", targetMuscle: "Lats", notes: "Supinated close grip, focus on lat squeeze", description: "Close-grip lat pulldown variation" },
    { id: "sub-up2b", name: "Single-Arm Cable Pulldown", targetMuscle: "Lats", notes: "One arm at a time, full stretch and squeeze", description: "Unilateral cable lat pulldown" },
  ],
  up3: [ // Flat DB Bench Press
    { id: "sub-up3a", name: "Flat Barbell Bench Press", targetMuscle: "Chest", notes: "Classic barbell bench, moderate grip width", description: "Barbell flat bench press" },
    { id: "sub-up3b", name: "Dumbbell Floor Press", targetMuscle: "Chest", notes: "Lie on floor, press dumbbells, limited ROM protects shoulders", description: "Floor dumbbell press" },
  ],
  up4: [ // Cable Flies To Thighs
    { id: "sub-up4a", name: "Decline Dumbbell Flies", targetMuscle: "Lower Chest", notes: "Slight decline bench, fly motion targeting lower chest", description: "Decline bench dumbbell flies" },
    { id: "sub-up4b", name: "Dip Machine (Chest Focus)", targetMuscle: "Lower Chest", notes: "Lean forward on assisted dip machine, lower chest focus", description: "Machine dip targeting lower chest" },
  ],
  up5: [ // Converging Shoulder Press Machine
    { id: "sub-up5a", name: "Dumbbell Shoulder Press", targetMuscle: "Shoulders", notes: "Seated or standing, press to full lockout", description: "Dumbbell overhead shoulder press" },
    { id: "sub-up5b", name: "Smith Machine Shoulder Press", targetMuscle: "Shoulders", notes: "Seated Smith machine press, controlled reps", description: "Smith machine overhead press" },
  ],
  up6: [ // Dumbbell Preacher Curls (same subs as pl5)
    { id: "sub-up6a", name: "EZ Bar Preacher Curl", targetMuscle: "Biceps", notes: "EZ bar on preacher bench, full range of motion", description: "EZ bar preacher curl" },
    { id: "sub-up6b", name: "Machine Preacher Curl", targetMuscle: "Biceps", notes: "Preacher curl machine, controlled eccentric", description: "Machine preacher curl" },
  ],
  up7: [ // Dumbbell Preacher Hammer Curls (same subs as pl6)
    { id: "sub-up7a", name: "Cross-Body Hammer Curl", targetMuscle: "Biceps", notes: "Curl dumbbell across body, neutral grip", description: "Cross-body dumbbell hammer curl" },
    { id: "sub-up7b", name: "Rope Hammer Curl (Cable)", targetMuscle: "Biceps", notes: "Rope attachment on low cable, hammer grip curl", description: "Cable rope hammer curl" },
  ],
  up8: [ // Tricep Push Down - Rope
    { id: "sub-up8a", name: "Tricep Push Down - V Bar", targetMuscle: "Triceps", notes: "V-bar attachment, lock elbows, squeeze at bottom", description: "V-bar cable tricep pushdown" },
    { id: "sub-up8b", name: "Dumbbell Skull Crusher", targetMuscle: "Triceps", notes: "Lie flat, lower dumbbells to forehead, extend", description: "Lying dumbbell skull crushers" },
  ],
};
