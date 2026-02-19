import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        reno: {
          bg: "#080C14",
          card: "#0F1623",
          border: "#1E2D45",
          accent: "#6366F1",
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
          text: {
            primary: "#F1F5F9",
            secondary: "#94A3B8",
          },
        },
      },
      borderRadius: {
        card: "8px",
        input: "6px",
      },
    },
  },
};

export default config;
