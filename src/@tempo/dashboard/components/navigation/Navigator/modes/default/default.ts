import type { MutationFunction } from '@tempo/api';
import type { TFunction } from '@tempo/next/i18n';
import type { OrderDraftCreateMutation } from '@tempo/api/generated/graphql';

import type { QuickSearchAction, QuickSearchMode } from '../../types';
import { searchInCommands } from '../commands';
import { sortScores } from '../utils';
import searchInViews from './views';

const threshold = 0.05;
const maxActions = 5;

function getDefaultModeActions(
  query: string,
  t: TFunction,
  router: NextRouter,
  createOrder: MutationFunction<OrderDraftCreateMutation, {}>,
  setMode: (mode: QuickSearchMode) => void
): QuickSearchAction[] {
  return [
    ...searchInViews(query, t, router),
    ...searchInCommands(query, t, router, createOrder, setMode),
  ]
    .filter((action) => action.score >= threshold)
    .sort(sortScores)
    .slice(0, maxActions);
}

export default getDefaultModeActions;
