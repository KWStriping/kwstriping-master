import type { PageTranslationsQuery, PageTranslationsQueryVariables } from '@tempo/api/generated/graphql';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { useQuery } from '@tempo/api/hooks';
import type { FC } from 'react';
import type { TranslationsEntityListProps } from './types';
import { sumCompleted } from './utils';
import TranslationsEntitiesList from '@tempo/dashboard/components/translations/TranslationsEntitiesList';
import { PageTranslationsDocument } from '@tempo/api/generated/graphql';
import usePaginator, { PaginatorContext } from '@tempo/dashboard/hooks/usePaginator';
import { languageEntityUrl, TranslatableEntities } from '@tempo/dashboard/oldSrc/translations/urls';

const TranslationsPageList: FC<TranslationsEntityListProps> = ({ params, variables }) => {
  const [{ data, fetching: loading }] = useQuery<PageTranslationsQuery, PageTranslationsQueryVariables>(PageTranslationsDocument, {
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
