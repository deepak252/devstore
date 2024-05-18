/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#646DDF', //// Buttons, Active State (Checkbox), Textfield border (Focus)
          100: '#E1E0F9', // Chip
          200: '#E0E0FF', // Floating Button
          300: '#B3B5D9',
        },
        secondary: '#020865',
        gray: {
          DEFAULT: '#AFAFAF',
          100: '#F6F6F6',
          200: '#E1E1E1',
          400: '#C2C2C2',
          500: '#AFAFAF',
          700: '#787878',
          900: '#555555',
        },
        green: {
          DEFAULT: '#49B638',
          200: '#E8FFE4',
          600: '#51B42E',
        },
        red: {
          DEFAULT: '#FA4733',
          200: '#FEECEC',
          600: '#BA1A1A',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        13: '13px',
        15: '15px',
        17: '17px',
      },
    },
  },
  plugins: [],
}
