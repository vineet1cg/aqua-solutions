import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        carbon: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          850: "#1c1c1c",
          900: "#141414",
          950: "#0a0a0a",
        },
      },
      fontFamily: {
        sans: ["var(--font-hind)", "var(--font-inter)", "sans-serif"],
        display: ["var(--font-hind)", "sans-serif"],
        mono: ["var(--font-inter)", "monospace"],
      },
      borderRadius: {
        control: "8px",
        card: "12px",
        panel: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
