"use client";

import {
  CheckCircle2,
  ChevronDown,
  EyeOff,
  Lock,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { DateForm } from "@/components/ui/dateform/dateform";
import { SelectForm } from "@/components/ui/selectform/selectform";
import {
  ethicsHotline,
  ethicsReportTypes,
  type EthicsReportFormData,
  type EthicsReportType,
} from "@/constants/ethics";
import { submitEthicsReport } from "@/lib/submit-ethics-report";
import styles from "./hotline.module.css";

const INITIAL_FORM: EthicsReportFormData = {
  reportType: "",
  subject: "",
  description: "",
  incidentDate: "",
  departmentOrIndividual: "",
  supportingDocument: null,
  reporterName: "",
  reporterEmail: "",
  anonymous: false,
};

type FormErrors = Partial<Record<keyof EthicsReportFormData | "supportingDocument", string>>;

const TRUST_CHIPS: ReadonlyArray<{ label: string; icon: LucideIcon }> = [
  { label: "Strict confidentiality", icon: Lock },
  { label: "Anonymous option", icon: EyeOff },
  { label: "Non-retaliation", icon: ShieldCheck },
];

function validateForm(data: EthicsReportFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.reportType) {
    errors.reportType = "Report type is required.";
  }

  if (!data.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!data.description.trim()) {
    errors.description = "Description is required.";
  } else if (data.description.length > ethicsHotline.maxDescriptionChars) {
    errors.description = `Description must be ${ethicsHotline.maxDescriptionChars} characters or fewer.`;
  }

  if (
    !data.anonymous &&
    data.reporterEmail.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.reporterEmail.trim())
  ) {
    errors.reporterEmail = "Enter a valid email address.";
  }

  if (data.supportingDocument) {
    const extension = data.supportingDocument.name
      .slice(data.supportingDocument.name.lastIndexOf("."))
      .toLowerCase();
    const validType =
      (ethicsHotline.acceptedDocumentTypes as readonly string[]).includes(
        data.supportingDocument.type
      ) ||
      (ethicsHotline.acceptedDocumentExtensions as readonly string[]).includes(
        extension
      );

    if (!validType) {
      errors.supportingDocument = "Upload a PDF, Word, Excel, or image file.";
    } else if (data.supportingDocument.size > ethicsHotline.maxDocumentBytes) {
      errors.supportingDocument = "File must be 20MB or smaller.";
    }
  }

  return errors;
}

type AccordionSectionProps = {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

function AccordionSection({
  id,
  index,
  title,
  children,
  defaultOpen = false,
}: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `hotline-panel-${id}`;
  const buttonId = `hotline-trigger-${id}`;

  return (
    <div
      className={`${styles.accordionItem} ${open ? styles.accordionItemOpen : ""}`.trim()}
    >
      <button
        id={buttonId}
        type="button"
        className={styles.accordionTrigger}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.accordionIndex}>{index}</span>
        <span className={styles.accordionTitle}>{title}</span>
        <span className={styles.accordionToggle} aria-hidden>
          <ChevronDown size={18} strokeWidth={1.75} className={styles.accordionIcon} />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={styles.accordionPanel}
      >
        <div className={styles.accordionPanelInner}>
          <div className={styles.accordionContent}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function EthicsHotline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [form, setForm] = useState<EthicsReportFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const maxIncidentDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateField = <K extends keyof EthicsReportFormData>(
    key: K,
    value: EthicsReportFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      if (key === "supportingDocument") delete next.supportingDocument;
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitEthicsReport(form);
      setSubmitted(true);
    } catch {
      setSubmitError(ethicsHotline.submitErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefillForm = () => {
    setForm(INITIAL_FORM);
    setSubmitted(false);
    setSubmitError(null);
    setErrors({});
    setFileInputKey((prev) => prev + 1);
  };

  return (
    <section
      ref={sectionRef}
      id="ethics-hotline"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="ethics-hotline-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.banner}>
          <header className={styles.bannerContent}>
            <p className={styles.eyebrow}>{ethicsHotline.eyebrow}</p>
            <h2 id="ethics-hotline-heading" className={styles.title}>
              {ethicsHotline.title}
            </h2>
            <p className={styles.intro}>{ethicsHotline.intro}</p>
            <ul className={styles.trustChips}>
              {TRUST_CHIPS.map(({ label, icon: Icon }) => (
                <li key={label} className={styles.trustChip}>
                  <Icon size={15} strokeWidth={1.75} aria-hidden />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className={styles.bannerEmblem} aria-hidden>
            <span className={styles.emblemRing} />
            <span className={styles.emblemRingInner} />
            <ShieldCheck size={56} strokeWidth={1.1} />
          </div>
        </div>

        <div className={styles.infoPanel}>
          <AccordionSection
            id="reportable"
            index="01"
            title={ethicsHotline.reportableTitle}
            defaultOpen
          >
            <ul className={styles.contentList}>
              {ethicsHotline.reportableItems.map((item, itemIndex) => (
                <li key={item.id} className={styles.contentItem}>
                  <span className={styles.contentItemIndex} aria-hidden>
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.contentItemBodyWrap}>
                    <h4 className={styles.contentItemTitle}>{item.title}</h4>
                    <p className={styles.contentItemText}>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </AccordionSection>

          <AccordionSection
            id="protection"
            index="02"
            title={ethicsHotline.protectionTitle}
          >
            <p className={styles.contentIntro}>{ethicsHotline.protectionIntro}</p>
            <div className={styles.contentGrid}>
              {ethicsHotline.protectionCards.map((card) => (
                <article key={card.id} className={styles.contentCard}>
                  <h4 className={styles.contentCardTitle}>{card.title}</h4>
                  <p className={styles.contentCardText}>{card.description}</p>
                </article>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            id="guidelines"
            index="03"
            title={ethicsHotline.guidelinesTitle}
          >
            <p className={styles.contentIntro}>{ethicsHotline.guidelinesIntro}</p>
            <ul className={styles.guidelineList}>
              {ethicsHotline.guidelines.map((item, itemIndex) => (
                <li key={item} className={styles.guidelineItem}>
                  <span className={styles.guidelineStep} aria-hidden>
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.guidelineText}>{item}</span>
                </li>
              ))}
            </ul>
            <p className={styles.contentNote}>{ethicsHotline.guidelinesNote}</p>
          </AccordionSection>
        </div>

        <div id="submit-report" className={styles.formSection}>
          <div className={styles.formShell}>
            <h3 className={styles.formShellTitle}>{ethicsHotline.formTitle}</h3>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.field}>
                  <SelectForm
                    id="ethics-report-type"
                    label="Report Type *"
                    value={form.reportType}
                    onChange={(value) =>
                      updateField("reportType", value as EthicsReportType)
                    }
                    options={ethicsReportTypes.map((option) => ({
                      label: option,
                      value: option,
                    }))}
                    placeholder="Select report type"
                    variant="footer"
                    className={styles.selectField}
                  />
                  {errors.reportType ? (
                    <p className={styles.error}>{errors.reportType}</p>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="ethics-subject">
                    Subject <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="ethics-subject"
                    type="text"
                    className={styles.input}
                    value={form.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                  />
                  {errors.subject ? (
                    <p className={styles.error}>{errors.subject}</p>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="ethics-description">
                    Description <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="ethics-description"
                    className={styles.textarea}
                    value={form.description}
                    maxLength={ethicsHotline.maxDescriptionChars}
                    rows={5}
                    onChange={(e) => updateField("description", e.target.value)}
                  />
                  <p className={styles.counter}>
                    {form.description.length}/{ethicsHotline.maxDescriptionChars}
                  </p>
                  {errors.description ? (
                    <p className={styles.error}>{errors.description}</p>
                  ) : null}
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <DateForm
                      id="ethics-incident-date"
                      label="Date of Incident"
                      value={form.incidentDate}
                      onChange={(value) => updateField("incidentDate", value)}
                      placeholder="Select date"
                      variant="footer"
                      className={styles.selectField}
                      clearable
                      max={maxIncidentDate}
                    />
                  </div>

                  <div className={styles.field}>
                    <label
                      className={styles.label}
                      htmlFor="ethics-department-individual"
                    >
                      Department / Individual Involved
                    </label>
                    <input
                      id="ethics-department-individual"
                      type="text"
                      className={styles.input}
                      value={form.departmentOrIndividual}
                      onChange={(e) =>
                        updateField("departmentOrIndividual", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="ethics-document">
                    Supporting Documents (Optional)
                  </label>
                  <input
                    id="ethics-document"
                    key={fileInputKey}
                    type="file"
                    className={styles.fileInput}
                    accept=".pdf,.doc,.docx,.xlsx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpeg,image/png"
                    onChange={(e) =>
                      updateField("supportingDocument", e.target.files?.[0] ?? null)
                    }
                  />
                  <p className={styles.hint}>{ethicsHotline.documentHint}</p>
                  {errors.supportingDocument ? (
                    <p className={styles.error}>{errors.supportingDocument}</p>
                  ) : null}
                </div>

                <fieldset
                  className={styles.reporterFieldset}
                  aria-label="Reporter information"
                >
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="ethics-reporter-name">
                        Name (Optional)
                      </label>
                      <input
                        id="ethics-reporter-name"
                        type="text"
                        className={styles.input}
                        value={form.reporterName}
                        onChange={(e) =>
                          updateField("reporterName", e.target.value)
                        }
                        autoComplete="name"
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="ethics-reporter-email">
                        Email Address (Optional)
                      </label>
                      <input
                        id="ethics-reporter-email"
                        type="email"
                        className={styles.input}
                        value={form.reporterEmail}
                        onChange={(e) =>
                          updateField("reporterEmail", e.target.value)
                        }
                        autoComplete="email"
                      />
                      {errors.reporterEmail ? (
                        <p className={styles.error}>{errors.reporterEmail}</p>
                      ) : null}
                    </div>
                  </div>

                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={form.anonymous}
                      onChange={(e) => updateField("anonymous", e.target.checked)}
                    />
                    <span className={styles.checkboxMark} aria-hidden />
                    <span className={styles.checkboxText}>
                      <span className={styles.checkboxTitle}>Anonymous Submission</span>
                      <span className={styles.checkboxHint}>
                        {ethicsHotline.anonymousCheckboxHint}
                      </span>
                    </span>
                  </label>
                </fieldset>

                <div className={styles.submitWrap}>
                  {submitted ? (
                    <div className={styles.successInline} role="status">
                      <span className={styles.successIcon} aria-hidden>
                        <CheckCircle2 size={28} strokeWidth={1.5} />
                      </span>
                      <div className={styles.successInlineBody}>
                        <h4 className={styles.successTitle}>{ethicsHotline.successTitle}</h4>
                        <p className={styles.successMessage}>{ethicsHotline.successMessage}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {submitError ? (
                        <p className={styles.error}>{submitError}</p>
                      ) : null}
                      <Button
                        type="submit"
                        variant="primary"
                        backgroundColor="var(--green-120)"
                        color="var(--neutral-0)"
                        showIcon
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? form.supportingDocument
                            ? ethicsHotline.submittingWithDocumentLabel
                            : ethicsHotline.submittingLabel
                          : ethicsHotline.submitLabel}
                      </Button>
                    </>
                  )}
                </div>

                {submitted ? (
                  <div className={styles.refillWrap}>
                    <button
                      type="button"
                      className={styles.refillButton}
                      onClick={handleRefillForm}
                    >
                      {ethicsHotline.refillFormLabel}
                    </button>
                  </div>
                ) : null}
              </form>
          </div>
        </div>
      </div>
    </section>
  );
}
