import type { IGraphQLConfig } from 'graphql-config';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());

const API_URL = process.env.API_URL;

if (!API_URL) throw new Error('API_URL is undefined.');

// const LOCAL_SCHEMA = './tempo/api/generated/schema.graphql';
// const INTROSPECTION_SCHEMA = './@tempo/api/generated/graphql.schema.json';

// https://the-guild.dev/graphql/codegen/docs/config-reference/documents-field
const documents = [
  'app/**/*.{ts,tsx}',
  '@tempo/**/*.{ts,tsx,gql}',
  // '!**/dashboard/**',
  '!**/generated/**',
  '!**/node_modules/**',
];

const SCALAR_TYPES = {
  DateTime: 'string',
  Date: 'string',
  Decimal: 'string | number',
  dict: 'Record<string, unknown>',
  GenericScalar: 'unknown',
  GlobalID: 'string',
  ID: 'string',
  JSONString: 'string',
  Metadata: 'Record<string, string>',
  PointScalar: 'Record<"latitude" | "longitude", number>',
  // Allow inputting floats or strings for PositiveDecimal (money) values.
  // The API always converts to string on the backend but sends floats to the frontend.
  PositiveDecimal: 'string | number',
  Upload: 'unknown',
  UUID: 'string',
  Void: 'void',
  Weight: 'string | number',
  _Any: 'any',
};

const introspectionCodegenConfig = {
  generates: {
    '@tempo/api/generated/graphql.schema.json': {
      plugins: ['introspection'],
      config: { minify: true },
    },
  },
  overwrite: true,
};

// https://the-guild.dev/graphql/codegen/plugins/presets/preset-client
const clientPreset = {
  preset: 'client',
  // plugins: [
  //   'typescript',
  //   'typescript-operations',
  //   'typescript-urql',
  // ],
  config: {
    dedupeFragments: true,
    enumsAsTypes: true,
    nonOptionalTypename: true,
    scalars: SCALAR_TYPES,
    strictScalars: true,
    useTypeImports: true,
  },
  presetConfig: {
    fragmentMasking: false,
    // fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
  },
  hooks: {
    afterOneFileWrite: ['eslint --fix'],
  },
};

const constantsConfig = {
  plugins: ['typescript'],
  config: {
    enumsAsConst: true,
    onlyEnums: true,
    // namingConvention: {
    //   enumValues: "./.config/enumKeyCase",
    // }
  },
  hooks: {
    afterOneFileWrite: ['eslint --fix'],
  },
};

const apiCodegenConfig = {
  generates: {
    '@tempo/api/generated/introspection.json': {
      plugins: ['urql-introspection'],
    },
    '@tempo/api/generated/': {
      ...clientPreset,
    },
    '@tempo/api/generated/constants.ts': {
      ...constantsConfig,
    },
    '@tempo/api/generated/resolvers.ts': {
      plugins: [
        {
          add: {
            content: '/// <reference path="./graphql.ts" />',
          },
        },
        'typescript-resolvers',
      ],
      config: {
        useTypeImports: true,
      },
    },
  },
  overwrite: true,
};

const dashboardCodegenConfig = {
  generates: {
    '@tempo/dashboard/generated/introspection.json': {
      plugins: ['urql-introspection'],
    },
    // "generated/fragments.ts": {
    //   plugins: ["fragment-matcher"],
    //   config: {
    //     minify: false,
    //     apolloClientVersion: 3,
    //   },
    // },
    // "generated/typePolicies.ts": {
    //   plugins: ["typescript-apollo-client-helpers"],
    // },
    // "@tempo/dashboard/generated/api.ts": {
    //   plugins: [
    //     { add: { content: PREPENDED_CONTENT } },
    //     "typescript",
    //     "typescript-operations",
    //     "typescript-urql",
    //   ],
    //   config: {
    //     nonOptionalTypename: true,
    //     avoidOptionals: {
    //       field: true,
    //       inputValue: false,
    //       object: false,
    //       defaultValue: false,
    //     },
    //     // namingConvention: {
    //     //   enumValues: "change-case-all#upperCase",
    //     // },
    //     onlyOperationTypes: true,
    //     scalars: SCALAR_TYPES,
    //     dedupeFragments: true, // Prevent fragment duplication in generated documents
    //     dedupeOperationSuffix: true, // Prevent suffix duplication in generated names
    //     enumsAsTypes: false, // TODO
    //   },
    // },
    '@tempo/dashboard/generated/': {
      ...clientPreset,
    },
    '@tempo/dashboard/generated/constants.ts': {
      ...constantsConfig,
    },
  },
  overwrite: true,
};

/**
 * @type {import('graphql-config').IGraphQLConfig}
 */
const config = {
  projects: {
    default: {
      schema: [API_URL],
      documents,
      extensions: {
        codegen: {
          generates: {
            ...introspectionCodegenConfig.generates,
            ...apiCodegenConfig.generates,
            // ...dashboardCodegenConfig.generates,
          },
          overwrite: true,
        },
      },
    },
    dashboard: {
      schema: [API_URL],
      documents: [
        '@tempo/ui/**/*.{ts,tsx}',
        '@tempo/dashboard/oldSrc/fragments/*.{ts,tsx}',
        '@tempo/dashboard/**/*.{ts,tsx}',
        '!**/generated/**',
        '!**/node_modules/**',
      ],
      extensions: {
        codegen: {
          ...dashboardCodegenConfig,
        },
      },
    },
  },
} satisfies IGraphQLConfig;

export default config;
