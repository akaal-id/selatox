"use client";

import type { PageSectionDef } from "@/lib/cms/page-sections";
import { CmsPillarPair } from "@/components/admin/cms/form-fields";
import { CmsModuleNote } from "@/components/admin/cms/rich-text-editor";
import { CmsFieldGrid } from "@/components/admin/cms/page-editors";
import { CmsEditorShell, useCmsPage } from "@/components/admin/cms/cms-page-provider";
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
