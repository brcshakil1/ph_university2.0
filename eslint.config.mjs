import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['**/node_modules/', './dist'],
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      // "no-console": "error",
    },
    // globals: {
    //   process: 'readonly',
    // },
    // extends: [
    //   'eslint:recommended',
    //   'plugin:@typescript-eslint/recommended',
    //   'prettier',
    // ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
