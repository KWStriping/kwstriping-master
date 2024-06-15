import * as m from '@paraglide/messages';
import type { MutationFunction } from '@tempo/api';;
import { score } from 'fuzzaldrin';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { QuickSearchActionInput, QuickSearchMode } from '../../types';
import { sortScores } from '../utils';
import { groupAddUrl } from '@tempo/dashboard/oldSrc/groups/urls';
import { customerAddUrl } from '@tempo/dashboard/oldSrc/customers/urls';
import type { OrderDraftCreateMutation } from '@tempo/api/generated/graphql';

const threshold = 0.05;
const maxActions = 5;

interface Command {
  label: string;
  onClick: () => boolean;
}
export function searchInCommands(
  search: string,
  router: AppRouterInstance,
  createOrder: MutationFunction<OrderDraftCreateMutation, {}>,
  setMode: (mode: QuickSearchMode) => void
): QuickSearchActionInput[] {
  const actions: Command[] = [
    {
      label: (m.dashboard_createCategory() ?? 'Create Category'),
      onClick: () => {
        void router.push('/categories/add');
        return false;
      },
    },
    {
      label: (m.dashboard_createCollection() ?? 'Create Collection'),
      onClick: () => {
        void router.push('/collections/add');
        return false;
      },
    },
    {
      label: (m.dashboard_createProduct() ?? 'Create Product'),
      onClick: () => {
        void router.push('/products/add');
        return false;
      },
    },
    {
      label: (m.dashboard_createGroup() ?? 'Create Permission Group'),
      onClick: () => {
        void router.push(groupAddUrl);
        return false;
      },
    },
    {
      label: (m.dashboard_createUser() ?? 'Create Customer'),
      onClick: () => {
        void router.push(customerAddUrl);
        return false;
      },
    },
    {
      label: (m.dashboard_createVoucher() ?? 'Create Voucher'),
      onClick: () => {
        void router.push('/discounts/vouchers/add');
        return false;
      },
    },
    {
      label: (m.dashboard_createOrder() ?? 'Create Order'),
      onClick: () => {
        createOrder();
        return false;
      },
    },
    {
      label: (m.dashboard_elpMode() ?? 'Display Help'),
      onClick: () => {
        setMode('help');
        return true;
      },
    },
  ];

  return actions.map((action) => ({
    label: action.label,
    onClick: action.onClick,
    score: score(action.label, search),
    text: action.label,
    type: 'action',
  }));
}

function getCommandModeActions(
  query: string,
  router: AppRouterInstance,
  createOrder: MutationFunction<OrderDraftCreateMutation, {}>,
  setMode: (mode: QuickSearchMode) => void
): QuickSearchActionInput[] {
  return [...searchInCommands(query, router, createOrder, setMode)]
    .filter((action) => action.score >= threshold)
    .sort(sortScores)
    .slice(0, maxActions);
}

export default getCommandModeActions;
