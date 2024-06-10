import type { IGraphQLConfig } from 'graphql-config';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = `http://localhost:${process.env.PORT_API}/graphql/`;
const LOCAL_SCHEMA = './tempo/api/generated/schema.graphql';
const INTROSPECTION_SCHEMA = './packages/api/src/generated/graphql.schema.json';

// https://the-guild.dev/graphql/codegen/docs/config-reference/documents-field
const documents = [
  '**/graphql/**/*.{ts,gql}',
  'packages/dashboard/oldSrc/fragments/*.{ts,tsx}',
  'apps/**/*.{ts,tsx}',
  'packages/**/*.{ts,tsx}',
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
    'packages/api/src/generated/graphql.schema.json': {
      plugins: ['introspection'],
      config: { minify: true },
    },
  },
  overwrite: true,
};

// https://the-guild.dev/graphql/codegen/plugins/presets/preset-client
const clientPreset = {
  preset: 'client',
  plugins: [],
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
    'packages/api/src/generated/introspection.json': {
      plugins: ['urql-introspection'],
    },
    'packages/api/src/generated/': {
      ...clientPreset,
    },
    'packages/api/src/generated/constants.ts': {
      ...constantsConfig,
    },
    'packages/api/src/generated/resolvers.ts': {
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
    'packages/dashboard/generated/introspection.json': {
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
    // "packages/dashboard/generated/api.ts": {
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
    'packages/dashboard/generated/': {
      ...clientPreset,
    },
    'packages/dashboard/generated/constants.ts': {
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
      schema: [LOCAL_SCHEMA],
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
      schema: [LOCAL_SCHEMA],
      documents: [
        'packages/ui/src/**/*.{ts,tsx}',
        'packages/dashboard/oldSrc/fragments/*.{ts,tsx}',
        'packages/dashboard/**/*.{ts,tsx}',
        '!**/generated/**',
        '!**/node_modules/**',
      ],
      extensions: {
        codegen: {
          ...dashboardCodegenConfig
        },
      },
    },
  },
} satisfies IGraphQLConfig;


export default config;
