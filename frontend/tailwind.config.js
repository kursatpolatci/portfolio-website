/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      screens: {
        'xxs': '420px',
        'xs': '520px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      },
      colors: {
        dark: {
          primary: '#09090b',
          secondary: '#F3F4F6',
          tertiary: "#D1D5DB",
          quaternary: '#9CA3AF',
          fifth: "#525252",
        },
        light: {
          primary: '#ffffff',
          secondary: '#000000',
          tertiary: "#374151",
          quaternary: '#6B7280',
          fifth: "#737373",
        }
      },
    },
  },
  plugins: [],
}

