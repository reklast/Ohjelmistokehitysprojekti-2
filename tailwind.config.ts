import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: colors.sky[700],
      secondary: colors.slate[600],
      dark: colors.slate[900],
      light: colors.slate[200],
      white: colors.slate[50],
      error: colors.red[700],
    },
    extend: {
      backgroundImage: {
        'login-bg': "url('../../public/map-pattern.jpg')",
      },
      fontSize: {
        base: ["18px", "24px"],
      },
      fontFamily: {
        sans: ["var(--font-catamaran)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("flowbite-react")
  ],
};
export default config;
