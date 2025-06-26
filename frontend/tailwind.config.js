/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      backgroundSize: {
        '200%': '200% 200%',
      },
      colors: {
        bg: "hsl(323 21% 16%)",
        neon: "hsl(317 100% 54%)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        zoomOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.8)" },
        },
         rainbow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        "fade-in-scale": "fadeIn 0.3s ease-out",
        "zoom-in-scale": "zoomIn 0.2s ease-out",
        "zoom-out-scale": "zoomOut 0.2s ease-out",
        rainbow: 'rainbow 8s ease infinite',
      },
    },
  },
  plugins: [typography],
};
