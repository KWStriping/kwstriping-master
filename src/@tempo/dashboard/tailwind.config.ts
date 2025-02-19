import type { Config } from 'tailwindcss';
import { generateTailwindConfig } from '../ui/helpers/tailwind';
// import { generateTailwindConfig } from '@tempo/ui/helpers/tailwind';
import theme from './theme.config';

const config = {
  ...generateTailwindConfig(theme),
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/**/*.{jsx,tsx,css,mdx}',
    './components/**/*.{jsx,tsx,css,mdx}',
    '../../@tempo/ui/components/**/*.{jsx,tsx,css}',
    '../../@tempo/checkout/components/**/*.{jsx,tsx,css}',
  ],
} satisfies Config;

export default config;
