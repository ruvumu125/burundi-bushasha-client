/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          color: '#8EC37B',
          accent: '#557CDA',
        },
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
}

