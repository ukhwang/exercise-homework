import type { ExerciseCatalogItem, ExerciseCategory } from "@lib/constants/exercises";

export type { ExerciseCatalogItem, ExerciseCategory };

export const CUE_TAG_PRESETS = [
  "#골반중립",
  "#호흡유지",
  "#천천히",
  "#통증주의",
  "#코어긴장",
  "#어깨내림",
  "#무릎정렬",
  "#전신긴장",
] as const;

export const QUICK_CUSTOM_TAG_SUGGESTIONS = [
  "#가동범위",
  "#템포조절",
  "#자세우선",
  "#마지막까지",
] as const;

export type CueTagPreset = (typeof CUE_TAG_PRESETS)[number];

export const EXERCISE_FILTER_CHIPS = [
  { id: "all", label: "전체" },
  { id: "strength", label: "근력" },
  { id: "cardio", label: "유산소" },
  { id: "stretch", label: "스트레칭" },
] as const;

export type ExerciseFilterId = (typeof EXERCISE_FILTER_CHIPS)[number]["id"];
