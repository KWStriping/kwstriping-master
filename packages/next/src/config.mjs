// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import path from 'path';
import { fileURLToPath } from 'url';
import { withSentryConfig as withSentry } from '@sentry/nextjs';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const workspaceRoot = path.resolve(__dirname, '..', '..', '..');

console.log('Workspace root:', workspaceRoot);

if (process.env.READ_DOTENV) {
  const dotenvPath = path.join(workspaceRoot, '.env');
  const env = dotenv.config({ path: dotenvPath });
  if (env.error) throw new Error(env.error);
  dotenvExpand.expand(env);
}

const DEFAULT_PACKAGES_TO_TRANSPILE = [
  '@core/api',
  '@core/auth',
  '@core/checkout',
  '@core/i18n',
  '@core/ui',
  '@core/urql',
];

const DEFAULT_CLIENT_PRESET_PATH = path.resolve(workspaceRoot, 'packages/api/src/generated/gql');

const ENABLE_CLIENT_PRESET_OPTIMIZER = false;

/** @returns {import('next').NextConfig} */
export const generate = ({
  clientPresetDir = DEFAULT_CLIENT_PRESET_PATH,
  packagesToTranspile = DEFAULT_PACKAGES_TO_TRANSPILE,
} = {}) => ({
  eslint: {
    ignoreDuringBuilds: !!process.env.NEXTJS_IGNORE_ESLINT,
  },
  experimental: {
    // https://nextjs.org/docs/messages/import-esm-externals
    esmExternals: 'loose',
    externalDir: true,
    outputFileTracingRoot: workspaceRoot,
    swcPlugins: ENABLE_CLIENT_PRESET_OPTIMIZER
      ? [
          [
            // https://socket.dev/npm/package/swc-plugin-graphql-codegen-client-preset-optimizer-test
            'swc-plugin-graphql-codegen-client-preset-optimizer-test',
            {
              artifactDirectory: clientPresetDir,
              gqlTagName: 'graphql',
            },
          ],
        ]
      : undefined,
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  modularizeImports: {
    '@core/ui/components': {
      transform: '@core/ui/components/{{member}}',
      preventFullImport: true,
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
      preventFullImport: true,
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
      preventFullImport: true,
    },
  },
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: packagesToTranspile,
  typescript: {
    ignoreBuildErrors: !!process.env.NEXTJS_IGNORE_TYPECHECK,
  },
  webpack(_config, { dev, webpack }) {
    /** @type { import('webpack').Configuration } */
    const config = _config;
    // Enhance devtools output.
    config.output = config.output || {};
    config.output.devtoolModuleFilenameTemplate = function (info) {
      return 'file:///' + encodeURI(info.absoluteResourcePath);
    };
    config.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    // https://github.com/vercel/next.js/issues/12557
    config.module?.rules?.push({
      test: /index\.(js|mjs|jsx|ts|tsx)$/,
      include: (mPath) => mPath.includes('@core/ui'),
      sideEffects: false,
    });
    if (dev && process.env.ANALYZE === 'true') {
      var chalk = require('chalk');
      var progress = require('progress');
      const messageTemplate = [':bar', chalk.green(':percent'), ':msg'].join(' ') + '\n';
      const progressOptions = {
        complete: chalk.bgGreen(' '),
        incomplete: chalk.bgWhite(' '),
        width: 40,
        total: 100,
        clear: false,
      };
      const progressBar = new progress(messageTemplate, progressOptions);
      config.plugins?.push(
        new webpack.ProgressPlugin({
          activeModules: true,
          entries: true,
          handler(percentage, message, ...args) {
            progressBar.update(percentage, {
              msg: message,
            });
            // e.g. Output each progress message directly to the console:
            // console.info(
            //   (percentage * 100).toFixed(2) + '%',
            //   message,
            //   ...args,
            // );
          },
          // modules: true,
          // modulesCount: 5000,
          // profile: true,
          // dependencies: true,
          // dependenciesCount: 10000,
          // percentBy: null,
        })
      );
    }
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Prevent multiple instances of React.
      react: path.resolve('node_modules', 'react'),
      'react-dom': path.resolve('node_modules', 'react-dom'),
      // 'i18next-fs-backend': path.resolve('node_modules', 'i18next-fs-backend'), // TODO: cleanup
    };
    return config;
  },
});

export const withSentryConfig = (nextConfig = {}) => {
  const configWithSentryConfig = {
    ...nextConfig,
    sentry: {
      // Automatically provide performance monitoring for data-fetching methods and API routes.
      autoInstrumentServerFunctions: true,
      // https://webpack.js.org/configuration/devtool/
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
      hideSourceMaps: process.env.NODE_ENV !== 'development',
    },
  };
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  const sentryWebpackPluginOptions = {
    // TODO
    dryRun: true,
    // Suppress logs.
    silent: true,
  };
  return withSentry(configWithSentryConfig, sentryWebpackPluginOptions);
};
