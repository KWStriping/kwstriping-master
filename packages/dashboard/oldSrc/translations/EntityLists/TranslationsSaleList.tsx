import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useQuery } from '@core/urql/hooks';
import type { FC } from 'react';
import type { TranslationsEntityListProps } from './types';
import { sumCompleted } from './utils';
import TranslationsEntitiesList from '@dashboard/components/translations/TranslationsEntitiesList';
import { SaleTranslationsDocument } from '@core/api/graphql';
import usePaginator, { PaginatorContext } from '@dashboard/hooks/usePaginator';
import { languageEntityUrl, TranslatableEntities } from '@dashboard/oldSrc/translations/urls';

const TranslationsSaleList: FC<TranslationsEntityListProps> = ({ params, variables }) => {
  const [{ data, fetching: loading }] = useQuery(SaleTranslationsDocument, {
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
            node.__typename === 'SaleTranslation' && {
              completion: {
                current: sumCompleted([node.translation?.name]),
                max: 1,
              },
              id: node.sale?.id,
              name: node.sale?.name,
            }
        )}
        getRowHref={(id) => languageEntityUrl(variables.language, TranslatableEntities.sales, id)}
      />
    </PaginatorContext.Provider>
  );
};

export default TranslationsSaleList;
