import 'server-only';

import { HttpLink } from '@apollo/client';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

// import type { QueryOptions, MutationOptions } from '@apollo/client';
// import type { DocumentNode } from 'graphql';

// import type { Requester } from '@tempo/api/generated/types';
// import { getSdk } from '@tempo/api/generated/types';

// https://github.com/apollographql/apollo-client-nextjs

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
if (!API_URL) throw new Error('API_URL is not set.');

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: API_URL,
      fetchOptions: { cache: 'force-cache' },
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: 'no-store' },
    }),
  });
});

// export type ApolloRequesterOptions<V, R> =
//   | Omit<QueryOptions<V>, 'variables' | 'query'>
//   | Omit<MutationOptions<R, V>, 'variables' | 'mutation'>;

// const validDocDefOps = ['mutation', 'query', 'subscription'];

// export function getSdkApollo<C>(client: ApolloClient<C>) {
//   const requester: Requester = async <R, V>(
//     doc: DocumentNode,
//     variables: V,
//     options?: ApolloRequesterOptions<V, R>
//   ): Promise<R> => {
//     // Valid document should contain *single* query or mutation unless it's has a fragment
//     if (
//       doc.definitions.filter(
//         (d) => d.kind === 'OperationDefinition' && validDocDefOps.includes(d.operation)
//       ).length !== 1
//     ) {
//       throw new Error(
//         'DocumentNode passed to Apollo Client must contain single query or mutation'
//       );
//     }

//     const definition = doc.definitions[0];

//     // Valid document should contain *OperationDefinition*
//     if (definition?.kind !== 'OperationDefinition') {
//       throw new Error(
//         'DocumentNode passed to Apollo Client must contain single query or mutation'
//       );
//     }

//     switch (definition.operation) {
//       case 'mutation': {
//         const response = await client.mutate<R, V>({
//           mutation: doc,
//           variables,
//           ...options,
//         });

//         if (response.errors) {
//           throw new Error(response.errors);
//         }

//         if (response.data === undefined || response.data === null) {
//           throw new Error('No data presented in the GraphQL response');
//         }

//         return response.data;
//       }
//       case 'query': {
//         const response = await client.query<R, V>({
//           query: doc,
//           variables,
//           ...options,
//         });

//         if (response.errors) {
//           throw new Error(response.errors);
//         }

//         if (response.data === undefined || response.data === null) {
//           throw new Error('No data presented in the GraphQL response');
//         }

//         return response.data;
//       }
//       case 'subscription': {
//         throw new Error('Subscription requests through SDK interface are not supported');
//       }
//       default:
//         throw new Error(`Unknown operation type: ${definition.operation}`);
//     }
//   };

//   return getSdk(requester);
// }

// export type Sdk = ReturnType<typeof getSdkApollo>;
