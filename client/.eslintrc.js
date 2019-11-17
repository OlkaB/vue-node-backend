module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
  ],
  rules: {
    "indent": ["error", 4],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "comma-dangle": [
      "error",
      "never"
    ],
    "no-trailing-spaces": [
      "error",
      {
        "ignoreComments": true
      }
    ],
    "semi": [
      "error",
      "never"
    ],
    "object-curly-spacing": ["error", "always"],
  }
}
