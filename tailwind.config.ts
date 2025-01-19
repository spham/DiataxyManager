import type { Config } from "tailwindcss";

export default {
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#2563eb",          // Blue-600
          "secondary": "#475569",        // Slate-600
          "accent": "#0ea5e9",          // Sky-500
          "neutral": "#1e293b",         // Slate-800
          "base-100": "#ffffff",        // White
          "base-200": "#f8fafc",        // Slate-50
          "base-300": "#f1f5f9",        // Slate-100
          "base-content": "#0f172a",    // Slate-900
          "info": "#3b82f6",           // Blue-500
          "success": "#22c55e",        // Green-500
          "warning": "#f59e0b",        // Amber-500
          "error": "#ef4444",          // Red-500
        }
      }
    ],
    darkTheme: "light", // This ensures we always use the light theme
  },
} satisfies Config;