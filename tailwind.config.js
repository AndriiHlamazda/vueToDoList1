module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'img': "url('./1559370648_6.jpeg')",
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '100%': '100%',
        '16': '4rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
