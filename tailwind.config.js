/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'text-green-500',
    'text-yellow-500',
    'text-red-500'
  ]
};