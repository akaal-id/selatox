import type { Config } from "tailwindcss";

/**
 * PT. Selatox Bio Pharma — Tailwind CSS configuration.
 * Brand colors, Swiss-style spacing, glassmorphism shadows/blur.
 */
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "innovation-blue": "#4490E4",
        "safety-green": "#50B137",
        "selatox-dark": "#2E222E",
        "selatox-light": "#F5F5F5",
      },
      /* Swiss-style spacing scale (4px base, consistent rhythm) */
      spacing: {
        "0": "0",
        "1": "0.25rem",   /* 4px */
        "2": "0.5rem",    /* 8px */
        "3": "0.75rem",   /* 12px */
        "4": "1rem",      /* 16px */
        "5": "1.25rem",   /* 20px */
        "6": "1.5rem",    /* 24px */
        "8": "2rem",      /* 32px */
        "10": "2.5rem",   /* 40px */
        "12": "3rem",     /* 48px */
        "16": "4rem",     /* 64px */
        "20": "5rem",     /* 80px */
        "24": "6rem",     /* 96px */
        "32": "8rem",     /* 128px */
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(46, 34, 46, 0.08)",
        "glass-lg": "0 16px 48px rgba(46, 34, 46, 0.12)",
        "glass-strong": "0 24px 64px rgba(46, 34, 46, 0.16)",
        "inner-glass": "inset 0 2px 8px rgba(255, 255, 255, 0.06)",
      },
      backdropBlur: {
        "glass": "12px",
        "glass-lg": "20px",
        "glass-xl": "24px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
