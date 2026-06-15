"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./dateform.module.css";

export type DateFormVariant = "pill" | "footer";

export type DateFormProps = {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: DateFormVariant;
  disabled?: boolean;
  clearable?: boolean;
  min?: string;
  max?: string;
};

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function parseISODate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(value: string): string {
  const date = parseISODate(value);
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBefore(date: Date, min?: string): boolean {
  if (!min) return false;
  const minDate = parseISODate(min);
  return minDate ? date < minDate : false;
}

function isAfter(date: Date, max?: string): boolean {
  if (!max) return false;
  const maxDate = parseISODate(max);
  return maxDate ? date > maxDate : false;
}

function isDisabledDay(date: Date, min?: string, max?: string): boolean {
  return isBefore(date, min) || isAfter(date, max);
}

export function DateForm({
  id: idProp,
  label,
  value,
  onChange,
  placeholder = "Select date",
  className = "",
  variant = "pill",
  disabled = false,
  clearable = true,
  min,
  max,
}: DateFormProps) {
  const generatedId = useId();
  const triggerId = idProp ?? generatedId;
  const panelId = `${triggerId}-panel`;

  const rootRef = useRef<HTMLDivElement>(null);
  const selectedDate = parseISODate(value);
  const today = useMemo(() => new Date(), []);

  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(
    () => selectedDate ?? today
  );

  const displayLabel = value ? formatDisplayDate(value) : placeholder;

  const closePanel = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closePanel();
      }
    };

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, closePanel]);

  useEffect(() => {
    if (open) {
      setViewDate(selectedDate ?? today);
    }
  }, [open, selectedDate, today]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(viewDate);
    const startOffset = monthStart.getDay();
    const daysInMonth = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + 1,
      0
    ).getDate();

    const cells: Array<{ date: Date; inMonth: boolean }> = [];

    for (let i = 0; i < startOffset; i += 1) {
      const date = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        i - startOffset + 1
      );
      cells.push({ date, inMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({
        date: new Date(viewDate.getFullYear(), viewDate.getMonth(), day),
        inMonth: true,
      });
    }

    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1]?.date;
      const date = new Date(
        last.getFullYear(),
        last.getMonth(),
        last.getDate() + 1
      );
      cells.push({ date, inMonth: false });
    }

    return cells;
  }, [viewDate]);

  const handleSelectDate = (date: Date) => {
    if (isDisabledDay(date, min, max)) return;
    onChange(toISODate(date));
    closePanel();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      return;
    }

    if (event.key === "Escape") {
      closePanel();
    }
  };

  const rootClassName = [
    styles.root,
    styles[variant],
    open ? styles.open : "",
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={rootClassName}>
      {label ? (
        <label htmlFor={triggerId} className={styles.label}>
          {label}
        </label>
      ) : null}

      <div className={styles.control}>
        <button
          id={triggerId}
          type="button"
          className={styles.trigger}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={panelId}
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            setOpen((prev) => !prev);
          }}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className={styles.triggerContent}>
            <Calendar size={16} className={styles.calendarIcon} aria-hidden />
            <span
              className={`${styles.value} ${
                !value ? styles.placeholder : ""
              }`.trim()}
            >
              {displayLabel}
            </span>
          </span>
        </button>

        <div
          id={panelId}
          role="dialog"
          aria-label={label ?? "Choose date"}
          className={styles.panel}
          hidden={!open}
        >
          <div className={styles.panelHeader}>
            <button
              type="button"
              className={styles.navButton}
              aria-label="Previous month"
              onClick={() =>
                setViewDate(
                  (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                )
              }
            >
              <ChevronLeft size={16} aria-hidden />
            </button>

            <p className={styles.monthLabel}>
              {MONTH_LABELS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </p>

            <button
              type="button"
              className={styles.navButton}
              aria-label="Next month"
              onClick={() =>
                setViewDate(
                  (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                )
              }
            >
              <ChevronRight size={16} aria-hidden />
            </button>
          </div>

          <div className={styles.weekdays} aria-hidden>
            {WEEKDAY_LABELS.map((day) => (
              <span key={day} className={styles.weekday}>
                {day}
              </span>
            ))}
          </div>

          <div className={styles.dayGrid} role="grid">
            {calendarDays.map(({ date, inMonth }) => {
              const iso = toISODate(date);
              const selected = selectedDate ? isSameDay(date, selectedDate) : false;
              const isToday = isSameDay(date, today);
              const disabledDay = !inMonth || isDisabledDay(date, min, max);

              return (
                <button
                  key={iso}
                  type="button"
                  role="gridcell"
                  className={[
                    styles.dayButton,
                    !inMonth ? styles.dayOutside : "",
                    selected ? styles.daySelected : "",
                    isToday ? styles.dayToday : "",
                    disabledDay ? styles.dayDisabled : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={disabledDay}
                  aria-label={formatDisplayDate(iso)}
                  aria-selected={selected}
                  onClick={() => handleSelectDate(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {clearable && value ? (
            <div className={styles.panelFooter}>
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => {
                  onChange("");
                  closePanel();
                }}
              >
                Clear date
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
