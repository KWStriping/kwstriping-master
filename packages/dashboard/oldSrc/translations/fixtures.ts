import type { LanguageFragment } from '@core/api/graphql';
import { LanguageCode } from '@core/api/constants';

export const languages: LanguageFragment[] = [
  {
    __typename: 'LanguageDisplay',
    code: LanguageCode.De,
    language: 'niemiecki',
  },
  {
    __typename: 'LanguageDisplay',
    code: LanguageCode.En,
    language: 'angielski',
  },
  {
    __typename: 'LanguageDisplay',
    code: LanguageCode.Es,
    language: 'hiszpański',
  },
  {
    __typename: 'LanguageDisplay',
    code: LanguageCode.Pl,
    language: 'polski',
  },
];
