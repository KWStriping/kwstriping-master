import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useQuery } from '@core/urql/hooks';
import type { FC } from 'react';
import type { TranslationsEntityListProps } from './types';
import { sumCompleted } from './utils';
import TranslationsEntitiesList from '@dashboard/components/translations/TranslationsEntitiesList';
import { ShippingMethodTranslationsDocument } from '@core/api/graphql';
import usePaginator, { PaginatorContext } from '@dashboard/hooks/usePaginator';
import { languageEntityUrl, TranslatableEntities } from '@dashboard/oldSrc/translations/urls';

const TranslationsShippingMethodList: FC<TranslationsEntityListProps> = ({
  params,
  variables,
}) => {
  const [{ data, fetching: loading }] = useQuery(ShippingMethodTranslationsDocument, {
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
            node.__typename === 'ShippingMethodTranslation' && {
              completion: {
                current: sumCompleted([node.translation?.name, node.translation?.description]),
                max: 2,
              },
              id: node?.shippingMethod.id,
              name: node?.name,
            }
        )}
        getRowHref={(id) =>
          languageEntityUrl(variables.language, TranslatableEntities.shippingMethods, id)
        }
      />
    </PaginatorContext.Provider>
  );
};

export default TranslationsShippingMethodList;
