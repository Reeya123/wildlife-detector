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
        mossgreen: '#606c38',

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

