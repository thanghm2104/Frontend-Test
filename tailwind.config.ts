import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Georgia', 'serif'],
    },
    screens: {
      'sm': '375px',    // mobile
      'md': '768px',    // tablet vertical
      'lg': '1024px',   // tablet horizontal
      'xl': '1280px',   // small desktop
      '2xl': '1920px',  // large desktop
    },
    extend: {
      colors: {
        primary: {
          light: '#4da8ff',
          DEFAULT: '#F2542D',
          dark: '#d43819',
        },
        secondary: {
          light: '#f3f4f6',
          DEFAULT: '#9ca3af',
          dark: '#4b5563',
        },
        cookmaster: {
          red: '#F2542D',
          brown: '#562C2C',
          lightGray: '#BBB',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '6rem',
        },
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideUp': 'slideUp 0.5s ease-in-out',
        'slideDown': 'slideDown 0.5s ease-in-out',
        'slideLeft': 'slideLeft 0.5s ease-in-out',
        'slideRight': 'slideRight 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config 