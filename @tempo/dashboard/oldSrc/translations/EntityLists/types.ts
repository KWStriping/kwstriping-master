import type { LanguageCode } from '@tempo/api/generated/graphql';
import type { PaginationState } from '@tempo/dashboard/hooks/usePaginator';
import type { LanguageEntitiesUrlQueryParams } from '@tempo/dashboard/oldSrc/translations/urls';

export interface TranslationsEntityListProps {
  params: LanguageEntitiesUrlQueryParams;
  variables: PaginationState & { language: LanguageCode };
}
