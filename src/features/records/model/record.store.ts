import { create } from "zustand";

import type { Client } from "@/features/clients/model/client.types";
import type { ExerciseCatalogItem } from "@/features/exercise-library/model/exercise.types";
import {
  defaultAppointmentTimeLocal,
  planRecordToArray,
  type DayIndex,
} from "@/features/records/lib/weekly-plan";
import type { SelectedExercise } from "@/features/records/model/record.types";

const DEFAULT_SETS = 3;
const DEFAULT_REPS = 10;

function emptyPlanByDay(): Record<number, SelectedExercise[]> {
  const record: Record<number, SelectedExercise[]> = {};
  for (let d = 1; d <= 7; d++) {
    record[d] = [];
  }
  return record;
}

function cloneExercises(exercises: SelectedExercise[]): SelectedExercise[] {
  return exercises.map((ex) => ({
    ...ex,
    selectedTags: [...ex.selectedTags],
  }));
}

type RecordStore = {
  selectedClient: Client | null;
  activeDay: DayIndex;
  planByDay: Record<number, SelectedExercise[]>;
  appointmentTime: string;
  setSelectedClient: (client: Client) => void;
  setActiveDay: (day: DayIndex) => void;
  setAppointmentTime: (value: string) => void;
  getSelectedExercises: () => SelectedExercise[];
  toggleExercise: (exercise: ExerciseCatalogItem) => void;
  addExerciseToRecord: (exercise: ExerciseCatalogItem) => void;
  removeExercise: (exerciseId: string) => void;
  incrementSets: (exerciseId: string) => void;
  decrementSets: (exerciseId: string) => void;
  incrementReps: (exerciseId: string) => void;
  decrementReps: (exerciseId: string) => void;
  toggleCueTag: (exerciseId: string, tag: string) => void;
  addCustomCueTag: (exerciseId: string, rawTag: string) => void;
  getWeeklyPlanForSave: () => ReturnType<typeof planRecordToArray>;
  applyCurrentDayToRemainingDays: () => void;
  totalExerciseCount: () => number;
  resetWorkspace: () => void;
};

function patchActiveDay(
  planByDay: Record<number, SelectedExercise[]>,
  activeDay: number,
  updater: (exercises: SelectedExercise[]) => SelectedExercise[]
): Record<number, SelectedExercise[]> {
  return {
    ...planByDay,
    [activeDay]: updater(planByDay[activeDay] ?? []),
  };
}

export const useRecordStore = create<RecordStore>((set, get) => ({
  selectedClient: null,
  activeDay: 1,
  planByDay: emptyPlanByDay(),
  appointmentTime: defaultAppointmentTimeLocal(),

  setSelectedClient: (client) => set({ selectedClient: client }),

  setActiveDay: (day) => set({ activeDay: day }),

  setAppointmentTime: (value) => set({ appointmentTime: value }),

  getSelectedExercises: () => {
    const { planByDay, activeDay } = get();
    return planByDay[activeDay] ?? [];
  },

  addExerciseToRecord: (exercise) =>
    set((state) => {
      const current = state.planByDay[state.activeDay] ?? [];
      if (current.some((item) => item.id === exercise.id)) return state;

      const next: SelectedExercise = {
        ...exercise,
        sets: DEFAULT_SETS,
        reps: DEFAULT_REPS,
        selectedTags: [],
      };

      return {
        planByDay: patchActiveDay(state.planByDay, state.activeDay, () => [
          ...current,
          next,
        ]),
      };
    }),

  toggleExercise: (exercise) =>
    set((state) => {
      const current = state.planByDay[state.activeDay] ?? [];
      const exists = current.some((item) => item.id === exercise.id);

      if (exists) {
        return {
          planByDay: patchActiveDay(state.planByDay, state.activeDay, () =>
            current.filter((item) => item.id !== exercise.id)
          ),
        };
      }

      const next: SelectedExercise = {
        ...exercise,
        sets: DEFAULT_SETS,
        reps: DEFAULT_REPS,
        selectedTags: [],
      };

      return {
        planByDay: patchActiveDay(state.planByDay, state.activeDay, () => [
          ...current,
          next,
        ]),
      };
    }),

  removeExercise: (exerciseId) =>
    set((state) => ({
      planByDay: patchActiveDay(state.planByDay, state.activeDay, (list) =>
        list.filter((item) => item.id !== exerciseId)
      ),
    })),

  incrementSets: (exerciseId) =>
    set((state) => ({
      planByDay: patchActiveDay(state.planByDay, state.activeDay, (list) =>
        list.map((item) =>
          item.id === exerciseId
            ? { ...item, sets: Math.min(item.sets + 1, 99) }
            : item
        )
      ),
    })),

  decrementSets: (exerciseId) =>
    set((state) => ({
      planByDay: patchActiveDay(state.planByDay, state.activeDay, (list) =>
        list.map((item) =>
          item.id === exerciseId
            ? { ...item, sets: Math.max(item.sets - 1, 1) }
            : item
        )
      ),
    })),

  incrementReps: (exerciseId) =>
    set((state) => ({
      planByDay: patchActiveDay(state.planByDay, state.activeDay, (list) =>
        list.map((item) =>
          item.id === exerciseId
            ? { ...item, reps: Math.min(item.reps + 1, 99) }
            : item
        )
      ),
    })),

  decrementReps: (exerciseId) =>
    set((state) => ({
      planByDay: patchActiveDay(state.planByDay, state.activeDay, (list) =>
        list.map((item) =>
          item.id === exerciseId
            ? { ...item, reps: Math.max(item.reps - 1, 1) }
            : item
        )
      ),
    })),

  toggleCueTag: (exerciseId, tag) =>
    set((state) => ({
      planByDay: patchActiveDay(state.planByDay, state.activeDay, (list) =>
        list.map((item) => {
          if (item.id !== exerciseId) return item;
          const hasTag = item.selectedTags.includes(tag);
          return {
            ...item,
            selectedTags: hasTag
              ? item.selectedTags.filter((t) => t !== tag)
              : [...item.selectedTags, tag],
          };
        })
      ),
    })),

  addCustomCueTag: (exerciseId, rawTag) =>
    set((state) => {
      const trimmed = rawTag.trim();
      if (!trimmed) return state;

      const tag = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
      if (tag.length <= 1) return state;

      return {
        planByDay: patchActiveDay(state.planByDay, state.activeDay, (list) =>
          list.map((item) => {
            if (item.id !== exerciseId) return item;
            if (item.selectedTags.includes(tag)) return item;
            return { ...item, selectedTags: [...item.selectedTags, tag] };
          })
        ),
      };
    }),

  getWeeklyPlanForSave: () => planRecordToArray(get().planByDay),

  applyCurrentDayToRemainingDays: () =>
    set((state) => {
      const source = state.planByDay[state.activeDay] ?? [];
      if (source.length === 0 || state.activeDay >= 7) return state;

      const next = { ...state.planByDay };
      for (let d = state.activeDay + 1; d <= 7; d++) {
        next[d] = cloneExercises(source);
      }
      return { planByDay: next };
    }),

  totalExerciseCount: () => {
    const { planByDay } = get();
    return Object.values(planByDay).reduce((sum, list) => sum + list.length, 0);
  },

  resetWorkspace: () =>
    set({
      selectedClient: null,
      activeDay: 1,
      planByDay: emptyPlanByDay(),
      appointmentTime: defaultAppointmentTimeLocal(),
    }),
}));
