import type { Dialog } from '@dashboard/oldSrc/types';

export enum GiftCardUpdatePageActionParamsEnum {
  SetBalance = 'set-balance',
  Delete = 'delete',
  ResendCode = 'resend-code',
}

export type GiftCardUpdatePageUrlQueryParams = Dialog<GiftCardUpdatePageActionParamsEnum>;

export const PLACEHOLDER = '-';
