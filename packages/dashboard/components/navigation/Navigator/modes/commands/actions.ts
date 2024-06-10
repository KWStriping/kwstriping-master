import type { MutationFunction } from '@core/urql';
import { score } from 'fuzzaldrin';
import type { TFunction } from '@core/i18n';

import type { QuickSearchActionInput, QuickSearchMode } from '../../types';
import { sortScores } from '../utils';
import { groupAddUrl } from '@dashboard/oldSrc/groups/urls';
import { customerAddUrl } from '@dashboard/oldSrc/customers/urls';
import type { OrderDraftCreateMutation } from '@core/api/graphql';

const threshold = 0.05;
const maxActions = 5;

interface Command {
  label: string;
  onClick: () => boolean;
}
export function searchInCommands(
  search: string,
  t: TFunction,
  router: NextRouter,
  createOrder: MutationFunction<OrderDraftCreateMutation, {}>,
  setMode: (mode: QuickSearchMode) => void
): QuickSearchActionInput[] {
  const actions: Command[] = [
    {
      label: t('dashboard.createCategory', 'Create Category'),
      onClick: () => {
        void router.push('/categories/add');
        return false;
      },
    },
    {
      label: t('dashboard.createCollection', 'Create Collection'),
      onClick: () => {
        void router.push('/collections/add');
        return false;
      },
    },
    {
      label: t('dashboard.createProduct', 'Create Product'),
      onClick: () => {
        void router.push('/products/add');
        return false;
      },
    },
    {
      label: t('dashboard.createGroup', 'Create Permission Group'),
      onClick: () => {
        void router.push(groupAddUrl);
        return false;
      },
    },
    {
      label: t('dashboard.createUser', 'Create Customer'),
      onClick: () => {
        void router.push(customerAddUrl);
        return false;
      },
    },
    {
      label: t('dashboard.createVoucher', 'Create Voucher'),
      onClick: () => {
        void router.push('/discounts/vouchers/add');
        return false;
      },
    },
    {
      label: t('dashboard.createOrder', 'Create Order'),
      onClick: () => {
        createOrder();
        return false;
      },
    },
    {
      label: t('dashboard.elpMode', 'Display Help'),
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
  t: TFunction,
  router: NextRouter,
  createOrder: MutationFunction<OrderDraftCreateMutation, {}>,
  setMode: (mode: QuickSearchMode) => void
): QuickSearchActionInput[] {
  return [...searchInCommands(query, t, router, createOrder, setMode)]
    .filter((action) => action.score >= threshold)
    .sort(sortScores)
    .slice(0, maxActions);
}

export default getCommandModeActions;
