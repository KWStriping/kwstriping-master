import type { LanguageFragment } from '@tempo/api/generated/graphql';
import { LanguageCode } from '@tempo/api/generated/constants';

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
