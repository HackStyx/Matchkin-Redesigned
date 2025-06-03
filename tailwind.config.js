/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'], // CRED-style serif headings
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        neopop: {
          primary: '#f59e0b',
          secondary: '#8b5cf6',
          surface: '#1e293b',
          background: '#0f172a'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'aurora': 'aurora 60s linear infinite',
        'spin': 'spin 8s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-slower': 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(245, 158, 11, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.8)' }
        },
        aurora: {
          '0%': { backgroundPosition: '50% 50%, 50% 50%' },
          '100%': { backgroundPosition: '350% 50%, 350% 50%' }
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
} 