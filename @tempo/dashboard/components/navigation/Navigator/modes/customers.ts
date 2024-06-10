import * as m from '@paraglide/messages';
import type { TFunction } from '@tempo/next/i18n';
import type { SearchCustomersQuery } from '@tempo/api/generated/graphql';
import { customerUrl } from '@tempo/dashboard/oldSrc/customers/urls';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';

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
        ? (m.dashboard_customerWithName({
            firstName: customer.firstName,
            lastName: customer.lastName,
          }) ?? '{{firstName}} {{lastName}}')
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
