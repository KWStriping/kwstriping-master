import url from 'url';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
// @ts-expect-error
import importPlugin from 'eslint-plugin-import';
// @ts-expect-error
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
// @ts-expect-error
import * as espree from 'espree';

// import tsImportResolverPlugin from 'eslint-import-resolver-typescript';

const MONOREPO_ROOT = url.fileURLToPath(new URL('../../../..', import.meta.url));

export default [
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      parser: espree,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      parser: espree,
      sourceType: 'commonjs',
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/named': 'error',
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.mts',
      '**/*.cts',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          globalReturn: false,
        },
        tsconfigRootDir: MONOREPO_ROOT,
        project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
      },
    },
    plugins: {
      ts: tsPlugin,
      import: importPlugin,
    },
    rules: {
      'constructor-super': 'off', // ts(2335) & ts(2377)
      'getter-return': 'off', // ts(2378)
      'no-const-assign': 'off', // ts(2588)
      'no-dupe-args': 'off', // ts(2300)
      'no-dupe-class-members': 'off', // ts(2393) & ts(2300)
      'no-dupe-keys': 'off', // ts(1117)
      'no-func-assign': 'off', // ts(2539)
      'no-import-assign': 'off', // ts(2539) & ts(2540)
      'no-new-symbol': 'off', // ts(7009)
      'no-obj-calls': 'off', // ts(2349)
      'no-redeclare': 'off', // ts(2451)
      'no-setter-return': 'off', // ts(2408)
      'no-this-before-super': 'off', // ts(2376)
      'no-undef': 'off', // ts(2304)
      'no-unreachable': 'off', // ts(7027)
      'no-unsafe-negation': 'off', // ts(2365) & ts(2360) & ts(2358)
      'no-var': 'error', // ts transpiles let/const to var, so no need for vars any more
      'prefer-const': 'error', // ts provides better types with const
      'prefer-rest-params': 'error', // ts provides better types with rest args over arguments
      'prefer-spread': 'error', // ts transpiles spread to apply, so no need for manual apply
      'valid-typeof': 'off', // ts(2367)
      'ts/adjacent-overload-signatures': 'error',
      'ts/ban-types': 'error',
      'no-array-constructor': 'off',
      'ts/no-array-constructor': 'error',
      'no-empty-function': 'off',
      'ts/no-empty-function': [
        'error',
        { allow: ['private-constructors'] },
      ],
      'ts/no-empty-interface': 'error',
      'ts/no-explicit-any': 'warn',
      // 'ts/no-explicit-any': ['error', { ignoreRestArgs: false }],
      'ts/no-extra-non-null-assertion': 'error',
      'no-extra-semi': 'off',
      'ts/no-extra-semi': 'error',
      'ts/no-inferrable-types': 'error',
      'no-loss-of-precision': 'off',
      'ts/no-loss-of-precision': 'error',
      'ts/no-misused-new': 'error',
      'ts/no-namespace': 'error',
      'ts/no-non-null-asserted-optional-chain': 'error',
      'ts/no-non-null-assertion': 'warn',
      'ts/no-this-alias': 'error',
      'ts/no-unnecessary-type-constraint': 'error',
      'no-unused-vars': 'off',
      'ts/no-var-requires': 'error',
      'ts/prefer-as-const': 'error',
      'ts/prefer-namespace-keyword': 'error',
      'ts/triple-slash-reference': 'error',
      'ts/ban-tslint-comment': ['error'],
      'ts/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          minimumDescriptionLength: 10,
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
        },
      ],
      // Delegate to eslint-plugin-unused-imports:
      // "ts/no-unused-vars": [
      //   "error",
      //   { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      // ],
      'ts/consistent-type-exports': 'error',
      'ts/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      'ts/naming-convention': [
        'warn',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['function'],
          format: ['camelCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'classProperty',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'objectLiteralProperty',
          format: [
            'camelCase',
            // Some external libraries use snake_case for params
            'snake_case',
            // Env variables are generally uppercase
            'UPPER_CASE',
            // DB / Graphql might use PascalCase for relationships
            'PascalCase',
          ],
          leadingUnderscore: 'allowSingleOrDouble',
          trailingUnderscore: 'allowSingleOrDouble',
        },
        {
          selector: ['typeAlias', 'interface'],
          format: ['PascalCase'],
        },
        {
          selector: ['typeProperty'],
          format: ['camelCase'],
          // For graphql __typename
          leadingUnderscore: 'allowDouble',
        },
        {
          selector: ['typeParameter'],
          format: ['PascalCase'],
        },
      ],
      'spaced-comment': [
        'error',
        'always',
        {
          line: {
            markers: ['/'],
            exceptions: ['-', '+'],
          },
          block: {
            markers: ['!'],
            exceptions: ['*'],
            balanced: true,
          },
        },
      ],
      'linebreak-style': ['error', 'unix'],
      // TypeScript compilation already ensures that imports are resolvable.
      'import/no-unresolved': 'off',
      'import/named': 'off',
    },
  },
  {
    plugins: {
      import: importPlugin,
      // tsImportResolverPlugin,
      unused: unusedImportsPlugin,
    },
    rules: {
      'unused/no-unused-imports': 'error',
      'unused/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      // 'import/namespace': 'error', // TODO: enable after it works with flat config
      // 'import/default': 'error', // TODO: enable after it works with flat config
      'import/export': 'error',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-duplicates': ['error', { considerQueryString: true }],
      'import/order': [
        'error',
        {
          // TODO: editor integration
          // groups: [
          //   'builtin',
          //   'external',
          //   'internal',
          //   'parent',
          //   'sibling',
          //   'index',
          //   'object',
          // ],
          // alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];
