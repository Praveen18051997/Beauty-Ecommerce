/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#FDF7F5',
          100: '#FAF0ED',
          200: '#F3DBD5',
          300: '#E7BDB2',
          400: '#D79988',
          500: '#C67865',
          600: '#B05946',
          700: '#944434',
          800: '#7B382B',
          900: '#673227',
        },
        champagne: {
          50: '#FAF8F0',
          100: '#F3EEDA',
          200: '#E5D8B1',
          300: '#D6C085',
          400: '#C7A75B',
          500: '#B59141',
          600: '#967432',
          700: '#755829',
          800: '#604826',
          900: '#513D24',
        },
        emeraldDark: {
          900: '#0B1513',
          800: '#12201D',
          700: '#1A2C29',
          600: '#233A36',
          500: '#2F4945',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
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
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
