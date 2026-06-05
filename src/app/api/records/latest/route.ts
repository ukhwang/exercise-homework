import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseAdmin } from "@/shared/lib/supabase/admin";

const clientIdSchema = z.string().uuid();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientIdRaw = searchParams.get("clientId");
    const parsed = clientIdSchema.safeParse(clientIdRaw);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid or missing clientId" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("records")
      .select("id, micro_hurdle_answer, completed_at, created_at")
      .eq("client_id", parsed.data)
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("latest completed record fetch failed:", error);
      return NextResponse.json(
        { error: "Failed to fetch record", message: error.message },
        { status: 500 }
      );
    }

    if (!data?.micro_hurdle_answer) {
      return NextResponse.json({ record: null });
    }

    return NextResponse.json({
      record: {
        id: data.id,
        micro_hurdle_answer: data.micro_hurdle_answer,
        completed_at: data.completed_at,
      },
    });
  } catch (err) {
    console.error("GET /api/records/latest error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
