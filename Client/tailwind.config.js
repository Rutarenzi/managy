/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },

    colors: {
      ...colors,
      primary: {
        DEFAULT: '#04244A',
        50: '#3D5980',
        100: '#344966',
        200: '#384D69',
      },
      secondary: {
        DEFAULT: '#0075FF',
        50: '#3182CE',
        100: '#D9D9D9',
        200: '#CCCCCC',
      },
    },
    screens: {
      xxs: '280px',
      '2xs': '320px',
      xs: '420px',
      '2sm': '500px',
      ...defaultTheme.screens,
      xtab: '960px',
      '3xl': '1920px',
    },
  },
  plugins: [],
};
