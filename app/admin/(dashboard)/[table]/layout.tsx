import { CmsPageProvider } from "@/components/admin/cms/cms-page-provider";
import styles from "@/components/admin/cms/cms-form.module.css";
import { getCmsTable } from "@/lib/admin/cms-tables";
import { getCachedSingletonRow } from "@/lib/cms/admin-cache";
import { getPageSectionsConfig } from "@/lib/cms/page-sections";

type AdminTableLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ table: string }>;
};

export default async function AdminTableLayout({ children, params }: AdminTableLayoutProps) {
  const { table: tableSlug } = await params;
  const config = getCmsTable(tableSlug);
  const pageConfig = getPageSectionsConfig(tableSlug);

  if (config?.kind === "singleton" && pageConfig) {
    const result = await getCachedSingletonRow(config.table);

    if (!result.ok) {
      return (
        <div className={styles.emptyState}>
          <p className={styles.title}>Could not load page</p>
          <p className={styles.lead}>{result.error}</p>
        </div>
      );
    }

    if (!result.data) {
      return (
        <div className={styles.emptyState}>
          <p className={styles.title}>Page not seeded</p>
          <p className={styles.lead}>
            Run <code>sql/all-pages.sql</code> in Supabase to seed this table.
          </p>
        </div>
      );
    }

    return (
      <CmsPageProvider apiPath={`/api/admin/${config.slug}`} initialData={result.data}>
        {children}
      </CmsPageProvider>
    );
  }

  return children;
}
