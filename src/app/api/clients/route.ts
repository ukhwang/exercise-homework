import { NextResponse } from "next/server";
import { z } from "zod";

import { TRAINER_ID } from "@/shared/config/trainer";
import { createSupabaseAdmin } from "@/shared/lib/supabase/admin";

const createClientSchema = z.object({
  name: z.string().trim().min(1).max(80),
});

export async function GET() {
  try {
    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("clients")
      .select("id, name, created_at")
      .eq("trainer_id", TRAINER_ID)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("clients list failed:", error);
      return NextResponse.json(
        { error: "Failed to fetch clients", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      clients: (data ?? []).map((row) => ({
        id: row.id,
        name: row.name,
      })),
    });
  } catch (err) {
    console.error("GET /api/clients error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json: unknown = await request.json();
    const parsed = createClientSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("clients")
      .insert({
        trainer_id: TRAINER_ID,
        name: parsed.data.name,
      })
      .select("id, name")
      .single();

    if (error) {
      console.error("client insert failed:", error);
      return NextResponse.json(
        { error: "Failed to create client", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ client: data });
  } catch (err) {
    console.error("POST /api/clients error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
