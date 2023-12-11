/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html", 
  "./src/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.html",
  "./src/**/*.js",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '300': '300ms',
        '30': '30ms',
        '3000': '3000ms'
      },
      colors: {
        'custom-blue': 'rgb(160, 184, 186)',
        'custom-hover-blue': 'rgb(140, 164, 166)',
      },
    },
  },
  plugins: [],
}

