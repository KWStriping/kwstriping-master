import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { useQuery } from '@tempo/api/hooks';
import type { FC } from 'react';
import TranslationsEntitiesList from '@tempo/dashboard/components/translations/TranslationsEntitiesList';
import { ProductTranslationsDocument } from '@tempo/api/generated/graphql';
import usePaginator, { PaginatorContext } from '@tempo/dashboard/hooks/usePaginator';
import { languageEntityUrl, TranslatableEntities } from '@tempo/dashboard/oldSrc/translations/urls';
import { sumCompleted } from './utils';
import type { TranslationsEntityListProps } from './types';

const TranslationsProductList: FC<TranslationsEntityListProps> = ({ params, variables }) => {
  const [{ data, fetching: loading }] = useQuery(ProductTranslationsDocument, {
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
            node.__typename === 'ProductTranslation' && {
              completion: {
                current: sumCompleted([
                  node.translation?.description,
                  node.translation?.name,
                  node.translation?.seoDescription,
                  node.translation?.seoTitle,
                  ...(node.values?.map(({ translation }) => translation?.richText) || []),
                ]),
                max: 4 + (node.values?.length || 0),
              },
              id: node?.product?.id,
              name: node?.product?.name,
            }
        )}
        getRowHref={(id) =>
          languageEntityUrl(variables.language, TranslatableEntities.products, id)
        }
      />
    </PaginatorContext.Provider>
  );
};

export default TranslationsProductList;
