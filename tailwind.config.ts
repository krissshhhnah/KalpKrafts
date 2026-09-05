import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:   "#1D222D",
        blue:  "#2687E8",
        sky:   "#65C4EC",
        cyan:  "#B9E7F1",
        coral: "#F05F62",
        cream: "#F3E7C7",
        page:  "#F5FBFD",
        soft:  "#EDF8FB",
        dark:  "#151A23",
        border:      "#D8EAF1",
        "border-strong": "#C1DDE8",
        secondary:   "#526579",
        muted:       "#8193A3",
      },
      fontFamily: {
        sans:    ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:    ["var(--font-dm-mono)", "DM Mono", "ui-monospace", "monospace"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "brand": "0 8px 24px rgba(38, 135, 232, 0.18)",
        "brand-lg": "0 16px 40px rgba(38, 135, 232, 0.22)",
        "ink": "0 4px 16px rgba(29, 34, 45, 0.08)",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
} satisfies Config;
