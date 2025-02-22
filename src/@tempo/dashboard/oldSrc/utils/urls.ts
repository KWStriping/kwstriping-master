import isArray from 'lodash-es/isArray';
import { stringify } from 'qs';
import { getAppDefaultMountPath, getAppMountPath } from '@tempo/dashboard/oldSrc/config';

export function stringifyQs(params: unknown, arrayFormat?: string): string {
  if (!params) return '';
  return stringify(params, {
    arrayFormat: arrayFormat || 'indices',
  });
}

export function getArrayQueryParam(param: string | string[]): string[] {
  if (!param) {
    return undefined;
  }

  if (isArray(param)) {
    return param;
  }

  return [param];
}

export const getAppMountPathForRedirect = () =>
  getAppMountPath() === getAppDefaultMountPath() ? '' : getAppMountPath();
