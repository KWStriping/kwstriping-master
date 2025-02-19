export function isInEnum<TEnum extends Record<string, unknown>>(needle: string, haystack: TEnum) {
  return Object.keys(haystack).includes(needle);
}

export function findInEnum<TEnum extends Record<string, unknown>>(
  needle: string,
  haystack: TEnum
) {
  const match = Object.keys(haystack).find((key) => key === needle);
  if (match) return haystack[needle as keyof TEnum];
  throw new Error(`Key ${needle} not found in enum: ${Object.keys(haystack).join(', ')}`);
}

export function findValueInEnum<TEnum extends Record<string, unknown>>(
  needle: string,
  haystack: TEnum
): TEnum[keyof TEnum] {
  const match = Object.entries(haystack).find(([_, value]) => value === needle);
  if (!match) throw new Error(`Value ${needle} not found in enum`);
  return needle as unknown as TEnum[keyof TEnum];
}
