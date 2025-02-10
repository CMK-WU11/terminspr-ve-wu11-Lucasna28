/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['"Roboto,"', "sans-serif"],
        RacingSans: ['"Racing Sans One", "sans-serif"'],
        Ubuntu: ['"Ubuntu", "sans-serif"'],
      },
      colors: {
        background: "#5E2E53",
        boxColor: " #EAEAEA",
        card: "#E1A1E9",
      },
      backgroundImage: {
        test: "/images/splash-image.jpg",
      },
    },
  },
  plugins: [],
};
