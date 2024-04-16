export function sumCompleted(list: unknown[]): number {
  return list.reduce((acc, field) => acc + (field ? 1 : 0), 0);
}
