import type { Dialog } from '../types';
import { stringifyQs } from '@tempo/dashboard/oldSrc/utils/urls';

const siteSettingsSection = '/site-settings';

export const siteSettingsPath = siteSettingsSection;
export type SiteSettingsUrlDialog = 'add-key';
export type SiteSettingsUrlQueryParams = Dialog<SiteSettingsUrlDialog>;
export const siteSettingsUrl = (params?: SiteSettingsUrlQueryParams) =>
  `${siteSettingsPath}?${stringifyQs(params)}`;
