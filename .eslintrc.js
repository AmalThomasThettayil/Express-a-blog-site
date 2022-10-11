export const env = {
  browser: true,
  es2021: true,
};
// export const extends =[
//   'plugin:react/recommended',
//   'airbnb',
// ];
export const overrides = [];
export const parserOptions = {
  ecmaVersion: 'latest',
  sourceType: 'module',
};
export const plugins = [
  'react',
];
export const rules = {
  'no-use-vars': 'warn',
  'no-console': 'off',
  'prettier/ prettier': 'error',
  'func-name': 'off',
  'object-shorthand': 'off',
  'class-methods-use-this': 'off',
};
