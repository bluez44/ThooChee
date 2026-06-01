import { create } from "twrnc";

// Create custom Tailwind compiler with Liquid Clarity design system tokens
const tw = create({
  theme: {
    extend: {
      colors: {
        // Accent & Brand Colors
        primary: "#0058bc",
        "primary-container": "#0070eb",
        secondary: "#006e28",
        "secondary-container": "#6ffb85",
        tertiary: "#bc000a",
        "tertiary-container": "#e2241f",
        error: "#ba1a1a",
        "error-container": "#ffdad6",

        // Canvas & Surface Colors
        background: "#faf9fe",
        "on-background": "#1a1b1f",
        surface: "#faf9fe",
        "surface-dim": "#dad9df",
        "surface-bright": "#faf9fe",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f4f3f8",
        "surface-container": "#eeedf3",
        "surface-container-high": "#e9e7ed",
        "surface-container-highest": "#e3e2e7",
        "on-surface": "#1a1b1f",
        "on-surface-variant": "#414755",
        outline: "#717786",
        "outline-variant": "#c1c6d7",
      },
      fontFamily: {
        sans: ["Inter"],
      },
    },
  },
});

export default tw;
