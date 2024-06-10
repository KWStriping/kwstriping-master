// @ts-expect-error
import nextjsPlugin from '@next/eslint-plugin-next';

export default [
  {
    files: ['apps/**/*.{js,jsx,ts,tsx}', 'packages/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'next/google-font-display': 'warn',
      'next/google-font-preconnect': 'warn',
      'next/next-script-for-ga': 'warn',
      'next/no-before-interactive-script-outside-document': 'warn',
      'next/no-css-tags': 'warn',
      'next/no-head-element': 'warn',
      // https://nextjs.org/docs/messages/no-html-link-for-pages#pagesdir
      // 'next/no-html-link-for-pages': ['error', 'apps/*/pages/'],
      // 'next/no-html-link-for-pages': 'error', // TODO: fix for flat config
      'next/no-img-element': 'warn',
      'next/no-page-custom-font': 'warn',
      'next/no-styled-jsx-in-document': 'warn',
      'next/no-sync-scripts': 'warn',
      'next/no-title-in-document-head': 'warn',
      'next/no-typos': 'warn',
      'next/no-unwanted-polyfillio': 'warn',
      'next/inline-script-id': 'error',
      'next/no-assign-module-variable': 'error',
      'next/no-document-import-in-page': 'error',
      'next/no-duplicate-head': 'error',
      'next/no-head-import-in-document': 'error',
      'next/no-script-component-in-head': 'error',
    },
    plugins: { next: nextjsPlugin },
    settings: { next: { rootDir: 'apps/*/' } },
  },
];
