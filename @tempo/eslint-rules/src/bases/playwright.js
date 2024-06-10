/**
 * Opinionated config base for projects using playwright.
 * @see https://github.com/belgattitude/nextjs-monorepo-example/tree/main/packages/eslint
 */

import tsPlugin from '@typescript-eslint/eslint-plugin';
// @ts-expect-error
import playwrightPlugin from 'eslint-plugin-playwright';
import globals from 'globals';

const playwrightPatterns = {
  files: ['**/e2e/**/*.test.{js,ts}'],
};

export default [
  {
    files: playwrightPatterns.files,
    languageOptions: {
      globals: {
        ...globals['shared-node-browser'],
      },
    },
    plugins: {
      playwright: playwrightPlugin,
      ts: tsPlugin,
    },
    rules: {
      'no-empty-pattern': 'off',
      'playwright/missing-playwright-await': 'error',
      'playwright/no-page-pause': 'warn',
      'playwright/no-element-handle': 'warn',
      'playwright/no-eval': 'warn',
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-force-option': 'warn',
      'playwright/max-nested-describe': 'warn',
      'playwright/no-conditional-in-test': 'warn',
      'playwright/no-useless-not': 'warn',
      'playwright/valid-expect': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'ts/no-object-literal-type-assertion': 'off',
      'ts/no-empty-function': 'off',
      'ts/no-non-null-assertion': 'off',
    },
  },
];
