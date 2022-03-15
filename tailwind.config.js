const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo[600],
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      /**
       * Override the <pre> background color. I couldn't get the
       * --tw-prose-invert-pre-bg to work, so here it is.
       */
      typography: {
        DEFAULT: {
          css: {
            pre: {
              "--tw-prose-pre-bg": "#fff",
            },
          },
        },
        invert: {
          css: {
            pre: {
              "--tw-prose-pre-bg": "#0d1117",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
