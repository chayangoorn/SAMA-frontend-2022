module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'pccp-orange': '#ff6a00',
        'pccp-blue': '#9da2ff',
        'light-gray': '#ededed',
        'pccp-light-orange': '#FFDDBE',
        'pccp-light-blue': '#CBD3FF',
        'success' : '#2dd36f',
        'danger' : '#eb445a',
        'primary' : '#3880ff'
      },
      padding: {
        '1/2': '50%',
        full: '100%',
        '1/3': '33.3333%',
        '2/3': '66.6667%',
      },
      fontFamily: {
        arthiti: ["Arthiti", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
