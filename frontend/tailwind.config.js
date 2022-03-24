module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  mode: "jit",
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["Segoe UI", "Roboto", "sans-serif"],
      pocket: ["Pocket Monk"],
    },
    extend: {
      colors: {
        "pink-primary": "#e84a94",
        "blue-primary": "#57baeb",
        "blue-secondary": "#0090ff",
        "primary": "#bb2801"
      },
      backgroundImage: {
        "hero-card": "url('./card.svg')",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
        print: { raw: "print" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
