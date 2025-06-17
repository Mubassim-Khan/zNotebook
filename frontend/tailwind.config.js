/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(323 21% 16%)",
        neon: "hsl(317 100% 54%)",
      },
    },
  },
  plugins: [],
};