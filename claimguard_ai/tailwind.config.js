/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#141414",
        surface: "#1A1A1A",
        card: "#222222",
        cardHover: "#292929",
        border: "#343434",
        primary: "#00C878",
        primaryHover: "#00E68A",
        secondary: "#8BEF4A",
        textMain: "#F5F5F5",
        textSecondary: "#A3A3A3",
        textMuted: "#737373",
        risk: {
          low: "#22C55E",
          medium: "#F59E0B",
          high: "#F97316",
          critical: "#EF4444",
          info: "#22D3EE"
        }
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
