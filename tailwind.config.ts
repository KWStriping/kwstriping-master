import type { Config } from 'tailwindcss';
import { generateTailwindConfig } from './src/@tempo/ui/helpers/tailwind';
import theme from './src/theme.config';

const config = {
  ...generateTailwindConfig(theme),
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{jsx,tsx,css,mdx}',
    './src/@tempo/ui/components/jsx,tsx,css}',
    './src/@tempo/checkout/components/**/*.{jsx,tsx,css}',
  ],
} satisfies Config;

export default config;
