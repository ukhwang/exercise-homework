import { useState } from "react";
import { Button } from "./design-system/Button";
import { Card } from "./design-system/Card";
import { ProgressBar } from "./design-system/ProgressBar";
import { CueChip } from "./design-system/Chip";
import { CheckCircle } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  cues: Array<{ text: string; color: "gray" | "green" | "blue" }>;
  completedSets: boolean[];
}

export function RehabMemberLink() {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "1",
      name: "Squat",
      sets: 3,
      reps: 12,
      weight: 60,
      cues: [
        { text: "Knees over toes", color: "gray" },
        { text: "Core engaged", color: "green" }
      ],
      completedSets: [false, false, false],
    },
    {
      id: "2",
      name: "Leg Press",
      sets: 4,
      reps: 10,
      weight: 80,
      cues: [
        { text: "Controlled descent", color: "blue" },
        { text: "Breathe steadily", color: "gray" }
      ],
      completedSets: [false, false, false, false],
    },
    {
      id: "3",
      name: "Leg Extension",
      sets: 3,
      reps: 15,
      weight: 15,
      cues: [{ text: "Slow tempo", color: "gray" }],
      completedSets: [false, false, false],
    },
    {
      id: "4",
      name: "Push-up",
      sets: 3,
      reps: 15,
      weight: 0,
      cues: [
        { text: "Straight line", color: "green" },
        { text: "Full range", color: "blue" }
      ],
      completedSets: [false, false, false],
    },
  ]);

  const [showCompletion, setShowCompletion] = useState(false);

  const toggleSet = (exerciseId: string, setIndex: number) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id === exerciseId) {
          const newCompletedSets = [...ex.completedSets];
          newCompletedSets[setIndex] = !newCompletedSets[setIndex];
          return { ...ex, completedSets: newCompletedSets };
        }
        return ex;
      })
    );
  };

  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSetsCount = exercises.reduce(
    (sum, ex) => sum + ex.completedSets.filter((s) => s).length,
    0
  );
  const progress = (completedSetsCount / totalSets) * 100;

  const handleComplete = () => {
    setShowCompletion(true);
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card variant="elevated" className="text-center max-w-md w-full p-8">
          <div className="w-20 h-20 bg-[#00C853] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Workout Complete!</h1>
          <p className="text-[#757575] mb-6">
            {exercises.length} exercises / {totalSets} sets completed
          </p>
          <div className="space-y-3">
            <Button variant="primary" size="large" className="w-full">
              Send Message to Trainer
            </Button>
            <Button variant="ghost" size="default" onClick={() => setShowCompletion(false)} className="w-full">
              Close
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-[#F0F0F0] p-4 sticky top-0 z-10">
        <h1 className="text-lg font-bold mb-1">Today's Workout 🏋️</h1>
        <p className="text-sm text-[#757575]">Sarah J. | June 3, 2026</p>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-[#F0F0F0] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">PROGRESS</span>
          <span className="text-sm text-[#757575]">
            {Math.round(progress)}% ({completedSetsCount}/{totalSets})
          </span>
        </div>
        <ProgressBar value={progress} color="primary" />
      </div>

      {/* Exercise List */}
      <div className="p-4 space-y-4 pb-24">
        {exercises.map((exercise, idx) => (
          <Card key={exercise.id} variant="elevated">
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {idx + 1}. {exercise.name}
                  </h3>
                  <p className="text-sm text-[#757575] mt-1">
                    {exercise.sets} sets × {exercise.reps}{" "}
                    {exercise.weight > 0 ? `reps / ${exercise.weight}kg` : "sec"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#757575]">
                    {exercise.completedSets.filter((s) => s).length}/{exercise.sets}
                  </span>
                </div>
              </div>

              {/* Cues */}
              <div className="flex flex-wrap gap-2 mb-4">
                {exercise.cues.map((cue, cueIdx) => (
                  <CueChip key={cueIdx} label={cue.text} color={cue.color} />
                ))}
              </div>
            </div>

            {/* Set Buttons - Grid Layout */}
            <div className="grid grid-cols-4 gap-2">
              {exercise.completedSets.map((completed, setIdx) => (
                <Button
                  key={setIdx}
                  variant="set"
                  size="set"
                  onClick={() => toggleSet(exercise.id, setIdx)}
                  data-checked={completed}
                  className="w-full"
                >
                  {completed ? "✓" : `${setIdx + 1}`}
                </Button>
              ))}
            </div>
          </Card>
        ))}

        {/* Feedback Button */}
        <button className="w-full p-4 bg-[#F8F8F8] hover:bg-[#E5E5E5] rounded-lg transition-all text-sm text-[#757575]">
          Report difficulty with an exercise 😓
        </button>
      </div>

      {/* Complete Button */}
      {progress === 100 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#F0F0F0]">
          <Button variant="primary" size="large" onClick={handleComplete} className="w-full">
            Complete Workout
          </Button>
        </div>
      )}
    </div>
  );
}
