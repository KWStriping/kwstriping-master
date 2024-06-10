import type { TFunction } from '@core/i18n';
import type { MutationFunction } from '@core/urql';
import type { OrderDraftCreateMutation } from '@core/api/graphql';
import type { NextRouter } from 'next/router';
import type { QuickSearchAction, QuickSearchMode } from '../types';
import getCatalogModeActions from './catalog';
import getCommandModeActions from './commands';
import getCustomersModeActions from './customers';
import getDefaultModeActions from './default';
import getHelpModeActions from './help';
import getOrdersModeActions from './orders';
import type { ActionQueries } from './types';

function getModeActions(
  mode: QuickSearchMode,
  query: string,
  t: TFunction,
  queries: ActionQueries,
  cbs: {
    createOrder: MutationFunction<OrderDraftCreateMutation, {}>;
    router: NextRouter;
    setMode: (mode: QuickSearchMode) => void;
  }
): QuickSearchAction[] {
  switch (mode) {
    case 'catalog':
      return getCatalogModeActions(query, t, cbs.router, queries.catalog);
    case 'commands':
      return getCommandModeActions(query, t, cbs.router, cbs.createOrder, cbs.setMode);
    case 'customers':
      return getCustomersModeActions(t, cbs.router, queries.customers);
    case 'help':
      return getHelpModeActions(query, t, cbs.setMode);
    case 'orders':
      return getOrdersModeActions(query, t, cbs.router, queries.order);
    default:
      return getDefaultModeActions(query, t, cbs.router, cbs.createOrder, cbs.setMode);
  }
}

export default getModeActions;
