import { forwardRef } from "react";
import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

/**
 * Reusable Button — Global UI component for PT. Selatox Bio Pharma.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim()}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
