import globals from 'globals';
import {
  ts,
  sonar,
  regexp,
  react,
  jest,
  rtl,
  storybook,
  playwright,
  prettier,
  next,
} from '@core/eslint-rules/bases';
import { missing } from '@core/eslint-rules/rules';

const USE_CUSTOM_RULES = false;

const PROJECT_PATTERNS = ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'];

const allGlobals = {
  ...globals.browser,
  ...globals.node,
  ...globals.es2021,
};

// TODO: clean up when bug is fixed
delete allGlobals['AudioWorkletGlobalScope '];

const configs = [
  {
    ignores: [
      '**/node_modules',
      '**/.cache',
      '**/.turbo',
      '**/*.cache',
      '**/build',
      '**/dist',
      '**/locales',
      '**/.next',
      '**/.storybook',
      '**/storybook-static',
      '**/workbox-*.js',
      '**/sw.js',
      'pnpm-lock.yaml',
      '**/graphql.schema.json',
      '**/introspection.json',
      '**/$path.ts',
      // TODO
      '**/cypress/**',
      '**/*.test.ts',
      '**/__tests__/**',
      '**/*.stories.tsx',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: allGlobals,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          globalReturn: false,
        },
      },
      sourceType: 'module',
    },
    settings: {
      // https://github.com/import-js/eslint-plugin-import#importcache
      'import/cache': {
        lifetime: '∞',
      },
      // https://github.com/import-js/eslint-plugin-import#importextensions
      'import/extensions': [
        '.mjs',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.d.ts',
        '.json',
        '.css',
        '.svg',
      ],
      // https://github.com/import-js/eslint-plugin-import#importparsers
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.cts', '.mts', '.tsx'],
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
      },
      // https://github.com/import-js/eslint-plugin-import#resolvers
      'import/resolver': {
        typescript: {
          project: PROJECT_PATTERNS,
        },
        node: true,
      },
      next: {
        rootDir: 'apps/*/',
      },
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      'constructor-super': 'error',
      'default-case': 'warn',
      'for-direction': 'error',
      'getter-return': 'error',
      'no-async-promise-executor': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-const-assign': 'error',
      'no-constant-condition': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-empty-character-class': 'error',
      'no-empty-pattern': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-import-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-new-symbol': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': 'error',
      'no-regex-spaces': 'error',
      'no-self-assign': 'error',
      'no-setter-return': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-this-before-super': 'error',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-labels': 'error',
      'no-useless-backreference': 'error',
      'no-useless-catch': 'error',
      'no-useless-escape': 'error',
      'no-with': 'error',
      'require-yield': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
    },
  },
  ...ts,
  ...react,
  ...sonar,
  ...regexp,
  ...jest,
  ...rtl,
  ...storybook,
  ...playwright,
  ...next,
  ...prettier,
  ...(USE_CUSTOM_RULES
    ? [
        {
          files: ['**/*.ts', '**/*.tsx'],
          plugins: {
            custom: {
              rules: {
                missing,
              },
            },
          },
          rules: {
            'custom/missing': 'error',
          },
        },
      ]
    : []),
];

export default configs;

// TODO:
// overrides: [
//   {
//     files: ['src/pages/\\_*.{ts,tsx}'],
//     rules: {
//       'react/display-name': 'off',
//     },
//   },
//   // TODO
//   {
//     files: ['src/backend/**/*graphql*schema*.ts'],
//     rules: {
//       'ts/naming-convention': [
//         'error',
//         {
//           // Fine-tune naming convention for graphql resolvers and allow PascalCase
//           selector: ['objectLiteralProperty'],
//           format: ['camelCase', 'PascalCase'],
//         },
//       ],
//     },
//   },
// ],
