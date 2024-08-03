import type { Config } from "tailwindcss";
import animations from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  plugins: [animations],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 1s ease",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
    screens: {
      "s-1440px": { max: "1440px" },
      "s-1320px": { max: "1320px" },
      "s-1200px": { max: "1200px" },
      "s-1080px": { max: "1080px" },
      "s-960px": { max: "960px" },
      "s-840px": { max: "840px" },
      "s-720px": { max: "720px" },
      "s-600px": { max: "600px" },
      "s-480px": { max: "480px" },
      "s-360px": { max: "360px" },
    },
  },
};

export default config;
