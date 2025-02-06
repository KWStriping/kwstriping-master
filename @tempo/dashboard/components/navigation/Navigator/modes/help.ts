import * as m from '@paraglide/messages';

import type { QuickSearchAction, QuickSearchMode } from '../types';

function getHelpModeActions(
  query: string,
  setMode: (mode: QuickSearchMode) => void
): QuickSearchAction[] {
  if (query !== '') {
    return [
      {
        label: (m.dashboard_oResults() ?? 'No Results'),
        onClick: () => true,
        type: 'action',
      },
    ];
  }

  return [
    {
      label: (m.dashboard_elpDefaultMode() ?? 'Search Views and Actions'),
      onClick: () => {
        setMode('default');
        return true;
      },
      symbol: '...',
      type: 'action',
    },
    {
      label: (m.dashboard_elpCommandsMode() ?? 'Search Command'),
      onClick: () => {
        setMode('commands');
        return true;
      },
      symbol: '>',
      type: 'action',
    },
    {
      label: (m.dashboard_elpOrdersMode() ?? 'Search Orders'),
      onClick: () => {
        setMode('orders');
        return true;
      },
      symbol: '#',
      type: 'action',
    },
    {
      label: (m.dashboard_elpCustomersMode() ?? 'Search Customers'),
      onClick: () => {
        setMode('customers');
        return true;
      },
      symbol: '@',
      type: 'action',
    },
    {
      label: (m.dashboard_elpCatalogMode() ?? 'Search in Catalog'),
      onClick: () => {
        setMode('catalog');
        return true;
      },
      symbol: '$',
      type: 'action',
    },
    {
      label: (m.dashboard_elpMode() ?? 'Display Help'),
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
