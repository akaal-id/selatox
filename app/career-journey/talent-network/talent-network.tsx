"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { SelectForm } from "@/components/ui/selectform/selectform";
import {
  talentNetwork,
  talentNetworkAreas,
  talentNetworkExperienceOptions,
  type TalentNetworkArea,
  type TalentNetworkExperience,
  type TalentNetworkFormData,
} from "@/constants/career-journey";
import styles from "./talent-network.module.css";

const INITIAL_FORM: TalentNetworkFormData = {
  fullName: "",
  email: "",
  phone: "",
  nationality: "",
  areasOfInterest: [],
  yearsOfExperience: "",
  resume: null,
  linkedIn: "",
  message: "",
};

type FormErrors = Partial<Record<keyof TalentNetworkFormData | "resume", string>>;

function validateForm(data: TalentNetworkFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.nationality.trim()) {
    errors.nationality = "Nationality is required.";
  }

  if (data.areasOfInterest.length === 0) {
    errors.areasOfInterest = "Select at least one area of interest.";
  }

  if (!data.yearsOfExperience) {
    errors.yearsOfExperience = "Years of experience is required.";
  }

  if (!data.resume) {
    errors.resume = "Resume / CV is required.";
  } else {
    const extension = data.resume.name
      .slice(data.resume.name.lastIndexOf("."))
      .toLowerCase();
    const validType =
      (talentNetwork.acceptedResumeTypes as readonly string[]).includes(
        data.resume.type
      ) ||
      (talentNetwork.acceptedResumeExtensions as readonly string[]).includes(
        extension
      );

    if (!validType) {
      errors.resume = "Upload a PDF or Word document (.pdf, .doc, .docx).";
    } else if (data.resume.size > talentNetwork.maxResumeBytes) {
      errors.resume = "File must be 5MB or smaller.";
    }
  }

  if (data.linkedIn.trim() && !/^https?:\/\/.+/i.test(data.linkedIn.trim())) {
    errors.linkedIn = "Enter a valid URL starting with http:// or https://.";
  }

  if (data.message.length > talentNetwork.maxNoteChars) {
    errors.message = `Message must be ${talentNetwork.maxNoteChars} characters or fewer.`;
  }

  return errors;
}

export function TalentNetwork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [form, setForm] = useState<TalentNetworkFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateField = <K extends keyof TalentNetworkFormData>(
    key: K,
    value: TalentNetworkFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      if (key === "resume") delete next.resume;
      return next;
    });
  };

  const toggleArea = (area: TalentNetworkArea) => {
    setForm((prev) => {
      const exists = prev.areasOfInterest.includes(area);
      return {
        ...prev,
        areasOfInterest: exists
          ? prev.areasOfInterest.filter((item) => item !== area)
          : [...prev.areasOfInterest, area],
      };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.areasOfInterest;
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

  return (
    <section
      ref={sectionRef}
      id="talent-network"
      className={`${styles.section} ${isInView ? styles.inView : ""}`.trim()}
      aria-labelledby="talent-network-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <div className={styles.layout}>
          <header className={styles.cta}>
            <p className={styles.eyebrow} aria-hidden>
              {talentNetwork.eyebrow}
            </p>
            <h2 id="talent-network-heading" className={styles.title}>
              {talentNetwork.title}
            </h2>
            <p className={styles.subtitle}>{talentNetwork.subtitle}</p>
          </header>

          <div className={styles.formShell}>
            {submitted ? (
              <div className={styles.success} role="status">
                <span className={styles.successIcon} aria-hidden>
                  <CheckCircle2 size={32} strokeWidth={1.5} />
                </span>
                <h3 className={styles.successTitle}>
                  {talentNetwork.successTitle}
                </h3>
                <p className={styles.successMessage}>
                  {talentNetwork.successMessage}
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="talent-full-name">
                      Full Name <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="talent-full-name"
                      type="text"
                      className={styles.input}
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      autoComplete="name"
                    />
                    {errors.fullName ? (
                      <p className={styles.error}>{errors.fullName}</p>
                    ) : null}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="talent-email">
                      Email <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="talent-email"
                      type="email"
                      className={styles.input}
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      autoComplete="email"
                    />
                    {errors.email ? (
                      <p className={styles.error}>{errors.email}</p>
                    ) : null}
                  </div>
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="talent-phone">
                      Phone
                    </label>
                    <input
                      id="talent-phone"
                      type="tel"
                      className={styles.input}
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      autoComplete="tel"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="talent-nationality">
                      Nationality <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="talent-nationality"
                      type="text"
                      className={styles.input}
                      value={form.nationality}
                      onChange={(e) =>
                        updateField("nationality", e.target.value)
                      }
                      autoComplete="country-name"
                    />
                    {errors.nationality ? (
                      <p className={styles.error}>{errors.nationality}</p>
                    ) : null}
                  </div>
                </div>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.label}>
                    Area of Interest <span className={styles.required}>*</span>
                  </legend>
                  <div className={styles.chipGrid}>
                    {talentNetworkAreas.map((area) => {
                      const active = form.areasOfInterest.includes(area);
                      return (
                        <button
                          key={area}
                          type="button"
                          className={`${styles.chip} ${active ? styles.chipActive : ""}`.trim()}
                          aria-pressed={active}
                          onClick={() => toggleArea(area)}
                        >
                          {area}
                        </button>
                      );
                    })}
                  </div>
                  {errors.areasOfInterest ? (
                    <p className={styles.error}>{errors.areasOfInterest}</p>
                  ) : null}
                </fieldset>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <SelectForm
                      id="talent-experience"
                      label="Years of Experience *"
                      value={form.yearsOfExperience}
                      onChange={(value) =>
                        updateField(
                          "yearsOfExperience",
                          value as TalentNetworkExperience
                        )
                      }
                      options={talentNetworkExperienceOptions.map((option) => ({
                        label: option,
                        value: option,
                      }))}
                      placeholder="Select experience"
                      variant="footer"
                      className={styles.selectField}
                    />
                    {errors.yearsOfExperience ? (
                      <p className={styles.error}>{errors.yearsOfExperience}</p>
                    ) : null}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="talent-resume">
                      Resume / CV <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="talent-resume"
                      type="file"
                      className={styles.fileInput}
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) =>
                        updateField("resume", e.target.files?.[0] ?? null)
                      }
                    />
                    <p className={styles.hint}>PDF or Word, max 5MB</p>
                    {errors.resume ? (
                      <p className={styles.error}>{errors.resume}</p>
                    ) : null}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="talent-linkedin">
                    LinkedIn Profile URL
                  </label>
                  <input
                    id="talent-linkedin"
                    type="url"
                    className={styles.input}
                    value={form.linkedIn}
                    onChange={(e) => updateField("linkedIn", e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                  {errors.linkedIn ? (
                    <p className={styles.error}>{errors.linkedIn}</p>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="talent-message">
                    Message / Cover note
                  </label>
                  <textarea
                    id="talent-message"
                    className={styles.textarea}
                    value={form.message}
                    maxLength={talentNetwork.maxNoteChars}
                    rows={4}
                    onChange={(e) => updateField("message", e.target.value)}
                  />
                  <p className={styles.counter}>
                    {form.message.length}/{talentNetwork.maxNoteChars}
                  </p>
                  {errors.message ? (
                    <p className={styles.error}>{errors.message}</p>
                  ) : null}
                </div>

                <div className={styles.submitWrap}>
                  <Button
                    type="submit"
                    variant="primary"
                    backgroundColor="var(--green-120)"
                    color="var(--neutral-0)"
                    showIcon
                  >
                    {talentNetwork.submitLabel}
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
