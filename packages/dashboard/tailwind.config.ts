import type { Config } from 'tailwindcss';
import { generateTailwindConfig } from '../../packages/ui/src/helpers/tailwind';
// import { generateTailwindConfig } from '@core/ui/helpers/tailwind';
import theme from './theme.config';

const config = {
  ...generateTailwindConfig(theme),
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{jsx,tsx,css,mdx}',
    './components/**/*.{jsx,tsx,css,mdx}',
    '../../packages/ui/src/**/*.{jsx,tsx,css}',
    '../../packages/checkout/src/**/*.{jsx,tsx,css}',
  ],
} satisfies Config;

export default config;
