import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
    colors: {
      primary: "#3E5382",
      secondary: "#2A2D36",
      bg : "#303F63",
      formBg: "#97A4C1",
    }
    },
  },
  plugins: [],
} satisfies Config;
