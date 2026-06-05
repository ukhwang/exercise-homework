import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseAdmin } from "@/shared/lib/supabase/admin";

const clientIdSchema = z.string().uuid();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = clientIdSchema.safeParse(searchParams.get("clientId"));

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid or missing clientId" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("records")
      .select("id, micro_hurdle_answer, completed_at")
      .eq("client_id", parsed.data)
      .not("micro_hurdle_answer", "is", null)
      .order("completed_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("recent feedback fetch failed:", error);
      return NextResponse.json(
        { error: "Failed to fetch feedback", message: error.message },
        { status: 500 }
      );
    }

    const items = (data ?? [])
      .filter((row) => row.micro_hurdle_answer)
      .map((row) => ({
        id: row.id,
        micro_hurdle_answer: row.micro_hurdle_answer as string,
        completed_at: row.completed_at,
      }));

    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/records/recent-feedback error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
