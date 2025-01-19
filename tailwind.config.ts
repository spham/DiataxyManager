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
          primary: "#1d4ed8",
          secondary: "#4f46e5",
          accent: "#0ea5e9",
          neutral: "#374151",
          "base-100": "#f3f4f6",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#3b82f6",
          secondary: "#6366f1",
          accent: "#0ea5e9",
          neutral: "#374151",
          "base-100": "#1f2937",
        },
      },
    ],
  },
} satisfies Config;