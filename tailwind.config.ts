import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
      fontFamily: {
        sans: ['var(--font-inter)'],
        hatton: ['var(--font-hatton)'],
        atten_new: ['var(--font-atten_new)'],
      },
      colors: {
        primary: {
          1: '#540101',
          2: '#281313',
          3: '#C6A0A0',
          4: '#362121',
        },
        secondary: {
          1: '#0075D9'
        },
        neutral: {
          1: '#0E0909',
          2: '#353535',
          3: '#C7C7C7',
          4: '#9C9C9C',
          5: '#5F5F5F',
          6: '#595959',
          7: '#F8F8F8'
        },
      },
    },
  },
  plugins: [],
};
export default config;
