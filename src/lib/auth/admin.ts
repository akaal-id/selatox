import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function requireAdminUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return {
    supabase,
    claims: data.claims,
    email: typeof data.claims.email === "string" ? data.claims.email : undefined,
  };
}
