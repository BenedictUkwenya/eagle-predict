import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-be-vietnam)", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        green: {
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        eaglelight: {
          primary: "#2563eb",
          "primary-content": "#ffffff",
          secondary: "#16a34a",
          "secondary-content": "#ffffff",
          accent: "#f59e0b",
          "accent-content": "#ffffff",
          neutral: "#1f2937",
          "neutral-content": "#f9fafb",
          "base-100": "#ffffff",
          "base-200": "#f3f4f6",
          "base-300": "#e5e7eb",
          "base-content": "#111827",
          info: "#3b82f6",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
        eagledark: {
          primary: "#3b82f6",
          "primary-content": "#ffffff",
          secondary: "#22c55e",
          "secondary-content": "#ffffff",
          accent: "#f59e0b",
          "accent-content": "#000000",
          neutral: "#374151",
          "neutral-content": "#f9fafb",
          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-300": "#374151",
          "base-content": "#f9fafb",
          info: "#60a5fa",
          success: "#4ade80",
          warning: "#fbbf24",
          error: "#f87171",
        },
      },
    ],
    defaultTheme: "eaglelight",
  },
};

export default config;
