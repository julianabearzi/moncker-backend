module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'no-return-await': 'off',
    'func-names': 'off',
    'no-unsafe-optional-chaining': 'off',
  },
};
