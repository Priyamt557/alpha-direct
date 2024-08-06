const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'alpha-primary': '#212060',
      'alpha-primary2': '#AEAEAE',
      'alpha-secondary': '#F58427',
      'gray-color1': '#E6E6E6',
      'gray-color2': '#F3F3F3',
      'light-blue': colors.sky,
      cyan: colors.cyan,
      red: colors.red,
      blue: colors.blue,
      slate: colors.slate,
      gray: colors.gray,
      green: colors.green
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      serif: [
        'TTNormsProBold',
        'TTNormsProRegular',
        'SpaceGroteskBold',
        'SpaceGroteskMedium'
      ]
    },
    extend: {
      boxShadow: {
        'compliance-card-shadow': '0px 0px 15px 0px rgba(0, 0, 0, 0.25)',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
};
