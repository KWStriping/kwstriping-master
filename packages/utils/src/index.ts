export * from './utils';
export * from './validation';
export * from './address';
export * from './regions';

import type { Node } from '@core/api';
import type { ObjectSchema } from 'yup';

export const getById =
  <T extends { id: string } = Node>(idToCompare: string | undefined) =>
  (obj: T) =>
    obj.id === idToCompare;

export const getBySlug = (slugToCompare: string) => (obj: { slug: string }) =>
  obj.slug === slugToCompare;

export const getByUnmatchingId = (idToCompare: string) => (obj: { id: string }) =>
  obj.id !== idToCompare;

export const findById = <T extends Node>(id: string, list?: T[]) => list?.find(getById(id));

export const wrapError = (err: unknown) => {
  if (!err) {
    return new Error();
  }
  if (err instanceof Error) {
    return err;
  }
  if (typeof err === 'string') {
    return new Error(err);
  }
  if (typeof err === 'object' && 'toString' in err) {
    return new Error(err.toString());
  }
  return new Error(JSON.stringify(err));
};

export const safeJsonParse = <R = unknown>(json: string) => {
  try {
    return [null, JSON.parse(json) as R] as const;
  } catch (err) {
    return [wrapError(err), null] as const;
  }
};

export const createParseAndValidateBody =
  <S extends ObjectSchema<{}>>(schema: S) =>
  (reqBody: unknown) => {
    try {
      const maybeBody = typeof reqBody === 'string' ? JSON.parse(reqBody) : reqBody;
      return [null, schema.validateSync(maybeBody)] as const;
    } catch (err) {
      return [wrapError(err), null] as const;
    }
  };

export function assertUnreachable(value: never): never {
  throw new Error(`Unexpected case: ${value}`);
}
