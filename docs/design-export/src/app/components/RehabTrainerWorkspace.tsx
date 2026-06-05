import { useState } from "react";
import { Button } from "./design-system/Button";
import { Chip, CueChip } from "./design-system/Chip";
import { Card } from "./design-system/Card";
import { Alert } from "./design-system/Alert";
import { Menu, User, Search, Plus, X } from "lucide-react";

interface Member {
  id: string;
  name: string;
  status: "active" | "pending" | "default";
  lastSession?: string;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  cues: Array<{ text: string; color: "gray" | "green" | "blue" }>;
  category: "근력" | "유산소" | "스트레칭";
}

const recentMembers: Member[] = [
  { id: "1", name: "Sarah J.", status: "active", lastSession: "Today" },
  { id: "2", name: "Mike R.", status: "pending", lastSession: "Yesterday" },
  { id: "3", name: "Emma K.", status: "default", lastSession: "2 days ago" },
  { id: "4", name: "David L.", status: "default", lastSession: "3 days ago" },
];

const exerciseLibrary: Exercise[] = [
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
    category: "근력"
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
    category: "근력"
  },
  {
    id: "3",
    name: "Leg Extension",
    sets: 3,
    reps: 15,
    weight: 15,
    cues: [{ text: "Slow tempo", color: "gray" }],
    category: "근력"
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
    category: "근력"
  },
];

export function RehabTrainerWorkspace() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(recentMembers[0]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
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
    alert(`Assignment sent to ${selectedMember?.name} via KakaoTalk!`);
  };

  const filteredExercises = exerciseLibrary.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && !selectedExercises.find((e) => e.id === ex.id);
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-[#F0F0F0] p-4 flex justify-between items-center sticky top-0 z-10">
        <button className="w-10 h-10 flex items-center justify-center hover:bg-[#F8F8F8] rounded-lg transition-colors">
          <Menu className="w-5 h-5 text-[#1A1A1A]" />
        </button>
        <h1 className="text-xl font-bold">REHAB FLOW</h1>
        <button className="w-10 h-10 flex items-center justify-center bg-[#004DFF] rounded-lg">
          <User className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Member Carousel */}
      <div className="bg-white border-b border-[#F0F0F0] p-4">
        <h2 className="text-sm font-semibold mb-3 text-[#757575]">CLIENTS</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {recentMembers.map((member) => (
            <Chip
              key={member.id}
              label={member.name}
              sublabel={member.lastSession}
              status={member.status}
              selected={selectedMember?.id === member.id}
              onSelect={() => setSelectedMember(member)}
            />
          ))}
        </div>
      </div>

      {/* Context Alert */}
      {selectedMember && (
        <div className="p-4">
          <Alert variant="warning" icon="💡">
            <strong>{selectedMember.name}</strong> reported difficulty with{" "}
            <strong>"Leg Extension 15kg"</strong> in the last session
          </Alert>
        </div>
      )}

      {/* Search Bar */}
      <div className="px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[48px] px-4 pl-12 bg-white border border-[#E5E5E5] rounded-lg text-[#1A1A1A] placeholder:text-[#757575] focus:outline-none focus:ring-2 focus:ring-[#004DFF] transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
        </div>
      </div>

      {/* Exercise List */}
      <div className="flex-1 px-4 pb-24">
        {/* Selected Exercises */}
        {selectedExercises.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-3 text-[#757575]">
              SELECTED ({selectedExercises.length})
            </h2>
            <div className="space-y-3">
              {selectedExercises.map((exercise) => (
                <Card key={exercise.id} variant="elevated">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{exercise.name}</h3>
                      <p className="text-sm text-[#757575] mb-3">
                        {exercise.sets} sets × {exercise.reps}{" "}
                        {exercise.weight > 0 ? `reps / ${exercise.weight}kg` : "sec"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exercise.cues.map((cue, idx) => (
                          <CueChip key={idx} label={cue.text} color={cue.color} />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveExercise(exercise.id)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#F8F8F8] rounded-lg transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4 text-[#757575]" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Exercises */}
        {filteredExercises.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold mb-3 text-[#757575]">LIBRARY</h2>
            <div className="space-y-2">
              {filteredExercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => handleAddExercise(exercise)}
                  className="w-full text-left p-4 bg-white border border-[#F0F0F0] hover:border-[#004DFF] hover:bg-[#F8F8F8] rounded-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#F8F8F8] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Plus className="w-4 h-4 text-[#1A1A1A]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{exercise.name}</h4>
                      <p className="text-sm text-[#757575]">
                        {exercise.sets} sets × {exercise.reps}{" "}
                        {exercise.weight > 0 ? "reps" : "sec"}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky CTA */}
      {selectedMember && selectedExercises.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#F0F0F0]">
          <Button variant="primary" size="large" onClick={handleSendHomework} className="w-full">
            Send Assignment via KakaoTalk
          </Button>
        </div>
      )}
    </div>
  );
}
