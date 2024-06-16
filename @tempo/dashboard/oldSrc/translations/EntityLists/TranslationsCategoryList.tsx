import type { CategoryTranslationsQuery, CategoryTranslationsQueryVariables } from '@tempo/api/generated/graphql';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { useQuery } from '@tempo/api/hooks';
import type { FC } from 'react';
import type { TranslationsEntityListProps } from './types';
import { sumCompleted } from './utils';
import TranslationsEntitiesList from '@tempo/dashboard/components/translations/TranslationsEntitiesList';
import { CategoryTranslationsDocument } from '@tempo/api/generated/graphql';
import usePaginator, { PaginatorContext } from '@tempo/dashboard/hooks/usePaginator';
import { languageEntityUrl, TranslatableEntities } from '@tempo/dashboard/oldSrc/translations/urls';

const TranslationsCategoryList: FC<TranslationsEntityListProps> = ({ params, variables }) => {
  const { data, loading } = useQuery(CategoryTranslationsDocument, {
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
            node.__typename === 'CategoryTranslation' && {
              completion: {
                current: sumCompleted([
                  node.translation?.description,
                  node.translation?.name,
                  node.translation?.seoDescription,
                  node.translation?.seoTitle,
                ]),
                max: 4,
              },
              id: node?.category?.id,
              name: node?.category?.name,
            }
        )}
        getRowHref={(id) =>
          languageEntityUrl(variables.language, TranslatableEntities.categories, id)
        }
      />
    </PaginatorContext.Provider>
  );
};

export default TranslationsCategoryList;
