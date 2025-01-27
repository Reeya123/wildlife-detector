/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors:{
        darkgreen: '#1B3500',
        neongreen: '#DDF113',

      },
      fontFamily: {
        Garamond: ['Cormorant Garamond', 'serif'],
        PlayfairDisplay: ['Playfair Display', 'serif'],
        Lora: ['Lora', 'serif'],
      }
    },
  },
  plugins: [],
}

