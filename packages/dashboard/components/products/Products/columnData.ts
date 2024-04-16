export function makeGetColumnData(regexp: RegExp): (column: string) => string | null {
  return (column) => {
    if (!regexp.test(column)) return null;
    const match = column.match(regexp);
    return match ? (match[1] ? match[1] : null) : null;
  };
}

export const getColumnAttribute = makeGetColumnData(/^attribute:(.*)/);
export const getColumnChannel = makeGetColumnData(/^channel:(.*)/);
export const getColumnChannelAvailability = makeGetColumnData(/^availableInChannel:(.*)/);
export const getColumnStock = makeGetColumnData(/^stock:(.*)/);
