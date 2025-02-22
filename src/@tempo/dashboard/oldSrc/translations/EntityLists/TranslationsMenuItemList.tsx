import { useQuery } from '@tempo/api/hooks';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import type { FC } from 'react';
import { MenuItemTranslationsDocument } from '@tempo/api/generated/graphql';
import type { TranslationsEntityListProps } from './types';
import { sumCompleted } from './utils';
import TranslationsEntitiesList from '@tempo/dashboard/components/translations/TranslationsEntitiesList';
import usePaginator, { PaginatorContext } from '@tempo/dashboard/hooks/usePaginator';
import {
  languageEntityUrl,
  TranslatableEntities,
} from '@tempo/dashboard/oldSrc/translations/urls';

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
