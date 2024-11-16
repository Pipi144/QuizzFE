import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cardBgColor: "#1e272e",
      },
      fontFamily: {
        concert: ["Concert One", "sans-serif"],
        Gorditas: ["Gorditas", "serif"],
      },
      boxShadow: {
        navMenuShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        cardDarkShadow:
          "0px 10px 25px rgba(0, 0, 0, 0.6), 0px 4px 10px rgba(255, 255, 255, 0.05)",
        hoverCardDarkShadow:
          "0px 12px 30px rgba(0, 0, 0, 0.7), 0px 5px 12px rgba(255, 255, 255, 0.07)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "shiny-text": "shiny-text 8s infinite",
        gradient: "gradient 8s linear infinite",
      },
      keyframes: {
        "shiny-text": {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shiny-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shiny-width)) 0",
          },
        },
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
