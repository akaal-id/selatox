import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "border" | "blur" | "simple";
export type ButtonTone = "default" | "light";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  /** Text/icon color preset for variant="blur" on dark vs light backgrounds */
  tone?: ButtonTone;
  size?: "sm" | "md" | "lg";
  /** Show arrow icon (no container) */
  showIcon?: boolean;
  /** Override background color (e.g. from parent) */
  backgroundColor?: string;
  /** Override text color (icon matches this) */
  color?: string;
  /** Fallback border color for border/blur when borderColor not set */
  iconColor?: string;
  /** Border color for variant="border" and variant="blur"; falls back to iconColor */
  borderColor?: string;
};

/**
 * Reusable Button — Global UI component. Colors adjustable via props from parent.
 * Use showIcon to show/hide arrow icon (no container). Variant "border" = no fill, 1px border.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      tone = "default",
      size = "md",
      showIcon = false,
      backgroundColor,
      color,
      iconColor,
      borderColor,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const isBorder = variant === "border";
    const isBlur = variant === "blur";
    const effectiveBorderColor = borderColor ?? iconColor ?? "currentColor";
    const toneClass = isBlur && tone === "light" ? styles.blurLight : "";

    const buttonStyle: React.CSSProperties = {
      ...(backgroundColor != null && { backgroundColor }),
      ...(color != null && { color }),
      ...(isBorder && {
        border: "1px solid",
        borderColor: effectiveBorderColor,
      }),
      ...style,
    };

    return (
      <button
        ref={ref}
        type="button"
        className={`${styles.button} ${styles[variant]} ${toneClass} ${styles[size]} ${className}`.trim()}
        style={buttonStyle}
        {...props}
      >
        {children != null && children !== "" ? (
          <span className={styles.textWrapper}>
            <span className={styles.textPrimary}>{children}</span>
            <span className={styles.textSecondary} aria-hidden>{children}</span>
          </span>
        ) : null}
        {showIcon && (
          <span className={styles.iconWrapper}>
            <ArrowRight size={16} className={styles.iconPrimary} aria-hidden />
            <ArrowRight size={16} className={styles.iconSecondary} aria-hidden />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
