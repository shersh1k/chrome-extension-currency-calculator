module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier', 'plugin:import/typescript', 'plugin:@typescript-eslint/recommended'],
  plugins: ['import', 'prettier', '@typescript-eslint', 'import-helpers'],
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: { alwaysTryTypes: true },
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 120,
      },
    ],
    'jsx-a11y/no-static-element-interactions': 0,
    'consistent-return': 0,
    'import/no-default-export': 2,
    'import/no-self-import': 2,
    'import/no-named-as-default': 2,
    'newline-before-return': 2,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': [
      1,
      {
        allow: ['error'],
      },
    ],
    'arrow-body-style': 0,
    'no-shadow': 0,
    'no-use-before-define': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/no-shadow': 2,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        shorthandFirst: true,
      },
    ],
    'import-helpers/order-imports': [
      2,
      {
        groups: [
          '/^react/',
          '/^redux/',
          '/^@material-ui/core/styles/',
          '/^@material-ui/core/',
          'module',
          '/^API/',
          '/^atoms/',
          '/^molecules/',
          '/^theme/',
          '/^types/',
          '/^consts/',
          '/^storage/',
          '/^helpers/',
          '/^commonCore/',
          '/^contentScriptCore/',
          '/^optionsCore/',
          '/^popupCore/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-use-before-define': 0,
  },
};
