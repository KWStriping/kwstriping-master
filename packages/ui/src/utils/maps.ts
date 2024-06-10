interface Edge<T> {
  node: T;
}

export type Connection<T> = { edges: Array<Edge<T>> };

export function mapEdgesToItems<T>(data: Connection<T>): T[];
export function mapEdgesToItems(data: null | undefined): null | undefined;
export function mapEdgesToItems<T>(
  data: Connection<T> | null | undefined
): T[] | null | undefined;
export function mapEdgesToItems<T>(data: Connection<T> | null | undefined) {
  return data?.edges?.map(({ node }) => node) as T[] | null | undefined;
}
