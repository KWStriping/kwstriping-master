import type { Config } from 'tailwindcss';
import { generateTailwindConfig } from './helpers/tailwind';
import theme from './theme.config';

const config: Config = generateTailwindConfig(theme);

export default config;
