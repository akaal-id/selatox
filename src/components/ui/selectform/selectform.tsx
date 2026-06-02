"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import styles from "./selectform.module.css";

export type SelectFormOption = {
  label: string;
  value: string;
  href?: string;
  target?: "_blank" | "_self";
};

export type SelectFormVariant = "pill" | "footer";

export type SelectFormProps = {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectFormOption[];
  placeholder?: string;
  className?: string;
  variant?: SelectFormVariant;
  disabled?: boolean;
};

export function SelectForm({
  id: idProp,
  label,
  value,
  onChange,
  options,
  placeholder = "Select",
  className = "",
  variant = "pill",
  disabled = false,
}: SelectFormProps) {
  const generatedId = useId();
  const triggerId = idProp ?? generatedId;
  const listboxId = `${triggerId}-listbox`;

  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const selectedOption = options.find((option) => option.value === value);
  const displayLabel = selectedOption?.label ?? placeholder;

  const closeMenu = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const handleSelect = useCallback(
    (option: SelectFormOption) => {
      closeMenu();

      if (option.href) {
        window.open(option.href, option.target ?? "_blank", "noopener,noreferrer");
        return;
      }

      onChange(option.value);
    },
    [closeMenu, onChange]
  );

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, closeMenu]);

  useEffect(() => {
    if (!open) return;
    const selectedIndex = options.findIndex((option) => option.value === value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [open, options, value]);

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
      return;
    }

    if (event.key === "Escape") {
      closeMenu();
    }
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % options.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? options.length - 1 : prev - 1));
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) handleSelect(option);
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
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            setOpen((prev) => !prev);
          }}
          onKeyDown={handleTriggerKeyDown}
        >
          <span
            className={`${styles.value} ${
              !selectedOption ? styles.placeholder : ""
            }`.trim()}
          >
            {displayLabel}
          </span>
          <ChevronDown size={16} className={styles.chevron} aria-hidden />
        </button>

        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={label ? triggerId : undefined}
          aria-activedescendant={
            open && activeIndex >= 0
              ? `${listboxId}-option-${activeIndex}`
              : undefined
          }
          className={styles.menu}
          hidden={!open}
          onKeyDown={handleListKeyDown}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <li
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`${styles.option} ${
                  isActive ? styles.optionActive : ""
                } ${isSelected ? styles.optionSelected : ""}`.trim()}
              >
                <button
                  type="button"
                  className={styles.optionButton}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => handleSelect(option)}
                >
                  <span className={styles.optionLabel}>{option.label}</span>
                  {isSelected ? (
                    <Check size={14} strokeWidth={2} aria-hidden />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
