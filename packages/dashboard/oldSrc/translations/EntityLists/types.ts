import type { LanguageCode } from '@core/api/graphql';
import type { PaginationState } from '@dashboard/hooks/usePaginator';
import type { LanguageEntitiesUrlQueryParams } from '@dashboard/oldSrc/translations/urls';

export interface TranslationsEntityListProps {
  params: LanguageEntitiesUrlQueryParams;
  variables: PaginationState & { language: LanguageCode };
}
