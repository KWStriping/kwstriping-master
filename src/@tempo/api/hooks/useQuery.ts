import type {
  OperationVariables,
  SuspenseQueryHookOptions,
  TypedDocumentNode,
} from '@apollo/client';
import { useSuspenseQuery } from '@apollo/client';
import type { UseSuspenseQueryResult } from '@apollo/client/react/hooks/useSuspenseQuery';
import type { UserPermissionFragment } from '@tempo/api/generated/graphql';
import { PermissionCode } from '@tempo/api/generated/constants';
import { useUserPermissions } from '@tempo/api/auth/react/hooks/permissions';

export type PrefixedPermissionCode = `PERMISSION_${PermissionCode}`;

const getPermissionKey = (code: string) => `PERMISSION_${code}` as PrefixedPermissionCode;

export const ALL_PERMISSIONS: Record<PrefixedPermissionCode, boolean> = Object.values(
  PermissionCode
).reduce(
  (prev, code) => ({
    ...prev,
    [getPermissionKey(code)]: false,
  }),
  {} as Record<PrefixedPermissionCode, boolean>
);

const getUserPermissions = (
  userPermissions: UserPermissionFragment[]
): Record<PrefixedPermissionCode, boolean> =>
  userPermissions.reduce(
    (prev, permission) => ({
      ...prev,
      [getPermissionKey(permission.code)]: true,
    }),
    {} as Record<PrefixedPermissionCode, boolean>
  );

// export interface LoadMore<TData, TVariables> {
//   loadMore: (
//     mergeFunc: (prev: TData, next: TData) => TData,
//     extraVariables: Partial<TVariables>
//   ) => Promise<OperationResult<TData>>;
// }

type WithoutPermissions<TVariables> = Omit<TVariables, PrefixedPermissionCode>;

export type UseQueryOptions<
  TData,
  TVariables extends OperationVariables,
> = SuspenseQueryHookOptions<TData, TVariables> & {
  displayLoader?: boolean;
  pause?: boolean;
};

export type UseAuthorizedQueryHookOptions<TVariables extends OperationVariables, TData> = Omit<
  UseQueryOptions<TData, TVariables>,
  'variables'
> & {
  variables?: WithoutPermissions<UseQueryOptions<TData, TVariables>['variables']>;
  displayLoader?: boolean;
};

export type UseQueryResponse<
  TData,
  TVariables extends OperationVariables,
> = UseSuspenseQueryResult<TData, TVariables> & { loading: boolean };

export { useSuspenseQuery as useQuery };
// export function useQuery<TData, TVariables extends OperationVariables>(
//   query: TypedDocumentNode<TData, TVariables>,
//   {
//     variables,
//     pause = false,
//     fetchPolicy = 'cache-and-network',
//     displayLoader = true,
//   }: UseQueryOptions<TData, TVariables>
// ): UseQueryResponse<TData, TVariables> {
//   // TODO
//   // * import { skipToken, useSuspenseQuery } from '@apollo/client';
//   // *
//   // * const { data } = useSuspenseQuery(query, id ? { variables: { id } } : skipToken);
//   const { data, fetchMore, error, ...rest } = useSuspenseQuery(query, {
//     variables,
//     skip: pause,
//     fetchPolicy,
//   });

//   // const loadMore = (
//   //   mergeFunc: (previousResults: TData, fetchMoreResult: TData) => TData,
//   //   extraVariables: RequireAtLeastOne<TVariables>
//   // ) =>
//   //   queryData.fetchMore({
//   //     query,
//   //     updateQuery: (previousResults, { fetchMoreResult }) => {
//   //       if (!fetchMoreResult) {
//   //         return previousResults;
//   //       }
//   //       return mergeFunc(previousResults, fetchMoreResult);
//   //     },
//   //     variables: { ...variablesWithPermissions, ...extraVariables },
//   //   });

//   // TODO: clean up loading
//   return { data, loading: false, error, fetchMore, ...rest };
// }

export function useAuthorizedQuery<TData, TVariables extends OperationVariables>(
  query: TypedDocumentNode<TData, TVariables>,
  {
    variables,
    pause = false,
    fetchPolicy = 'cache-and-network',
    displayLoader = true,
  }: UseAuthorizedQueryHookOptions<TVariables, TData>
): UseQueryResponse<TData, TVariables> {
  const _userPermissions = useUserPermissions();
  const userPermissions = _userPermissions ?? [];

  const variablesWithPermissions = {
    ...variables,
    ...ALL_PERMISSIONS,
    ...getUserPermissions(userPermissions),
  } as unknown as UseQueryOptions<TData, TVariables>['variables']; // TODO
  // console.log('variablesWithPermissions', variablesWithPermissions);

  const queryOptions = {
    variables: variablesWithPermissions,
    pause,
    fetchPolicy,
    displayLoader,
  } as UseQueryOptions<TData, TVariables>;

  const { data, fetchMore, ...rest } = useQuery<TData, TVariables>(query, queryOptions);

  // const loadMore = (
  //   mergeFunc: (previousResults: TData, fetchMoreResult: TData) => TData,
  //   extraVariables: RequireAtLeastOne<TVariables>
  // ) =>
  //   queryData.fetchMore({
  //     query,
  //     updateQuery: (previousResults, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) {
  //         return previousResults;
  //       }
  //       return mergeFunc(previousResults, fetchMoreResult);
  //     },
  //     variables: { ...variablesWithPermissions, ...extraVariables },
  //   });

  return { data, fetchMore, ...rest };
}
