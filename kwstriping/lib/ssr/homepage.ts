import type { ParsedUrlQuery } from 'querystring';

import type { Path } from '@tempo/utils/regions';
import { regionCombinations } from '@tempo/utils/regions';

export interface ProductPathArguments extends ParsedUrlQuery {
  channel: string;
  locale: string;
}

export const homepagePaths = () => {
  const paths: Path<ProductPathArguments>[] = regionCombinations().map((combination) => ({
    params: {
      locale: combination.localeSlug,
      channel: combination.channelSlug,
    },
  }));
  return paths;
};
