/**
 * Opinionated config base for projects using react-testing-library
 * @see https://github.com/belgattitude/nextjs-monorepo-example/tree/main/packages/eslint
 */

import tsPlugin from '@typescript-eslint/eslint-plugin';
// @ts-expect-error
import reactTestingLibraryPlugin from 'eslint-plugin-testing-library';

const rtlPatterns = {
  files: ['**/?(*.)+(test).{js,jsx,ts,tsx}'],
};

// TODO: verify https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/migration-guides/v6.md

export default [
  {
    // For performance enable react-testing-library only on test files
    files: rtlPatterns.files,
    plugins: {
      'testing-library': reactTestingLibraryPlugin,
    },
    rules: {
      'testing-library/await-async-queries': 'error',
      'testing-library/await-async-utils': 'error',
      'testing-library/no-await-sync-query': 'error',
      'testing-library/no-container': 'error',
      'testing-library/no-debugging-utils': 'error',
      'testing-library/no-dom-import': ['error', 'react'],
      'testing-library/no-node-access': 'error',
      'testing-library/no-promise-in-fire-event': 'error',
      'testing-library/no-render-in-setup': 'error',
      'testing-library/no-unnecessary-act': 'error',
      'testing-library/no-wait-for-multiple-assertions': 'error',
      'testing-library/no-wait-for-side-effects': 'error',
      'testing-library/no-wait-for-snapshot': 'error',
      'testing-library/prefer-find-by': 'error',
      'testing-library/prefer-presence-queries': 'error',
      'testing-library/prefer-query-by-disappearance': 'error',
      'testing-library/prefer-screen-queries': 'error',
      'testing-library/render-result-naming-convention': 'error',
    },
  },
  {
    files: ['**/test-utils.tsx'],
    plugins: {
      ts: tsPlugin,
    },
    rules: {
      'ts/explicit-module-boundary-types': 'off',
      // 'import/export': 'off',
    },
  },
];
