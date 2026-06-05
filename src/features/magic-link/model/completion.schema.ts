import { z } from "zod";

export const completeRecordBodySchema = z.object({
  token: z.string().min(1),
  answer: z.string().min(1),
  day: z.number().int().min(1).max(7).optional(),
});

export type CompleteRecordBody = z.infer<typeof completeRecordBodySchema>;
