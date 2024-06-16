import type { ShippingMethodTranslationsQuery, ShippingMethodTranslationsQueryVariables } from '@tempo/api/generated/graphql';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { useQuery } from '@tempo/api/hooks';
import type { FC } from 'react';
import type { TranslationsEntityListProps } from './types';
import { sumCompleted } from './utils';
import TranslationsEntitiesList from '@tempo/dashboard/components/translations/TranslationsEntitiesList';
import { ShippingMethodTranslationsDocument } from '@tempo/api/generated/graphql';
import usePaginator, { PaginatorContext } from '@tempo/dashboard/hooks/usePaginator';
import { languageEntityUrl, TranslatableEntities } from '@tempo/dashboard/oldSrc/translations/urls';

const TranslationsShippingMethodList: FC<TranslationsEntityListProps> = ({
  params,
  variables,
}) => {
  const [{ data, fetching: loading }] = useQuery<ShippingMethodTranslationsQuery, ShippingMethodTranslationsQueryVariables>(ShippingMethodTranslationsDocument, {
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
