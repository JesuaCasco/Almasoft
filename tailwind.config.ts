import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        alma: {
          blue: "#0071BC",
          dark: "#005B98",
          light: "#EAF5FC",
          ink: "#061B2A",
          soft: "#102B3D",
          line: "#DDE6EB",
        },
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "Inter", "sans-serif"],
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(6, 27, 42, 0.08)",
      },
    },
  },
  plugins: [forms],
};

export default config;
