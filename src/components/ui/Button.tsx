import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "border" | "blur";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  /** Show arrow icon inside iconContainer (controllable from parent) */
  showIcon?: boolean;
  /** Override background color (e.g. from parent) */
  backgroundColor?: string;
  /** Override text color */
  color?: string;
  /** Arrow and icon container border color (border variant uses this for both containers) */
  iconColor?: string;
  /** Border color for variant="border" (main + icon container); falls back to iconColor */
  borderColor?: string;
};

/**
 * Reusable Button — Global UI component. Colors adjustable via props from parent.
 * Use showIcon to show/hide arrow in iconContainer. Variant "border" = no fill, 1px border.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
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
    const effectiveBorderColor = borderColor ?? iconColor ?? "currentColor";

    const buttonStyle: React.CSSProperties = {
      ...(backgroundColor != null && { backgroundColor }),
      ...(color != null && { color }),
      ...(isBorder && {
        border: "1px solid",
        borderColor: effectiveBorderColor,
      }),
      ...style,
    };

    const iconContainerStyle: React.CSSProperties =
      isBorder && effectiveBorderColor
        ? { border: "1px solid", borderColor: effectiveBorderColor }
        : {};

    const arrowColor = iconColor ?? (isBorder ? effectiveBorderColor : "currentColor");

    return (
      <button
        ref={ref}
        type="button"
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim()}
        style={buttonStyle}
        {...props}
      >
        {children != null && children !== "" ? (
          <span className={styles.buttonText}>{children}</span>
        ) : null}
        {showIcon && (
          <span
            className={styles.iconContainer}
            style={iconContainerStyle}
            aria-hidden
          >
            <ArrowRight size={16} style={{ color: arrowColor }} />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
