/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          dark: '#722F37',
          DEFAULT: '#8B3A42',
          light: '#9E4A52',
        },
        header: '#3D3D3D',
        cream: '#D4C4A8',
        gold: '#C9A962',
        wood: '#8B7355',
      },
      fontFamily: {
        script: ['Tangerine', 'cursive'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
