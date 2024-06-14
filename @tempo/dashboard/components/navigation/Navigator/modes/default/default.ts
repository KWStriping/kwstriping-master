import type { MutationFunction } from '@tempo/api';;
import type { OrderDraftCreateMutation } from '@tempo/api/generated/graphql';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { QuickSearchAction, QuickSearchMode } from '../../types';
import { searchInCommands } from '../commands';
import { sortScores } from '../utils';
import searchInViews from './views';

const threshold = 0.05;
const maxActions = 5;

function getDefaultModeActions(
  query: string,
  router: AppRouterInstance,
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
