import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(222.2 84% 4.9%)",
        foreground: "hsl(210 40% 98%)",
        card: "hsl(217.2 32% 17.5%)",
        "card-foreground": "hsl(210 40% 98%)",
        "card-hover": "hsl(217.2 38% 22%)",
        border: "hsl(217.2 84% 50.8%)",
        primary: {
          DEFAULT: "hsl(217.2 91.2% 59.8%)",
          foreground: "hsl(210 40% 98%)",
        },
        secondary: "hsl(217.2 70.2% 50%)",
        accent: "hsl(217.2 70.2% 30%)",
        muted: "hsl(217.2 84% 65.1%)",
      },
    },
  },
  plugins: [],
};
export default config;
