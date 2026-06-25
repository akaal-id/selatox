import { createAdminClient } from "@/lib/supabase/admin";
import {
  HOME_RICH_TEXT_FIELDS,
  sanitizeRichText,
} from "@/lib/cms/sanitize";
import type { HomePageInput, HomePageRow } from "@/lib/cms/home";

export type HomeRepositoryResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function sanitizeHomeInput(input: HomePageInput): HomePageInput {
  const next = { ...input };

  for (const key of HOME_RICH_TEXT_FIELDS) {
    const value = next[key];
    if (typeof value === "string") {
      Object.assign(next, { [key]: sanitizeRichText(value) });
    }
  }

  return next;
}

export async function getHomePage(): Promise<HomeRepositoryResult<HomePageRow | null>> {
  const client = createAdminClient();
  if (!client) {
    return { ok: false, error: "Supabase is not configured." };
  }

  const { data, error } = await client.from("home").select("*").eq("id", 1).maybeSingle();

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data: (data as HomePageRow | null) ?? null };
}

export async function updateHomePage(
  input: HomePageInput
): Promise<HomeRepositoryResult<HomePageRow>> {
  const client = createAdminClient();
  if (!client) {
    return { ok: false, error: "Supabase is not configured." };
  }

  const payload = {
    ...sanitizeHomeInput(input),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from("home")
    .update(payload)
    .eq("id", 1)
    .select("*")
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data: data as HomePageRow };
}
