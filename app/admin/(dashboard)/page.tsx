import Link from "next/link";
import {
  AdminBadge,
  AdminShell,
} from "@/components/admin/admin-ui";
import adminStyles from "@/components/admin/admin-ui.module.css";
import { getAdminHref, getCmsNavGroups } from "@/lib/admin/cms-nav";
import { CMS_TABLES } from "@/lib/admin/cms-tables";
import { fetchCmsTable } from "@/lib/admin/fetch-table";
import { getAdminClientMode } from "@/lib/supabase/admin";

export default async function AdminDashboardPage() {
  const clientMode = getAdminClientMode();
  const results = await Promise.all(
    CMS_TABLES.map(async (table) => {
      const result = await fetchCmsTable(table);
      return { table, result };
    })
  );

  const { other: otherTables } = getCmsNavGroups();
  const otherSlugs = new Set(otherTables.map((table) => table.slug));

  const pages = results.filter(
    (r) => r.table.kind === "singleton" && !otherSlugs.has(r.table.slug)
  );
  const other = results.filter((r) => otherSlugs.has(r.table.slug));

  return (
    <AdminShell
      title="Content"
      description="Manage page copy and collections."
      actions={
        clientMode === "service" ? (
          <AdminBadge tone="success">Service role</AdminBadge>
        ) : clientMode === "anon" ? (
          <AdminBadge tone="warning">Anon key (RLS applies)</AdminBadge>
        ) : (
          <AdminBadge tone="error">Not configured</AdminBadge>
        )
      }
    >
      {clientMode === "missing" ? (
        <div className={adminStyles.alertCard}>
          <p className={adminStyles.alertTitle}>Database configuration missing</p>
          <p className={adminStyles.alertBody}>
            Add these to <code className={adminStyles.alertCode}>.env.local</code>:
          </p>
          <pre className={adminStyles.alertPre}>
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SECRET_KEY=your-secret-key`}
          </pre>
        </div>
      ) : null}

      <section>
        <h2 className={adminStyles.sectionLabel}>Pages</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map(({ table, result }) => (
            <TableLinkCard
              key={table.slug}
              slug={table.slug}
              label={table.label}
              description={table.description}
              result={result}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className={adminStyles.sectionLabel}>Other</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {other.map(({ table, result }) => (
            <TableLinkCard
              key={table.slug}
              slug={table.slug}
              label={table.label}
              description={table.description}
              result={result}
            />
          ))}
        </div>
      </section>
    </AdminShell>
  );
}

function TableLinkCard({
  slug,
  label,
  description,
  result,
}: {
  slug: string;
  label: string;
  description: string;
  result: Awaited<ReturnType<typeof fetchCmsTable>>;
}) {
  const count = result.ok ? result.count : 0;
  const href = getAdminHref(slug);

  return (
    <Link href={href} className={adminStyles.cardLink}>
      <div className={adminStyles.cardLinkInner}>
        <div className={adminStyles.cardMeta}>
          <div>
            <h3 className={adminStyles.cardTitle}>{label}</h3>
            <p className={adminStyles.cardDescription}>{description}</p>
            <p className={adminStyles.cardSlug}>{slug}</p>
          </div>
          {result.ok ? (
            <AdminBadge>
              {count} row{count === 1 ? "" : "s"}
            </AdminBadge>
          ) : (
            <AdminBadge tone="error">Error</AdminBadge>
          )}
        </div>
        {!result.ok ? <p className={adminStyles.cardError}>{result.error}</p> : null}
      </div>
    </Link>
  );
}
