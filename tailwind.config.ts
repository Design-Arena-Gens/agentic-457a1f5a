import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0f172a",
        blush: "#f9a8d4",
        aurora: "#22d3ee",
        dusk: "#6366f1"
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"]
      },
      boxShadow: {
        aurora: "0 30px 60px -15px rgba(100, 116, 139, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
