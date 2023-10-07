import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    mainTheme: [
      {
        mytheme: {
          primary: "#288e9b",
          secondary: "#70bfc9",
          accent: "#90dddc",
          neutral: "#191627",
          "base-100": "#2b3055",
          info: "#3778e1",
          success: "#69e8c8",
          warning: "#d27c14",
          error: "#fa6f57",
        },
        body: {
          "background-color": "#e3e6e6",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
