import js from '@eslint/js';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importHelpers from 'eslint-plugin-import-helpers';
import { flatConfigs as importXConfigs } from 'eslint-plugin-import-x';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { config, configs as tsConfigs } from 'typescript-eslint';

export default config(
  { ignores: ['dist/', 'public/', 'webpack/', 'node_modules/'] },
  js.configs.recommended,
  tsConfigs.recommended,
  importXConfigs.recommended,
  importXConfigs.typescript,
  prettierRecommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.serviceworker, chrome: 'readonly' },
    },
    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver({ alwaysTryTypes: true })],
    },
    plugins: {
      perfectionist,
      'import-helpers': importHelpers,
      'react-hooks': reactHooks,
    },
    rules: {
      'prettier/prettier': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'consistent-return': 'off',
      'import-x/no-default-export': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-named-as-default': 'error',
      'import-x/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
      'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
      'no-console': ['warn', { allow: ['error'] }],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'alphabetical',
          ignoreCase: true,
          groups: ['shorthand-prop', 'unknown', 'callback'],
          customGroups: [{ groupName: 'callback', elementNamePattern: '^on[A-Z]' }],
        },
      ],
      'import-helpers/order-imports': [
        'error',
        {
          groups: [
            '/^react/',
            '/^redux/',
            '/^@mui\\/material\\/styles/',
            '/^@mui\\/material/',
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
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: { 'import-x/no-default-export': 'off' },
  },
);
