/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#8766aa', dark: '#6b4f8a', light: '#a88bc5' },
        secondary: { DEFAULT: '#ca8ebe', light: '#deb8d9' },
        ink:       { DEFAULT: '#4e4d4d', muted: '#7a7979' },
      },
      fontFamily: { sans: ['DM Sans', 'sans-serif'] },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
    },
  },
  plugins: [],
}
