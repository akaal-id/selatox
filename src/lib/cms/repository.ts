import { createAdminClient } from "@/lib/supabase/admin";
import { createPublicClient } from "@/lib/supabase/public";
import { getRichTextKeys, sanitizeRecord } from "@/lib/cms/sanitize-record";
import type { CmsTableConfig } from "@/lib/admin/cms-tables";

export type CmsResult<T> = { ok: true; data: T } | { ok: false; error: string };

function adminClient() {
  const client = createAdminClient();
  if (!client) {
    return {
      ok: false as const,
      error:
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY) to .env.local.",
    };
  }
  return { ok: true as const, client };
}

export async function getSingletonRow(
  table: string
): Promise<CmsResult<Record<string, unknown> | null>> {
  const result = adminClient();
  if (!result.ok) return result;

  const { data, error } = await result.client
    .from(table)
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) return { ok: false, error: error.message };
  return { ok: true, data: (data as Record<string, unknown> | null) ?? null };
}

export async function updateSingletonRow(
  table: string,
  input: Record<string, unknown>
): Promise<CmsResult<Record<string, unknown>>> {
  const result = adminClient();
  if (!result.ok) return result;

  const richKeys = getRichTextKeys(Object.keys(input));
  const payload = {
    ...sanitizeRecord(input, richKeys),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await result.client
    .from(table)
    .update(payload)
    .eq("id", 1)
    .select("*")
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, data: data as Record<string, unknown> };
}

export async function getCollectionRows(
  config: CmsTableConfig
): Promise<CmsResult<Record<string, unknown>[]>> {
  const result = adminClient();
  if (!result.ok) return result;

  let query = result.client.from(config.table).select("*");
  if (config.orderBy) {
    query = query.order(config.orderBy.column, {
      ascending: config.orderBy.ascending ?? true,
    });
  }

  const { data, error } = await query;
  if (error) return { ok: false, error: error.message };
  return { ok: true, data: (data ?? []) as Record<string, unknown>[] };
}

export async function getCollectionRow(
  table: string,
  id: string
): Promise<CmsResult<Record<string, unknown> | null>> {
  const result = adminClient();
  if (!result.ok) return result;

  const { data, error } = await result.client.from(table).select("*").eq("id", id).maybeSingle();
  if (error) return { ok: false, error: error.message };
  return { ok: true, data: (data as Record<string, unknown> | null) ?? null };
}

export async function updateCollectionRow(
  table: string,
  id: string,
  input: Record<string, unknown>
): Promise<CmsResult<Record<string, unknown>>> {
  const result = adminClient();
  if (!result.ok) return result;

  const richKeys = getRichTextKeys(Object.keys(input));
  const payload = {
    ...sanitizeRecord(input, richKeys),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await result.client
    .from(table)
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, data: data as Record<string, unknown> };
}

export async function deleteCollectionRow(
  table: string,
  id: string
): Promise<CmsResult<null>> {
  const result = adminClient();
  if (!result.ok) return result;

  const { error } = await result.client.from(table).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true, data: null };
}

export async function fetchPublicSingleton(
  table: string
): Promise<Record<string, unknown> | null> {
  const client = createPublicClient();
  if (!client) return null;

  const { data } = await client.from(table).select("*").eq("id", 1).maybeSingle();
  return (data as Record<string, unknown> | null) ?? null;
}

export async function fetchPublicCollection(
  table: string,
  options?: {
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    filters?: Record<string, unknown>;
  }
): Promise<Record<string, unknown>[]> {
  const client = createPublicClient();
  if (!client) return [];

  let query = client.from(table).select("*");

  if (options?.filters) {
    for (const [key, value] of Object.entries(options.filters)) {
      query = query.eq(key, value);
    }
  }

  if (options?.orderBy) {
    query = query.order(options.orderBy.column, {
      ascending: options.orderBy.ascending ?? true,
    });
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data } = await query;
  return (data ?? []) as Record<string, unknown>[];
}
