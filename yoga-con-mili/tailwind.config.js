/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zen Palette
        linen:     '#F5F5DC', // arena clara
        beige:     '#EADDCA', // beige cálido
        tan:       '#D2B48C', // madera/tan
        sage:      '#8FAF8A', // verde suave
        clay:      '#C4956A', // arcilla
        driftwood: '#A0785A', // madera oscura
        stone:     '#9E9E8E', // piedra
        'off-white': '#FAFAF7', // fondo ultra limpio
        'deep-green': '#3D5A47', // verde profundo (texto)
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
