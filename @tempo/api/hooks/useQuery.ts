import type {
  AnyVariables,
  OperationResult,
  TypedDocumentNode,
  UseQueryArgs,
  UseQueryResponse,
} from '@urql/next';
import { useQuery as useBaseQuery } from '@urql/next';
import { PermissionCode } from '@tempo/api/generated/constants';
import type { UserPermissionFragment } from '@tempo/api/generated/graphql';
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

export interface LoadMore<TData, TVariables> {
  loadMore: (
    mergeFunc: (prev: TData, next: TData) => TData,
    extraVariables: Partial<TVariables>
  ) => Promise<OperationResult<TData>>;
}

type WithoutPermissions<TVariables> = Omit<TVariables, PrefixedPermissionCode>;

export type UseQueryHookOptions<
  TData = any,
  TVariables extends AnyVariables = AnyVariables,
> = Omit<UseQueryArgs<TVariables, TData>, 'query'> & {
  displayLoader?: boolean;
};

export type UseAuthorizedQueryHookOptions<
  TVariables extends AnyVariables = AnyVariables,
  TData = any,
> = Omit<UseQueryArgs<TVariables, TData>, 'query' | 'variables'> & {
  variables?: WithoutPermissions<UseQueryArgs<TVariables, TData>['variables']>;
  displayLoader?: boolean;
};

export type UseQueryResult<
  TData,
  TVariables extends AnyVariables = AnyVariables,
> = UseQueryResponse<TData, TVariables>;

export function useQuery<TData, TVariables extends AnyVariables>(
  query: TypedDocumentNode<TData, TVariables>,
  {
    variables,
    pause = false,
    requestPolicy = 'cache-and-network',
    displayLoader = true,
  }: UseQueryHookOptions<TData, TVariables>
): UseQueryResult<TData, TVariables> {
  const [queryData, fetch] = useBaseQuery<TData, TVariables>({
    query,
    variables,
    pause,
    requestPolicy,
  } as unknown as UseQueryArgs<TVariables, TData>);

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

  return [queryData, fetch];
}

export function useAuthorizedQuery<TData, TVariables extends AnyVariables>(
  query: TypedDocumentNode<TData, TVariables>,
  {
    variables,
    pause = false,
    requestPolicy = 'cache-and-network',
    displayLoader = true,
  }: UseAuthorizedQueryHookOptions<TVariables, TData>
): UseQueryResult<TData, TVariables> {
  const _userPermissions = useUserPermissions();
  const userPermissions = _userPermissions ?? [];

  const variablesWithPermissions = {
    ...variables,
    ...ALL_PERMISSIONS,
    ...getUserPermissions(userPermissions),
  } as unknown as UseQueryArgs<TVariables, TData>['variables']; // TODO
  // console.log('variablesWithPermissions', variablesWithPermissions);

  const queryOptions = {
    variables: variablesWithPermissions,
    pause,
    requestPolicy,
    displayLoader,
  } as UseQueryHookOptions<TData, TVariables>;

  const [queryData, fetch] = useQuery<TData, TVariables>(query, queryOptions);

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

  return [queryData, fetch];
}
