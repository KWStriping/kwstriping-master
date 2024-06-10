import { useQuery } from '@core/urql/hooks';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import type { FC } from 'react';
import type { TranslationsEntityListProps } from './types';
import TranslationsEntitiesList from '@dashboard/components/translations/TranslationsEntitiesList';
import { AttributeTranslationsDocument } from '@core/api/graphql';
import usePaginator, { PaginatorContext } from '@dashboard/hooks/usePaginator';
import { languageEntityUrl, TranslatableEntities } from '@dashboard/oldSrc/translations/urls';

const TranslationsAttributeList: FC<TranslationsEntityListProps> = ({ params, variables }) => {
  const [{ data, fetching: loading }] = useQuery(AttributeTranslationsDocument, {
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
            node.__typename === 'AttributeTranslation' && {
              completion: null,
              id: node?.attribute.id,
              name: node?.attribute.name,
            }
        )}
        getRowHref={(id) =>
          languageEntityUrl(variables.language, TranslatableEntities.attributes, id)
        }
      />
    </PaginatorContext.Provider>
  );
};

export default TranslationsAttributeList;
