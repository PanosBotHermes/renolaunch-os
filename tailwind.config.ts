import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        reno: {
          bg: "var(--reno-bg)",
          surface: "var(--reno-surface)",
          card: "var(--reno-card)",
          cardHover: "var(--reno-card-hover)",
          border: "var(--reno-border)",
          borderAccent: "var(--reno-border-accent)",
          accent: "var(--reno-accent)",
          accent2: "var(--reno-accent-2)",
          success: "var(--reno-success)",
          warning: "var(--reno-warning)",
          error: "var(--reno-error)",
          info: "var(--reno-info)",
          glowAccent: "var(--reno-glow-accent)",
          glowSuccess: "var(--reno-glow-success)",
          text: {
            1: "var(--reno-text-1)",
            2: "var(--reno-text-2)",
            3: "var(--reno-text-3)",
            primary: "var(--reno-text-1)",
            secondary: "var(--reno-text-2)",
            muted: "var(--reno-text-3)",
          },
        },
      },
      borderRadius: {
        card: "12px",
        input: "10px",
        pill: "999px",
      },
      boxShadow: {
        glass:
          "0 1px 1px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      backgroundImage: {
        "reno-accent-gradient": "linear-gradient(135deg, #6366F1, #8B5CF6)",
      },
    },
  },
};

export default config;
