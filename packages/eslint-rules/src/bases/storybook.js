// @ts-expect-error
import storybookPlugin from 'eslint-plugin-storybook';

const storybookPatterns = {
  files: ['**/*.stories.{ts,tsx,mdx}'],
};

export default [
  {
    // For performance run storybook/recommended on test files, not regular code
    files: storybookPatterns.files,
    // languageOptions: { parserOptions: [Object] },
    plugins: { storybook: storybookPlugin },
    rules: {
      // 'import/no-anonymous-default-export': 'off',
      'storybook/await-interactions': 'error',
      'storybook/context-in-play-function': 'error',
      'storybook/default-exports': 'error',
      'storybook/hierarchy-separator': 'warn',
      'storybook/no-redundant-story-name': 'warn',
      'storybook/prefer-pascal-case': 'warn',
      'storybook/story-exports': 'error',
      'storybook/use-storybook-expect': 'error',
      'storybook/use-storybook-testing-library': 'error',
      'storybook/no-uninstalled-addons': 'error',
    },
  },
];
