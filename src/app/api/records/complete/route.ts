import { NextResponse } from "next/server";

import { completeRecordBodySchema } from "@/features/magic-link/model/completion.schema";
import { getTodayDayIndex } from "@/features/records/lib/weekly-plan";
import { createSupabaseAdmin } from "@/shared/lib/supabase/admin";

type DayCompletionEntry = {
  day: number;
  answer: string;
  completed_at: string;
};

export async function POST(request: Request) {
  try {
    const json: unknown = await request.json();
    const parsed = completeRecordBodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { token, answer, day: dayFromBody } = parsed.data;
    const supabase = createSupabaseAdmin();

    const { data: existing, error: fetchError } = await supabase
      .from("records")
      .select(
        "id, day_completions, routine_start_date, sent_at, status"
      )
      .eq("magic_token", token)
      .maybeSingle();

    if (fetchError) {
      console.error("complete record fetch failed:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch record", message: fetchError.message },
        { status: 500 }
      );
    }

    if (!existing) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const todayDay =
      dayFromBody ??
      getTodayDayIndex(
        existing.routine_start_date as string | null,
        existing.sent_at as string | null
      );

    const prevCompletions = Array.isArray(existing.day_completions)
      ? (existing.day_completions as DayCompletionEntry[])
      : [];

    const completedAt = new Date().toISOString();
    const withoutToday = prevCompletions.filter((c) => c.day !== todayDay);
    const nextCompletions: DayCompletionEntry[] = [
      ...withoutToday,
      { day: todayDay, answer, completed_at: completedAt },
    ];

    const allSevenDone = nextCompletions.length >= 7;
    const nextStatus = allSevenDone ? "completed" : "viewed";

    const { data, error } = await supabase
      .from("records")
      .update({
        status: nextStatus,
        micro_hurdle_answer: answer,
        completed_at: allSevenDone ? completedAt : null,
        day_completions: nextCompletions,
        viewed_at: completedAt,
      })
      .eq("magic_token", token)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("complete record failed:", error);
      return NextResponse.json(
        { error: "Failed to complete record", message: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, day: todayDay });
  } catch (err) {
    console.error("POST /api/records/complete error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
