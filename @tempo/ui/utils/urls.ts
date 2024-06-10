import type { UrlObject } from 'url';

export const isExternalURL = (url: string | UrlObject) =>
  typeof url === 'string' ? /^https?:\/\//.test(url) : false;
