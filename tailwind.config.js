/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00FFFF', // Electric Cyan
          light: '#7FFFFF',
          dark: '#00B3B3'
        },
        secondary: {
          DEFAULT: '#9F50FF', // Pulsar Purple
          light: '#BE8FFF',
          dark: '#7A33CC'
        },
        accent: '#22A29F', // Cosmic Teal
        background: {
          primary: '#0A0F2D', // Deep Space Blue
          secondary: '#161B3A', // Nebula Navy
        },
        text: {
          primary: '#F0F0F5', // Starlight White
          secondary: '#A0A0B5', // Lunar Grey
        },
        success: '#00FF7F', // Aurora Green
        warning: '#FFA500', // Solar Flare Orange
        error: '#FF3355', // Crimson Comet
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }      
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Exo 2', 'ui-sans-serif', 'system-ui'],
        mono: ['Fira Code', 'monospace']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 15px rgba(0, 255, 255, 0.5)',
        'glow-purple': '0 0 15px rgba(159, 80, 255, 0.5)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00FFFF 0%, #9F50FF 100%)',
        'gradient-dark': 'linear-gradient(135deg, rgba(10, 15, 45, 0.9) 0%, rgba(22, 27, 58, 0.9) 100%)',
        'neural-pattern': "url('/images/neural-pattern.svg')"
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}