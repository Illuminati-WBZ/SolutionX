/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'satisfy' : ['Satisfy', 'cursive'],
        'permanent-maker':['Permanent Marker', 'cursive'],
        'roboto' : ['Roboto', 'sans-serif']
      },
      colors:{
        'brandColor':'#37484f'
      }
    },
  },
  plugins: [],
}
