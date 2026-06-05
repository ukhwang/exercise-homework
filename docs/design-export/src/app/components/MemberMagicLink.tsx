import { useState } from "react";
import { Button } from "./design-system/Button";
import { Card } from "./design-system/Card";
import { ProgressBar } from "./design-system/ProgressBar";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  cue: string;
  completedSets: boolean[];
}

export function MemberMagicLink() {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "1",
      name: "스쿼트",
      sets: 3,
      reps: 12,
      weight: 60,
      cue: "무릎이 발끝 넘지 않게",
      completedSets: [false, false, false],
    },
    {
      id: "2",
      name: "레그 프레스",
      sets: 4,
      reps: 10,
      weight: 80,
      cue: "호흡 잊지 마세요",
      completedSets: [false, false, false, false],
    },
    {
      id: "3",
      name: "레그 익스텐션",
      sets: 3,
      reps: 15,
      weight: 15,
      cue: "천천히 내리기",
      completedSets: [false, false, false],
    },
    {
      id: "4",
      name: "푸시업",
      sets: 3,
      reps: 15,
      weight: 0,
      cue: "등 일직선 유지",
      completedSets: [false, false, false],
    },
    {
      id: "5",
      name: "플랭크",
      sets: 3,
      reps: 60,
      weight: 0,
      cue: "코어에 힘",
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="text-center max-w-md w-full p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl mb-4">오늘도 완료!</h1>
          <p className="text-lg mb-2">
            {exercises.length}개 운동 / {totalSets}세트 완수
          </p>
          <div className="space-y-3 mt-6">
            <Button variant="primary" size="large" className="w-full">
              트레이너에게 메시지 남기기
            </Button>
            <Button variant="secondary" size="default" onClick={() => setShowCompletion(false)} className="w-full">
              닫기
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-white text-black border-b-2 border-black p-4">
        <h1 className="text-lg mb-1">오늘의 운동 숙제 🏋️</h1>
        <p className="text-sm opacity-60">김철수님 | 2026.06.03</p>
      </div>

      {/* Progress */}
      <div className="bg-white text-black border-b-2 border-black p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold">진행률</span>
          <span className="text-sm">
            {Math.round(progress)}% ({completedSetsCount}/{totalSets})
          </span>
        </div>
        <ProgressBar value={progress} />
      </div>

      {/* Exercise List */}
      <div className="flex-1 bg-white text-black p-4 space-y-4">
        {exercises.map((exercise, idx) => (
          <Card key={exercise.id}>
            <div className="mb-3">
              <h3 className="font-bold text-lg mb-1">
                {idx + 1}. {exercise.name}
              </h3>
              <p className="text-sm mb-2">
                {exercise.sets}세트 × {exercise.reps}
                {exercise.weight > 0 ? `회 / ${exercise.weight}kg` : "초"}
              </p>
              <p className="text-sm bg-gray-100 p-2 border border-black">💬 "{exercise.cue}"</p>
            </div>

            {/* Set Buttons - 2 columns */}
            <div className="grid grid-cols-2 gap-2">
              {exercise.completedSets.map((completed, setIdx) => (
                <Button
                  key={setIdx}
                  variant="set"
                  size="set"
                  onClick={() => toggleSet(exercise.id, setIdx)}
                  data-checked={completed}
                  className="w-full"
                >
                  SET {setIdx + 1}
                  {completed && " ✓"}
                </Button>
              ))}
            </div>
          </Card>
        ))}

        {/* Feedback Button */}
        <button className="w-full p-4 border-2 border-black hover:bg-gray-100 transition-all">
          오늘 너무 힘들어요 😓
        </button>
      </div>

      {/* Complete Button */}
      {progress === 100 && (
        <div className="p-4 bg-white border-t-2 border-black">
          <Button variant="primary" size="large" onClick={handleComplete} className="w-full">
            완료하기
          </Button>
        </div>
      )}
    </div>
  );
}
