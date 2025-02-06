import type { MutationFunction } from '@tempo/api';
import type { OrderDraftCreateMutation } from '@tempo/api/generated/graphql';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
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
  queries: ActionQueries,
  cbs: {
    createOrder: MutationFunction<OrderDraftCreateMutation, {}>;
    router: AppRouterInstance;
    setMode: (mode: QuickSearchMode) => void;
  }
): QuickSearchAction[] {
  switch (mode) {
    case 'catalog':
      return getCatalogModeActions(query, cbs.router, queries.catalog);
    case 'commands':
      return getCommandModeActions(query, cbs.router, cbs.createOrder, cbs.setMode);
    case 'customers':
      return getCustomersModeActions(cbs.router, queries.customers);
    case 'help':
      return getHelpModeActions(query, cbs.setMode);
    case 'orders':
      return getOrdersModeActions(query, cbs.router, queries.order);
    default:
      return getDefaultModeActions(query, cbs.router, cbs.createOrder, cbs.setMode);
  }
}

export default getModeActions;
