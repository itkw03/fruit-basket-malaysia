/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          'peach-coral': '#E77C73',
          'light-peach': '#F9E1DA',
          'deep-green': '#4A6B4F',
        },
        neutral: {
          charcoal: '#2D2D2D',
          ash: '#8B8B8B',
          'off-white': '#FEFCFB',
          'soft-blush': '#F9E1DA',
        },
        success: '#4A6B4F',
        error: 'rgba(231, 124, 115, 0.9)',
      },
      fontFamily: {
        'display': ['Cormorant Garamond', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
        'logo': ['Bebas Neue', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.125rem, 5vw, 4.5rem)',
        'display': 'clamp(1.75rem, 3vw, 3rem)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};