import { EXERCISES, type ExerciseCatalogItem } from "@lib/constants/exercises";

import type { ExerciseFilterId } from "@/features/exercise-library/model/exercise.types";

export type ExerciseFilterGroup = "strength" | "cardio" | "stretch";

export function getExerciseFilterGroup(
  exercise: ExerciseCatalogItem
): ExerciseFilterGroup {
  if (exercise.id === "ex_050" || exercise.name.includes("줄넘기")) {
    return "cardio";
  }
  if (exercise.category === "core") {
    return "stretch";
  }
  return "strength";
}

export function matchesSearchQuery(
  exercise: ExerciseCatalogItem,
  query: string
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    exercise.name.toLowerCase().includes(q) ||
    exercise.default_desc.toLowerCase().includes(q) ||
    exercise.id.toLowerCase().includes(q)
  );
}

export function filterExercises(
  catalog: ExerciseCatalogItem[],
  filterId: ExerciseFilterId
): ExerciseCatalogItem[] {
  if (filterId === "all") return catalog;
  return catalog.filter(
    (exercise) => getExerciseFilterGroup(exercise) === filterId
  );
}

export function searchAndFilterExercises(
  catalog: ExerciseCatalogItem[],
  customExercises: ExerciseCatalogItem[],
  filterId: ExerciseFilterId,
  query: string
): ExerciseCatalogItem[] {
  const filteredCatalog = filterExercises(catalog, filterId).filter((exercise) =>
    matchesSearchQuery(exercise, query)
  );

  const matchingCustom = customExercises.filter((exercise) =>
    matchesSearchQuery(exercise, query)
  );

  return [...matchingCustom, ...filteredCatalog];
}
