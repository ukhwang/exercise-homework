import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { hasAnyExercises } from "@/features/records/lib/weekly-plan";
import { createRecordBodySchema } from "@/features/records/model/record.schema";
import { TRAINER_ID } from "@/shared/config/trainer";
import { getAppOrigin } from "@/shared/lib/env";
import { createSupabaseAdmin } from "@/shared/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const json: unknown = await request.json();
    const parsed = createRecordBodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { clientId, appointmentTime, weeklyPlan, note } = parsed.data;

    if (!hasAnyExercises(weeklyPlan)) {
      return NextResponse.json(
        { error: "At least one day must include exercises" },
        { status: 400 }
      );
    }

    const appointmentIso = new Date(appointmentTime).toISOString();
    const routineStartDate = new Date().toISOString().slice(0, 10);
    const magicToken = randomUUID();
    const origin = getAppOrigin(request.headers.get("origin") ?? undefined);
    const shareUrl = `${origin}/h/${magicToken}`;
    const sentAt = new Date().toISOString();

    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("records")
      .insert({
        trainer_id: TRAINER_ID,
        client_id: clientId,
        magic_token: magicToken,
        share_url: shareUrl,
        exercises_json: weeklyPlan,
        note: note ?? null,
        status: "sent",
        sent_at: sentAt,
        appointment_time: appointmentIso,
        routine_start_date: routineStartDate,
        day_completions: [],
        micro_hurdle_question: "오늘 가장 힘들었던 운동은?",
      })
      .select("id, magic_token")
      .single();

    if (error) {
      console.error("records insert failed:", error);
      return NextResponse.json(
        { error: "Failed to create record", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: data.id,
      magic_token: data.magic_token,
    });
  } catch (err) {
    console.error("POST /api/records error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
