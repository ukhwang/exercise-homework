import { useState } from "react";
import { Button } from "./design-system/Button";
import { Chip } from "./design-system/Chip";
import { Card } from "./design-system/Card";
import { Alert } from "./design-system/Alert";
import { X, Plus, Search } from "lucide-react";

interface Member {
  id: string;
  name: string;
  lastSession?: string;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  cue: string;
  category: "근력" | "유산소" | "스트레칭";
}

const recentMembers: Member[] = [
  { id: "1", name: "김철수", lastSession: "06.01" },
  { id: "2", name: "이영희", lastSession: "06.02" },
  { id: "3", name: "박민수", lastSession: "05.30" },
  { id: "4", name: "최수진", lastSession: "05.29" },
];

const exerciseLibrary: Exercise[] = [
  { id: "1", name: "스쿼트", sets: 3, reps: 12, weight: 60, cue: "무릎이 발끝 넘지 않게", category: "근력" },
  { id: "2", name: "레그 프레스", sets: 4, reps: 10, weight: 80, cue: "호흡 잊지 마세요", category: "근력" },
  { id: "3", name: "레그 익스텐션", sets: 3, reps: 15, weight: 15, cue: "천천히 내리기", category: "근력" },
  { id: "4", name: "푸시업", sets: 3, reps: 15, weight: 0, cue: "등 일직선 유지", category: "근력" },
  { id: "5", name: "플랭크", sets: 3, reps: 60, weight: 0, cue: "코어에 힘", category: "근력" },
];

export function TrainerWorkspace() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddExercise = (exercise: Exercise) => {
    if (!selectedExercises.find((e) => e.id === exercise.id)) {
      setSelectedExercises([...selectedExercises, { ...exercise }]);
    }
  };

  const handleRemoveExercise = (id: string) => {
    setSelectedExercises(selectedExercises.filter((e) => e.id !== id));
  };

  const handleSendHomework = () => {
    alert(`카카오톡으로 ${selectedMember?.name}님께 숙제 전송됨!`);
  };

  const filteredExercises = exerciseLibrary.filter((ex) => {
    const matchesCategory = !filterCategory || ex.category === filterCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && !selectedExercises.find((e) => e.id === ex.id);
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-white text-black border-b-2 border-black p-4 flex justify-between items-center">
        <h1 className="text-xl">운동숙제</h1>
        <div className="w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center font-bold">
          PT
        </div>
      </div>

      {/* Member Selection */}
      <div className="bg-white text-black border-b-2 border-black p-4">
        <h2 className="mb-3">회원 선택</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {recentMembers.map((member) => (
            <Chip
              key={member.id}
              label={member.name}
              sublabel={member.lastSession}
              selected={selectedMember?.id === member.id}
              onSelect={() => setSelectedMember(member)}
            />
          ))}
          <Chip label="+" onSelect={() => alert("회원 검색")} />
        </div>

        {/* Search Bar */}
        <div className="mt-3 relative">
          <input
            type="text"
            placeholder="회원 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[56px] px-4 pl-12 border-2 border-black text-black"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
        </div>
      </div>

      {/* Context Alert */}
      {selectedMember && (
        <div className="p-4">
          <Alert>
            <strong>{selectedMember.name}님</strong> 지난 숙제에서
            <br />
            <strong>"레그 익스텐션 15kg"</strong>이 가장 힘들었어요
          </Alert>
        </div>
      )}

      {/* Exercise List */}
      <div className="flex-1 bg-white text-black p-4">
        <h2 className="mb-3">운동 추가</h2>

        {/* Category Filter */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={filterCategory === "근력" ? "primary" : "secondary"}
            size="default"
            onClick={() => setFilterCategory(filterCategory === "근력" ? null : "근력")}
            className="h-[40px] text-sm"
          >
            근력
          </Button>
          <Button
            variant={filterCategory === "유산소" ? "primary" : "secondary"}
            size="default"
            onClick={() => setFilterCategory(filterCategory === "유산소" ? null : "유산소")}
            className="h-[40px] text-sm"
          >
            유산소
          </Button>
          <Button
            variant={filterCategory === "스트레칭" ? "primary" : "secondary"}
            size="default"
            onClick={() => setFilterCategory(filterCategory === "스트레칭" ? null : "스트레칭")}
            className="h-[40px] text-sm"
          >
            스트레칭
          </Button>
        </div>

        {/* Selected Exercises */}
        {selectedExercises.length > 0 && (
          <div className="mb-4 space-y-3">
            {selectedExercises.map((exercise) => (
              <Card key={exercise.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 border-2 border-black bg-[#CCFF00]" />
                      <h3 className="font-bold">{exercise.name}</h3>
                    </div>
                    <p className="text-sm mb-2">
                      {exercise.sets}세트 × {exercise.reps}
                      {exercise.weight > 0 ? `회 / ${exercise.weight}kg` : "초"}
                    </p>
                    <p className="text-sm text-gray-600">큐잉: "{exercise.cue}"</p>
                  </div>
                  <button
                    onClick={() => handleRemoveExercise(exercise.id)}
                    className="w-8 h-8 border-2 border-black hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Available Exercises */}
        {filteredExercises.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-bold mb-2">추가 가능한 운동</p>
            {filteredExercises.map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => handleAddExercise(exercise)}
                className="w-full text-left p-3 border border-black hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="font-bold">{exercise.name}</span>
                  <span className="text-sm text-gray-600">
                    ({exercise.sets}세트 × {exercise.reps}
                    {exercise.weight > 0 ? `회` : "초"})
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {selectedMember && selectedExercises.length > 0 && (
        <div className="p-4 bg-white border-t-2 border-black">
          <Button variant="primary" size="large" onClick={handleSendHomework} className="w-full">
            저장 및 카카오 전송
          </Button>
        </div>
      )}
    </div>
  );
}
