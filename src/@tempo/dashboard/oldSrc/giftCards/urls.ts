import urlJoin from 'url-join';

import type { GiftCardListUrlQueryParams } from './GiftCardsList/types';
import type { GiftCardUpdatePageUrlQueryParams } from './GiftCardUpdate/types';
import { stringifyQs } from '@tempo/dashboard/oldSrc/utils/urls';

export const giftCardsSectionUrlName = '/gift-cards';

export const giftCardsListPath = `${giftCardsSectionUrlName}/`;

export const giftCardListUrl = (params?: GiftCardListUrlQueryParams) => ({
  pathname: giftCardsListPath,
  query: params,
});

export const giftCardPath = (id: string) => urlJoin(giftCardsListPath, id);

export const giftCardUrl = (id: string, params?: GiftCardUpdatePageUrlQueryParams) =>
  giftCardPath(encodeURIComponent(id)) + '?' + stringifyQs(params);

export const giftCardSettingsUrl = urlJoin(giftCardsListPath, 'settings');
