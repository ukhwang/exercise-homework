import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ExerciseCatalogItem } from "@lib/constants/exercises";

type ExerciseStore = {
  customExercises: ExerciseCatalogItem[];
  addCustomExercise: (name: string, description?: string) => ExerciseCatalogItem;
  removeCustomExercise: (id: string) => void;
};

function createCustomId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `custom_${crypto.randomUUID()}`;
  }
  return `custom_${Date.now()}`;
}

export const useExerciseStore = create<ExerciseStore>()(
  persist(
    (set) => ({
      customExercises: [],

      addCustomExercise: (name, description) => {
        const trimmedName = name.trim();
        const exercise: ExerciseCatalogItem = {
          id: createCustomId(),
          name: trimmedName,
          default_desc: description?.trim() || "트레이너가 추가한 운동",
          category: "upper",
        };

        set((state) => ({
          customExercises: [...state.customExercises, exercise],
        }));

        return exercise;
      },

      removeCustomExercise: (id) =>
        set((state) => ({
          customExercises: state.customExercises.filter((ex) => ex.id !== id),
        })),
    }),
    {
      name: "exercise-homework-custom-exercises",
    }
  )
);
