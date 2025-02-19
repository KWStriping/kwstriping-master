import { useQuery } from '@tempo/api/hooks';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import type { FC } from 'react';
import { CollectionTranslationsDocument } from '@tempo/api/generated/graphql';
import type { TranslationsEntityListProps } from './types';
import { sumCompleted } from './utils';
import TranslationsEntitiesList from '@tempo/dashboard/components/translations/TranslationsEntitiesList';
import usePaginator, { PaginatorContext } from '@tempo/dashboard/hooks/usePaginator';
import {
  languageEntityUrl,
  TranslatableEntities,
} from '@tempo/dashboard/oldSrc/translations/urls';

const TranslationsCollectionList: FC<TranslationsEntityListProps> = ({ params, variables }) => {
  const [{ data, fetching: loading }] = useQuery(CollectionTranslationsDocument, {
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
            node.__typename === 'CollectionTranslation' && {
              completion: {
                current: sumCompleted([
                  node.translation?.description,
                  node.translation?.name,
                  node.translation?.seoDescription,
                  node.translation?.seoTitle,
                ]),
                max: 4,
              },
              id: node.collection.id,
              name: node.collection.name,
            }
        )}
        getRowHref={(id) =>
          languageEntityUrl(variables.language, TranslatableEntities.collections, id)
        }
      />
    </PaginatorContext.Provider>
  );
};

export default TranslationsCollectionList;
