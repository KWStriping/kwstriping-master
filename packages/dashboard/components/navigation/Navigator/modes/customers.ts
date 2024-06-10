import type { TFunction } from '@core/i18n';
import type { SearchCustomersQuery } from '@core/api/graphql';
import { customerUrl } from '@dashboard/oldSrc/customers/urls';
import type { RelayToFlat } from '@dashboard/oldSrc/types';

import type { QuickSearchAction } from '../types';

export function searchInCustomers(
  t: TFunction,
  router: NextRouter,
  customers: RelayToFlat<NonNullable<SearchCustomersQuery['search']>>
): QuickSearchAction[] {
  return customers.map((customer) => ({
    caption: customer.email,
    label:
      customer.firstName && customer.lastName
        ? t('dashboard.customerWithName', '{{firstName}} {{lastName}}', {
            firstName: customer.firstName,
            lastName: customer.lastName,
          })
        : customer.email,
    onClick: () => {
      void router.push(customerUrl(customer.id));
      return false;
    },
    score: 1,
    type: 'customer',
  }));
}

function getCustomersModeActions(
  t: TFunction,
  router: NextRouter,
  customers: RelayToFlat<NonNullable<SearchCustomersQuery['search']>>
): QuickSearchAction[] {
  return searchInCustomers(t, router, customers);
}

export default getCustomersModeActions;
