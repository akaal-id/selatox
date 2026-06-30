"use client";

import type { PageSectionDef } from "@/lib/cms/page-sections";
import { CmsPillarPair } from "@/components/admin/cms/form-fields";
import { CmsPublishToggle } from "@/components/admin/cms/form-fields";
import { CmsModuleNote } from "@/components/admin/cms/rich-text-editor";
import { CollectionList } from "@/components/admin/cms/collection-list";
import { CmsFieldGrid } from "@/components/admin/cms/page-editors";
import { CmsEditorShell, useCmsPage } from "@/components/admin/cms/cms-page-provider";
import { EditorHeader } from "@/components/admin/cms/editor-header";
import styles from "./cms-form.module.css";

function SectionFields({
  section,
  table,
}: {
  section: PageSectionDef;
  table: string;
}) {
  const { form, setField } = useCmsPage();

  const pillarGrid = section.pillars ? (
    <div className={styles.pillarGrid}>
      {section.pillars.map((pillar) => (
        <CmsPillarPair
          key={pillar.label}
          label={pillar.label}
          headlineValue={String(form[pillar.headlineKey] ?? "")}
          subValue={String(form[pillar.subKey] ?? "")}
          onHeadlineChange={(value) => setField(pillar.headlineKey, value)}
          onSubChange={(value) => setField(pillar.subKey, value)}
        />
      ))}
    </div>
  ) : null;

  const fieldGrid = section.keys?.length ? (
    <CmsFieldGrid
      keys={section.keys}
      form={form}
      setField={setField}
      uploadFolder={`${table}/${section.id}`}
    />
  ) : null;

  return (
    <>
      {section.linkedModule ? (
        <CmsModuleNote
          menuLabel={section.linkedModule.menuLabel}
          href={section.linkedModule.href}
          body={section.linkedModule.body}
        />
      ) : null}

      {section.pillarsFirst ? (
        <>
          {pillarGrid}
          {fieldGrid}
        </>
      ) : (
        <>
          {fieldGrid}
          {pillarGrid}
        </>
      )}
    </>
  );
}

export function SingletonSectionPage({
  table,
  section,
  showPublish = false,
}: {
  table: string;
  section: PageSectionDef;
  showPublish?: boolean;
}) {
  return (
    <CmsEditorShell description={section.description} showPublish={showPublish}>
      <SectionFields section={section} table={table} />
    </CmsEditorShell>
  );
}

type CombinedSectionPageProps = {
  table: string;
  section: PageSectionDef;
  showPublish?: boolean;
  collectionSlug: string;
  collectionLabel: string;
  collectionDescription: string;
  collectionRows: Record<string, unknown>[];
};

export function CombinedSectionPage({
  table,
  section,
  showPublish = false,
  collectionSlug,
  collectionLabel,
  collectionDescription,
  collectionRows,
}: CombinedSectionPageProps) {
  const { form, setField } = useCmsPage();
  const entryLabel = collectionRows.length === 1 ? "entry" : "entries";

  return (
    <div className={styles.editor}>
      <EditorHeader description={section.description} compact />

      <div className={styles.sectionCard}>
        <SectionFields section={section} table={table} />
      </div>

      <div className={styles.sectionCard}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Timeline entries</h2>
          <p className={styles.sectionDescription}>
            {collectionDescription} · {collectionRows.length} {entryLabel}
          </p>
        </div>
        <CollectionList
          embedded
          slug={collectionSlug}
          label={collectionLabel}
          description={collectionDescription}
          rows={collectionRows}
          adminBasePath={`/admin/${table}/${section.id}`}
        />
      </div>

      {showPublish && "is_published" in form ? (
        <CmsPublishToggle
          checked={Boolean(form.is_published)}
          onChange={(checked) => setField("is_published", checked)}
        />
      ) : null}
    </div>
  );
}
