import { createAdminClient } from "@/lib/supabase/admin";
import type { CmsTableConfig } from "./cms-tables";

export type TableFetchResult =
  | { ok: true; rows: Record<string, unknown>[]; count: number }
  | { ok: false; error: string };

export async function fetchCmsTable(
  config: CmsTableConfig
): Promise<TableFetchResult> {
  const client = createAdminClient();
  if (!client) {
    return {
      ok: false,
      error:
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY) to .env.local.",
    };
  }

  let query = client.from(config.table).select("*", { count: "exact" });

  if (config.orderBy) {
    query = query.order(config.orderBy.column, {
      ascending: config.orderBy.ascending ?? true,
    });
  }

  const { data, error, count } = await query;

  if (error) {
    return { ok: false, error: error.message };
  }

  return {
    ok: true,
    rows: (data ?? []) as Record<string, unknown>[],
    count: count ?? data?.length ?? 0,
  };
}
