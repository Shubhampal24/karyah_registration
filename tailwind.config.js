/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        karyah: {
          orange: '#FF8A1F',
          'orange-hover': '#E8750E',
          'orange-light': '#FFF1E5',
          'orange-subtle': '#FFF8F1',
          bg: '#FFF9F2',
          surface: '#FFFFFF',
          text: '#202020',
          muted: '#77716B',
          border: '#EFE8DE',
          'border-strong': '#E0D4C3',
          dark: '#1C1917',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(135, 90, 40, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 16px 36px -4px rgba(255, 138, 31, 0.16), 0 6px 14px -2px rgba(0, 0, 0, 0.06)',
        'modal': '0 25px 60px -15px rgba(32, 32, 32, 0.25)',
      },
      borderRadius: {
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
