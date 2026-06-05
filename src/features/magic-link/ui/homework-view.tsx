import type { SelectedExercise } from "@/features/records/model/record.types";

type HomeworkViewProps = {
  clientName: string;
  exercises: SelectedExercise[];
};

export function HomeworkView({ clientName, exercises }: HomeworkViewProps) {
  return (
    <section className="border-b-4 border-black bg-white px-4 py-6">
      <h1 className="text-2xl font-black uppercase leading-tight sm:text-3xl">
        {clientName}님의
        <br />
        오늘 운동 숙제
      </h1>

      <ul className="mt-6 flex flex-col gap-4">
        {exercises.map((exercise, index) => (
          <li
            key={exercise.id}
            className="border-4 border-black bg-white p-4"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-black/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-xl font-black uppercase">{exercise.name}</h2>
            </div>

            <p className="mt-2 text-sm font-bold">
              {exercise.sets}세트 × {exercise.reps}회
            </p>

            {exercise.selectedTags.length > 0 ? (
              <p className="mt-3 text-sm font-black uppercase">
                큐잉 {exercise.selectedTags.join(" ")}
              </p>
            ) : (
              <p className="mt-3 text-xs font-bold uppercase text-black/50">
                큐잉 없음
              </p>
            )}

            <p className="mt-2 text-xs font-bold leading-snug text-black/70">
              {exercise.default_desc}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
