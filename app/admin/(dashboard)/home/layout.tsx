import { CmsPageProvider } from "@/components/admin/cms/cms-page-provider";
import styles from "@/components/admin/cms/cms-form.module.css";
import { getCachedHomePage } from "@/lib/cms/admin-cache";

type AdminHomeLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminHomeLayout({ children }: AdminHomeLayoutProps) {
  const result = await getCachedHomePage();

  if (!result.ok) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.title}>Could not load home page</p>
        <p className={styles.lead}>{result.error}</p>
      </div>
    );
  }

  if (!result.data) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.title}>Home page not seeded</p>
        <p className={styles.lead}>
          Run <code>sql/home.sql</code> in Supabase to create and seed the home table.
        </p>
      </div>
    );
  }

  return (
    <CmsPageProvider apiPath="/api/admin/home" initialData={result.data}>
      {children}
    </CmsPageProvider>
  );
}
