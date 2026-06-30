import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  AdminCard,
  AdminShell,
} from "@/components/admin/admin-ui";
import adminStyles from "@/components/admin/admin-ui.module.css";
import { CollectionList } from "@/components/admin/cms/collection-list";
import { CollectionRowEditor } from "@/components/admin/cms/page-editors";
import { SingletonSectionPage, CombinedSectionPage } from "@/components/admin/cms/singleton-section-editor";
import styles from "@/components/admin/cms/cms-form.module.css";
import { CMS_TABLES, getCmsTable } from "@/lib/admin/cms-tables";
import { getCachedCollectionRow, getCachedCmsTable } from "@/lib/cms/admin-cache";
import {
  getNestedCollectionBySegment,
  getPageDefaultAdminHref,
  getPageSection,
  getPageSectionsConfig,
  isCombinedPageSection,
  isPageSectionId,
  isStandaloneCollectionSlug,
} from "@/lib/cms/page-sections";

export const dynamicParams = true;

type AdminTableSegmentsPageProps = {
  params: Promise<{ table: string; segments?: string[] }>;
};

export async function generateStaticParams() {
  return CMS_TABLES.filter((table) => table.slug !== "home").map((table) => ({
    table: table.slug,
  }));
}

export default async function AdminTableSegmentsPage({ params }: AdminTableSegmentsPageProps) {
  const { table: tableSlug, segments } = await params;
  const config = getCmsTable(tableSlug);

  if (!config || tableSlug === "home") notFound();

  const segment = segments?.[0];
  const itemId = segments?.[1];

  if (!segment) {
    if (config.kind === "singleton") {
      const pageSections = getPageSectionsConfig(tableSlug);
      if (pageSections) {
        redirect(getPageDefaultAdminHref(tableSlug));
      }
    }

    if (config.kind === "collection" && !isStandaloneCollectionSlug(tableSlug)) {
      if (tableSlug === "roadmap") {
        redirect("/admin/about/roadmap");
      }
      notFound();
    }

    const result = await getCachedCmsTable(config);

    return (
      <>
        {!result.ok ? (
          <AdminShell title={config.label} description={config.description}>
            <AdminCard className={adminStyles.errorCard}>
              <p className={adminStyles.errorTitle}>Could not load entries</p>
              <p className="mt-2">{result.error}</p>
              <Link href="/admin" className={adminStyles.errorLink}>
                Back to dashboard
              </Link>
            </AdminCard>
          </AdminShell>
        ) : (
          <CollectionList
            slug={config.slug}
            label={config.label}
            description={config.description}
            rows={result.rows}
          />
        )}
      </>
    );
  }

  if (config.kind === "singleton") {
    if (itemId) {
      const nested = getNestedCollectionBySegment(tableSlug, segment);
      if (!nested?.collectionSlug) notFound();

      const collectionConfig = getCmsTable(nested.collectionSlug);
      if (!collectionConfig || collectionConfig.kind !== "collection") notFound();

      const decodedId = decodeURIComponent(itemId);
      const result = await getCachedCollectionRow(collectionConfig.table, decodedId);

      if (!result.ok) {
        return (
          <div className={styles.emptyState}>
            <p className={styles.title}>Could not load entry</p>
            <p className={styles.lead}>{result.error}</p>
            <Link href={`/admin/${tableSlug}/${segment}`}>Back to {collectionConfig.label}</Link>
          </div>
        );
      }

      if (!result.data) notFound();

      return (
        <CollectionRowEditor
          table={collectionConfig.slug}
          label={collectionConfig.label}
          rowId={decodedId}
          initialData={result.data}
          backHref={`/admin/${tableSlug}/${segment}`}
          backLabel={getPageSection(tableSlug, segment)?.title ?? collectionConfig.label}
        />
      );
    }

    if (!isPageSectionId(tableSlug, segment)) {
      if (segment === "milestones" && tableSlug === "about") {
        redirect("/admin/about/roadmap");
      }
      notFound();
    }

    const section = getPageSection(tableSlug, segment);
    if (!section) notFound();

    if (isCombinedPageSection(section)) {
      const collectionConfig = getCmsTable(section.collectionSlug!);
      if (!collectionConfig) notFound();

      const result = await getCachedCmsTable(collectionConfig);

      if (!result.ok) {
        return (
          <div className={styles.emptyState}>
            <p className={styles.title}>Could not load entries</p>
            <p className={styles.lead}>{result.error}</p>
          </div>
        );
      }

      const pageConfig = getPageSectionsConfig(tableSlug);

      return (
        <CombinedSectionPage
          table={config.slug}
          section={section}
          showPublish={segment === pageConfig?.defaultSectionId}
          collectionSlug={collectionConfig.slug}
          collectionLabel={collectionConfig.label}
          collectionDescription={collectionConfig.description ?? ""}
          collectionRows={result.rows}
        />
      );
    }

    const nestedCollection = getNestedCollectionBySegment(tableSlug, segment);
    if (nestedCollection?.collectionSlug) {
      const collectionConfig = getCmsTable(nestedCollection.collectionSlug);
      if (!collectionConfig) notFound();

      const result = await getCachedCmsTable(collectionConfig);

      if (!result.ok) {
        return (
          <div className={styles.emptyState}>
            <p className={styles.title}>Could not load entries</p>
            <p className={styles.lead}>{result.error}</p>
          </div>
        );
      }

      return (
        <CollectionList
          slug={collectionConfig.slug}
          label={collectionConfig.label}
          description={collectionConfig.description}
          rows={result.rows}
          adminBasePath={`/admin/${tableSlug}/${segment}`}
        />
      );
    }

    const pageConfig = getPageSectionsConfig(tableSlug);
    if (!pageConfig) notFound();

    return (
      <SingletonSectionPage
        table={config.slug}
        section={section}
        showPublish={segment === pageConfig.defaultSectionId}
      />
    );
  }

  if (config.kind === "collection") {
    if (segment === "roadmap" || segment === "milestones") {
      redirect("/admin/about/roadmap");
    }

    if (itemId) notFound();

    const decodedId = decodeURIComponent(segment);
    const result = await getCachedCollectionRow(config.table, decodedId);

    if (!result.ok) {
      return (
        <div className={styles.emptyState}>
          <p className={styles.title}>Could not load entry</p>
          <p className={styles.lead}>{result.error}</p>
          <Link href={`/admin/${tableSlug}`}>Back to {config.label}</Link>
        </div>
      );
    }

    if (!result.data) notFound();

    return (
      <CollectionRowEditor
        table={config.slug}
        label={config.label}
        rowId={decodedId}
        initialData={result.data}
      />
    );
  }

  notFound();
}
