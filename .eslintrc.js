module.exports = {
  parser: 'babel-eslint',
  extends: 'standard',
  plugins: ['import'],
  rules: {
    indent: ['error', 2],
    'no-console': ['off'],
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'comma-dangle': ['error', 'never'],
    'no-underscore-dangle': [0],
    'arrow-parens': 0,
    'semi': ["error", "never"]
  }
};
