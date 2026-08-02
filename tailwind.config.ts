import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#FF6F5E",
        orangeDeep: "#E5503E",
        cream: "#FFF7ED",
        charcoal: "#33302C",
        charcoalSoft: "#847C72",
        green: "#2FBF9F",
        gray: "#ACA399",
        line: "#F3E4D3",
      },
      fontFamily: {
        display: ["var(--font-baloo)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};
export default config;
