module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "google",
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/prop-types': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-unused-vars': 1,
    'import/extensions': 0,
    'require-jsdoc': 0,
    'linebreak-style': 0,
    'react/function-component-definition': [
      1, {
        'namedComponents': 'arrow-function',
        'unnamedComponents': 'function-expression',
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
