/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Terra Cultiva Wellness — Brand Palette
        linen:     '#F5F1E8', // crema cálida (brand background)
        beige:     '#EDE4D8', // beige suave
        tan:       '#D2B48C', // madera/tan
        sage:      '#8DA290', // verde sage (brand)
        clay:      '#C0653B', // terracota (brand primary)
        driftwood: '#A0785A', // madera oscura
        stone:     '#9E9E8E', // piedra / subtexto
        'deep-green': '#3C2E1D', // marrón profundo (brand text)
      },
      fontFamily: {
        serif:      ['Poppins', 'Georgia', 'serif'],
        sans:       ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        quicksand:  ['Quicksand', 'sans-serif'],
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
