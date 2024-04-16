import { useQuery } from '@core/urql/hooks';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import type { FC } from 'react';
import type { TranslationsEntityListProps } from './types';
import { sumCompleted } from './utils';
import TranslationsEntitiesList from '@dashboard/components/translations/TranslationsEntitiesList';
import { MenuItemTranslationsDocument } from '@core/api/graphql';
import usePaginator, { PaginatorContext } from '@dashboard/hooks/usePaginator';
import { languageEntityUrl, TranslatableEntities } from '@dashboard/oldSrc/translations/urls';

const TranslationsMenuItemList: FC<TranslationsEntityListProps> = ({ params, variables }) => {
  const [{ data, fetching: loading }] = useQuery(MenuItemTranslationsDocument, {
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
            node.__typename === 'MenuItemTranslation' && {
              completion: {
                current: sumCompleted([node.translation?.name]),
                max: 1,
              },
              id: node?.menuItem.id,
              name: node?.menuItem.name,
            }
        )}
        getRowHref={(id) =>
          languageEntityUrl(variables.language, TranslatableEntities.menuItems, id)
        }
      />
    </PaginatorContext.Provider>
  );
};

export default TranslationsMenuItemList;
