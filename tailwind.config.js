/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./input.css"],
  theme: {
    extend: {
      colors: {
        green: {
          400: "hsl(172, 67%, 45%)",
          900: "hsl(183, 100%, 15%)",
        },
        gray: {
          50: "hsl(189, 47%, 97%)",
          200: "hsl(185, 41%, 84%)",
          400: "hsl(184, 14%, 56%)",
          500: "hsl(186, 14%, 43%)",
        },
        white: "hsl(0, 100%, 100%)"
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

