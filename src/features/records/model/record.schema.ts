import { z } from "zod";

import {
  weeklyDayPlanSchema,
  weeklyExercisesJsonSchema,
} from "@/features/records/lib/weekly-plan";

export { selectedExerciseSchema } from "@/features/records/model/selected-exercise.schema";
export { weeklyDayPlanSchema, weeklyExercisesJsonSchema };

export const createRecordBodySchema = z
  .object({
    clientId: z.string().uuid(),
    appointmentTime: z.string().min(1),
    weeklyPlan: weeklyExercisesJsonSchema,
    note: z.string().nullable().optional(),
  })
  .refine((body) => body.weeklyPlan.some((d) => d.exercises.length > 0), {
    message: "At least one day must include exercises",
    path: ["weeklyPlan"],
  });

export type CreateRecordBody = z.infer<typeof createRecordBodySchema>;

export const createRecordResponseSchema = z.object({
  id: z.string().uuid(),
  magic_token: z.string(),
});

export type CreateRecordResponse = z.infer<typeof createRecordResponseSchema>;

export const latestCompletedRecordSchema = z.object({
  id: z.string().uuid(),
  micro_hurdle_answer: z.string(),
  completed_at: z.string().nullable().optional(),
});

export const latestCompletedRecordResponseSchema = z.object({
  record: latestCompletedRecordSchema.nullable(),
});

export type LatestCompletedRecord = z.infer<typeof latestCompletedRecordSchema>;

export const recentFeedbackItemSchema = z.object({
  id: z.string().uuid(),
  micro_hurdle_answer: z.string(),
  completed_at: z.string().nullable().optional(),
});

export const recentFeedbackResponseSchema = z.object({
  items: z.array(recentFeedbackItemSchema),
});

export const appointmentConflictResponseSchema = z.object({
  hasConflict: z.boolean(),
  conflictingRecords: z.array(
    z.object({
      id: z.string().uuid(),
      client_id: z.string().uuid(),
      appointment_time: z.string(),
    })
  ),
});
