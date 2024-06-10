export function getFooterColSpanWithBulkActions(arr: unknown[], numberOfColumns: number): number {
  if (arr === undefined || arr?.length) {
    return numberOfColumns + 1;
  }

  return numberOfColumns;
}
