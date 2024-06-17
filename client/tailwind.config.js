/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '1px 1px 8px 2px #BDBDBD',
      },
      colors: {
        primary: {
          DEFAULT: '#646DDF', //// Buttons, Active State (Checkbox), Textfield border (Focus)
          100: '#E1E0F9', // Chip
          200: '#C7CAF7', // Floating Button
          300: '#AFB4F3',
          400: '8D94EE',
        },
        secondary: '#020865',
        gray: {
          DEFAULT: '#9E9E9E',
          // 100: '#F6F6F6',
          // 200: '#E1E1E1',
          // 400: '#C2C2C2',
          // 500: '#AFAFAF',
          // 700: '#787878',
          // 900: '#555555',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          750: '#565656',
          800: '#424242',
          900: '#212121',
          1100: '#C9C9C946',
          1200: '#ABABAB46',
          1300: '#80808046',
          1400: '#4F4F4F46',
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
        josefin: ['Josefin Sans', 'sans-serif'],
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
