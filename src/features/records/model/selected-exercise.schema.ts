import { z } from "zod";

export const selectedExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  default_desc: z.string(),
  category: z.enum(["lower", "upper", "core"]).optional(),
  sets: z.number().int().min(1).max(99),
  reps: z.number().int().min(1).max(99),
  selectedTags: z.array(z.string()),
});
