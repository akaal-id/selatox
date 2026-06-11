"use client";

import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckCircle2,
  Lock,
  MessageSquareWarning,
  Shield,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { SelectForm } from "@/components/ui/selectform/selectform";
import {
  ethicsHotline,
  ethicsReportTypes,
  type EthicsReportFormData,
  type EthicsReportType,
} from "@/constants/ethics";
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

const REPORTABLE_ICONS: Record<
  (typeof ethicsHotline.reportableItems)[number]["id"],
  typeof Shield
> = {
  "business-ethics": BriefcaseBusiness,
  corruption: AlertTriangle,
  workplace: MessageSquareWarning,
  "information-security": Lock,
  compliance: Shield,
};

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
      errors.supportingDocument = "Upload a PDF, Word document, or image file.";
    } else if (data.supportingDocument.size > ethicsHotline.maxDocumentBytes) {
      errors.supportingDocument = "File must be 5MB or smaller.";
    }
  }

  return errors;
}

export function EthicsHotline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [form, setForm] = useState<EthicsReportFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setSubmitted(true);
  };

  const scrollToForm = () => {
    document.getElementById("submit-report")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
            <Button
              type="button"
              variant="primary"
              backgroundColor="var(--blue-120)"
              color="var(--neutral-0)"
              showIcon
              onClick={scrollToForm}
            >
              {ethicsHotline.ctaLabel}
            </Button>
          </header>
        </div>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>{ethicsHotline.reportableTitle}</h3>
          <ul className={styles.reportableGrid}>
            {ethicsHotline.reportableItems.map((item, index) => {
              const Icon = REPORTABLE_ICONS[item.id];

              return (
                <li
                  key={item.id}
                  className={styles.reportableCard}
                  style={{ ["--delay" as string]: `${0.15 + index * 0.08}s` }}
                >
                  <span className={styles.reportableIcon} aria-hidden>
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <h4 className={styles.reportableTitle}>{item.title}</h4>
                  <p className={styles.reportableBody}>{item.description}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>{ethicsHotline.protectionTitle}</h3>
          <p className={styles.subsectionIntro}>{ethicsHotline.protectionIntro}</p>
          <div className={styles.protectionGrid}>
            {ethicsHotline.protectionCards.map((card) => (
              <article key={card.id} className={styles.protectionCard}>
                <h4 className={styles.protectionTitle}>{card.title}</h4>
                <p className={styles.protectionBody}>{card.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>{ethicsHotline.guidelinesTitle}</h3>
          <p className={styles.subsectionIntro}>{ethicsHotline.guidelinesIntro}</p>
          <ol className={styles.guidelinesList}>
            {ethicsHotline.guidelines.map((item, index) => (
              <li key={item} className={styles.guidelineItem}>
                <span className={styles.guidelineStep} aria-hidden>
                  {index + 1}
                </span>
                <span className={styles.guidelineText}>{item}</span>
              </li>
            ))}
          </ol>
          <p className={styles.guidelinesNote}>{ethicsHotline.guidelinesNote}</p>
        </div>

        <div id="submit-report" className={styles.formSection}>
          <header className={styles.formHeader}>
            <h3 className={styles.formTitle}>{ethicsHotline.formTitle}</h3>
            <p className={styles.formIntro}>{ethicsHotline.formIntro}</p>
          </header>

          <div className={styles.formShell}>
            {submitted ? (
              <div className={styles.success} role="status">
                <span className={styles.successIcon} aria-hidden>
                  <CheckCircle2 size={32} strokeWidth={1.5} />
                </span>
                <h4 className={styles.successTitle}>{ethicsHotline.successTitle}</h4>
                <p className={styles.successMessage}>{ethicsHotline.successMessage}</p>
              </div>
            ) : (
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
                    <label className={styles.label} htmlFor="ethics-incident-date">
                      Date of Incident
                    </label>
                    <input
                      id="ethics-incident-date"
                      type="date"
                      className={styles.input}
                      value={form.incidentDate}
                      onChange={(e) =>
                        updateField("incidentDate", e.target.value)
                      }
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
                    type="file"
                    className={styles.fileInput}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
                    onChange={(e) =>
                      updateField("supportingDocument", e.target.files?.[0] ?? null)
                    }
                  />
                  <p className={styles.hint}>PDF, Word, or image files, max 5MB</p>
                  {errors.supportingDocument ? (
                    <p className={styles.error}>{errors.supportingDocument}</p>
                  ) : null}
                </div>

                <fieldset className={styles.reporterFieldset}>
                  <legend className={styles.fieldsetLegend}>Reporter Information</legend>

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
                        disabled={form.anonymous}
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
                        disabled={form.anonymous}
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
                      className={styles.checkbox}
                      checked={form.anonymous}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setForm((prev) => ({
                          ...prev,
                          anonymous: checked,
                          reporterName: checked ? "" : prev.reporterName,
                          reporterEmail: checked ? "" : prev.reporterEmail,
                        }));
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.reporterName;
                          delete next.reporterEmail;
                          return next;
                        });
                      }}
                    />
                    <span>Anonymous Submission</span>
                  </label>
                </fieldset>

                <div className={styles.submitWrap}>
                  <Button
                    type="submit"
                    variant="primary"
                    backgroundColor="var(--green-120)"
                    color="var(--neutral-0)"
                    showIcon
                  >
                    {ethicsHotline.submitLabel}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
