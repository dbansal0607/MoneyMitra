import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0F1E",
        surface: "#111827",
        primary: "#00FF87",
        secondary: "#7C6BFF",
        error: "#FF4C4C",
        neutralText: "#E5E7EB",
        mutedText: "#6B7280",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-fira-code)'],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0,255,135,0.05)",
      }
    },
  },
  plugins: [],
};
export default config;
