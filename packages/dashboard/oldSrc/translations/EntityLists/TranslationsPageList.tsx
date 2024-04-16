import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useQuery } from '@core/urql/hooks';
import type { FC } from 'react';
import type { TranslationsEntityListProps } from './types';
import { sumCompleted } from './utils';
import TranslationsEntitiesList from '@dashboard/components/translations/TranslationsEntitiesList';
import { PageTranslationsDocument } from '@core/api/graphql';
import usePaginator, { PaginatorContext } from '@dashboard/hooks/usePaginator';
import { languageEntityUrl, TranslatableEntities } from '@dashboard/oldSrc/translations/urls';

const TranslationsPageList: FC<TranslationsEntityListProps> = ({ params, variables }) => {
  const [{ data, fetching: loading }] = useQuery(PageTranslationsDocument, {
    displayLoader: true,
    variables,
  });

  const paginationValues = usePaginator({
    pageInfo: data?.translations?.pageInfo,
    paginationState: variables,
    queryString: params,
  });

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <TranslationsEntitiesList
        disabled={loading}
        entities={mapEdgesToItems(data?.translations)?.map(
          (node) =>
            node.__typename === 'PageTranslation' && {
              completion: {
                current: sumCompleted([
                  node.translation?.content,
                  node.translation?.seoDescription,
                  node.translation?.seoTitle,
                  node.translation?.title,
                ]),
                max: 4,
              },
              id: node?.page.id,
              name: node?.page.title,
            }
        )}
        getRowHref={(id) => languageEntityUrl(variables.language, TranslatableEntities.pages, id)}
      />
    </PaginatorContext.Provider>
  );
};

export default TranslationsPageList;
