import type { TFunction } from '@core/i18n';

import type { QuickSearchAction, QuickSearchMode } from '../types';

function getHelpModeActions(
  query: string,
  t: TFunction,
  setMode: (mode: QuickSearchMode) => void
): QuickSearchAction[] {
  if (query !== '') {
    return [
      {
        label: t('dashboard.oResults', 'No Results'),
        onClick: () => true,
        type: 'action',
      },
    ];
  }

  return [
    {
      label: t('dashboard.elpDefaultMode', 'Search Views and Actions'),
      onClick: () => {
        setMode('default');
        return true;
      },
      symbol: '...',
      type: 'action',
    },
    {
      label: t('dashboard.elpCommandsMode', 'Search Command'),
      onClick: () => {
        setMode('commands');
        return true;
      },
      symbol: '>',
      type: 'action',
    },
    {
      label: t('dashboard.elpOrdersMode', 'Search Orders'),
      onClick: () => {
        setMode('orders');
        return true;
      },
      symbol: '#',
      type: 'action',
    },
    {
      label: t('dashboard.elpCustomersMode', 'Search Customers'),
      onClick: () => {
        setMode('customers');
        return true;
      },
      symbol: '@',
      type: 'action',
    },
    {
      label: t('dashboard.elpCatalogMode', 'Search in Catalog'),
      onClick: () => {
        setMode('catalog');
        return true;
      },
      symbol: '$',
      type: 'action',
    },
    {
      label: t('dashboard.elpMode', 'Display Help'),
      onClick: () => {
        setMode('help');
        return true;
      },
      symbol: '?',
      type: 'action',
    },
  ];
}

export default getHelpModeActions;
