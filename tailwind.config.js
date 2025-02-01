/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
// In your tailwind.config.js file
module.exports = {
  theme: {
    extend: {},
    colors: {
      "custom-bg": "var(--bg-color)", // Tailwind utility for `--bg-color`
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {};

      for (let i = 1; i <= 100; i++) {
        newUtilities[`.lg:w-${i}0%`] = {
          width: `${i * 10}%`,
        };
      }

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  // other configurations...
};
module.exports = withMT({
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
});
