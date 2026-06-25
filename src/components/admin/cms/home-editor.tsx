"use client";

import {
  getHomeCmsSection,
  type CmsFieldDef,
  type CmsSectionDef,
  type HomePageInput,
} from "@/lib/cms/home";
import { layoutFieldKeys } from "@/lib/cms/field-inference";
import {
  CmsInlinePair,
  CmsPillarPair,
  CmsStatPair,
  CmsTextareaField,
  CmsTextField,
} from "@/components/admin/cms/form-fields";
import { CmsModuleNote, CmsRichTextField } from "@/components/admin/cms/rich-text-editor";
import { CmsMediaField } from "@/components/admin/cms/media-field";
import { CmsEditorShell, useCmsPage } from "@/components/admin/cms/cms-page-provider";
import styles from "./cms-form.module.css";

function renderHomeField(
  field: CmsFieldDef,
  section: CmsSectionDef,
  form: Record<string, unknown>,
  setField: (key: string, value: unknown) => void
) {
  const value = String(form[field.key] ?? "");
  const onChange = (next: string) => setField(field.key, next);
  const wide =
    field.type === "textarea" ||
    field.type === "richtext" ||
    field.type === "image" ||
    field.type === "video" ||
    field.key.includes("headline");

  if (field.type === "image" || field.type === "video") {
    return (
      <CmsMediaField
        key={field.key}
        label={field.label}
        hint={field.hint}
        value={value}
        onChange={onChange}
        mediaType={field.type}
        uploadFolder={`home/${section.id}`}
        placeholder={field.placeholder}
      />
    );
  }

  if (field.type === "richtext") {
    return (
      <CmsRichTextField
        key={field.key}
        label={field.label}
        hint={field.hint}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <CmsTextareaField
        key={field.key}
        label={field.label}
        hint={field.hint}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        wide={wide}
      />
    );
  }

  return (
    <CmsTextField
      key={field.key}
      label={field.label}
      hint={field.hint}
      value={value}
      onChange={onChange}
      placeholder={field.placeholder}
      wide={wide}
    />
  );
}

function HomeSectionFields({ section }: { section: CmsSectionDef }) {
  const { form, setField } = useCmsPage();

  const fieldGrid =
    section.fields || section.stats ? (
      <div className={styles.fieldGrid}>
        {section.fields
          ? (() => {
              const fieldMap = Object.fromEntries(
                section.fields.map((field) => [field.key, field])
              );
              const layout = layoutFieldKeys(section.fields.map((field) => field.key));

              return layout.map((item) => {
                if (item.type === "pair") {
                  const rightField = fieldMap[item.rightKey];
                  return (
                    <CmsInlinePair
                      key={item.leftKey}
                      title={item.title}
                      rightLabel={item.rightLabel}
                      leftValue={String(form[item.leftKey] ?? "")}
                      rightValue={String(form[item.rightKey] ?? "")}
                      onLeftChange={(value) => setField(item.leftKey, value)}
                      onRightChange={(value) => setField(item.rightKey, value)}
                      rightInputType={rightField?.type === "url" ? "url" : "text"}
                    />
                  );
                }

                return renderHomeField(fieldMap[item.key], section, form, setField);
              });
            })()
          : null}

        {section.stats?.map((stat) => (
          <CmsStatPair
            key={stat.label}
            label={stat.label}
            statValue={String(form[stat.statKey] ?? "")}
            copyValue={String(form[stat.copyKey] ?? "")}
            onStatChange={(value) => setField(stat.statKey, value)}
            onCopyChange={(value) => setField(stat.copyKey, value)}
          />
        ))}
      </div>
    ) : null;

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

export function HomeSectionPage({ sectionId }: { sectionId: string }) {
  const section = getHomeCmsSection(sectionId);
  if (!section) return null;

  return (
    <CmsEditorShell
      description={section.description}
      showPublish={sectionId === "hero"}
    >
      <HomeSectionFields section={section} />
    </CmsEditorShell>
  );
}

/** @deprecated Use HomeSectionPage with layout provider. */
export function HomeSectionEditor({
  initialData: _initialData,
  sectionId,
}: {
  initialData: HomePageInput;
  sectionId: string;
}) {
  return <HomeSectionPage sectionId={sectionId} />;
}
