import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        alert: "var(--color-alert)",
        success: "var(--color-success)",
        surface: "var(--color-surface)",
        brutal: {
          black: "#000000",
          white: "#ffffff",
          neon: "#ccff00",
          yellow: "#ffff00",
          gray: "#cccccc",
        },
      },
      spacing: {
        "14": "56px",
        "16": "64px",
      },
      fontSize: {
        h1: ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["20px", { lineHeight: "1.3", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
};

export default config;
