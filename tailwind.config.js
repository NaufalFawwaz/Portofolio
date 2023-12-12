/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#445964',
      },
      maxWidth: {
        '80': '80%',
      }
    },
  },
  plugins: [],
}

