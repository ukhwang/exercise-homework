import { NextResponse } from "next/server";
import { z } from "zod";

import { TRAINER_ID } from "@/shared/config/trainer";
import { createSupabaseAdmin } from "@/shared/lib/supabase/admin";

function hourRange(isoOrLocal: string): { start: string; end: string } {
  const dt = new Date(isoOrLocal);
  const start = new Date(dt);
  start.setMinutes(0, 0, 0);
  const end = new Date(start);
  end.setHours(end.getHours() + 1);
  return { start: start.toISOString(), end: end.toISOString() };
}

const querySchema = z.object({
  appointmentTime: z.string().min(1),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      appointmentTime: searchParams.get("appointmentTime"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid or missing appointmentTime" },
        { status: 400 }
      );
    }

    const { start, end } = hourRange(parsed.data.appointmentTime);
    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("records")
      .select("id, client_id, appointment_time")
      .eq("trainer_id", TRAINER_ID)
      .not("appointment_time", "is", null)
      .gte("appointment_time", start)
      .lt("appointment_time", end);

    if (error) {
      console.error("appointment conflict check failed:", error);
      return NextResponse.json(
        { error: "Failed to check conflicts", message: error.message },
        { status: 500 }
      );
    }

    const rows = (data ?? []).map((row) => ({
      id: row.id,
      client_id: row.client_id,
      appointment_time: row.appointment_time as string,
    }));

    return NextResponse.json({
      hasConflict: rows.length > 0,
      conflictingRecords: rows,
    });
  } catch (err) {
    console.error("GET /api/records/conflict error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
