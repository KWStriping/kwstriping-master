// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import _withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig as withSentry } from '@sentry/nextjs';
import { paraglide } from '@inlang/paraglide-next/plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const workspaceRoot = path.resolve(__dirname);
const messagesDir = path.resolve(workspaceRoot, `messages`);
const paraglideDir = path.resolve(workspaceRoot, `src/paraglide`);
if (process.env.DOCKER) {
  console.log('Running in Docker.');
  if (!fs.existsSync(paraglideDir)) {
    throw new Error(`${paraglideDir} does not exist.`);
  }
}

console.debug('Workspace root:', workspaceRoot);

const DEFAULT_PACKAGES_TO_TRANSPILE = [
  // '@tempo/api',
  // '@tempo/blog',
  // '@tempo/checkout',
  // '@tempo/data',
  // '@tempo/forms',
  // '@tempo/next',
  // '@tempo/ui',
  // '@tempo/utils',
];

const DEFAULT_CLIENT_PRESET_PATH = path.resolve(workspaceRoot, '@tempo/api/generated/gql');

const ENABLE_CLIENT_PRESET_OPTIMIZER = false;

const clientPresetDir = DEFAULT_CLIENT_PRESET_PATH;
const packagesToTranspile = DEFAULT_PACKAGES_TO_TRANSPILE;

if (process.env.NODE_ENV === 'development' && process.env.READ_DOTENV) {
  const dotenv = await import('dotenv');
  const dotenvExpand = await import('dotenv-expand');
  const dotenvPath = path.join(workspaceRoot, '.env');
  const env = dotenv.config({ path: dotenvPath });
  if (env.error) throw new Error(env.error);
  dotenvExpand.expand(env);
}

const DOMAIN = process.env.DOMAIN ?? process.env.NEXT_PUBLIC_DOMAIN;
if (!DOMAIN) throw new Error('NEXT_PUBLIC_DOMAIN is not defined in process.env');

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined in process.env');

console.log(`API URL: ${API_URL}`);

const withBundleAnalyzer = _withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const allowedImageDomains = process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS
  ? process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS.split(',')
  : [];

const isSentryEnabled =
  process.env.SENTRY_DSN &&
  process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT &&
  process.env.SENTRY_RELEASE;

const withSentryConfig = (nextConfig = {}) => {
  const configWithSentryConfig = {
    ...nextConfig,
    sentry: {
      // Automatically provide performance monitoring for data-fetching methods and API routes.
      autoInstrumentServerFunctions: true, // TODO

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
    silent: false, // TODO
  };
  return withSentry(configWithSentryConfig, sentryWebpackPluginOptions);
};

/** @type {import('next').NextConfig} */
let config = paraglide({
  paraglide: {
    project: path.resolve(messagesDir, `${process.env.APP}.inlang`),
    outdir: paraglideDir,
  },
  eslint: {
    ignoreDuringBuilds: !!process.env.NEXTJS_IGNORE_ESLINT,
  },
  outputFileTracingRoot: workspaceRoot,
  experimental: {
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
    '@tempo/ui/components': {
      transform: '@tempo/ui/components/{{member}}',
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
  transpilePackages: packagesToTranspile,
  typescript: {
    ignoreBuildErrors: !!process.env.NEXTJS_IGNORE_TYPECHECK,
  },
  webpack(_config, { dev, webpack, isServer }) {
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
    // config.module?.rules?.push({
    //   test: /index\.(js|mjs|jsx|ts|tsx)$/,
    //   include: (mPath) => mPath.includes('@tempo/ui'),
    //   sideEffects: false,
    // });
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
    if (isServer) {
      // https://github.com/baselime/node-opentelemetry/issues/2
      // TODO https://github.com/getsentry/sentry-javascript/pull/11810
      config.ignoreWarnings = [{ module: /opentelemetry/ }];
    }
    return config;
  },
  images: {
    domains: [DOMAIN, ...allowedImageDomains],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'x-content-type-options',
            value: 'nosniff',
          },
          { key: 'x-xss-protection', value: '1' },
          { key: 'x-frame-options', value: 'DENY' },
          {
            key: 'strict-transport-security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
});

config = withBundleAnalyzer(config);

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
export default isSentryEnabled ? withSentryConfig(config) : config;
