import * as m from '@paraglide/messages';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { useSearch } from '@tempo/api/hooks';
import type { ChangeEvent, FC } from 'react';
import { createGiftCardMessages as messages } from './messages';
import type { GiftCardCreateFormCustomer } from './types';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import { SearchCustomersDocument } from '@tempo/api/generated/graphql';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@tempo/dashboard/oldSrc/config';
import { getFullName } from '@tempo/dashboard/oldSrc/misc';

export interface GiftCardCustomerSelectFieldProps {
  selectedCustomer: GiftCardCreateFormCustomer;
  setSelectedCustomer: (customer: GiftCardCreateFormCustomer) => void;
  disabled?: boolean;
}

const GiftCardCustomerSelectField: FC<GiftCardCustomerSelectFieldProps> = ({
  selectedCustomer,
  setSelectedCustomer,
  disabled = false,
}) => {
  const { loadMore, search, result } = useSearch(SearchCustomersDocument, {
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const customers = mapEdgesToItems(result?.data?.search);

  const choices = customers?.map(({ email, firstName, lastName }) => ({
    value: email,
    label: getFullName({ firstName, lastName }),
  }));

  const handleSelect = (event: ChangeEvent<unknown>) => {
    const value = event.target.value;
    const label = choices?.find((category) => category.value === value)?.label;

    setSelectedCustomer({ email: value, name: label });
  };

  const label = `${m.dashboard_customerLabel() ?? messages.customerLabel.defaultMessage} *${
    m.optionalField() ?? 'Optional'
  }`;

  return (
    <SingleAutocompleteSelectField
      name="customer"
      label={label}
      data-test-id="customer-field"
      displayValue={selectedCustomer.name}
      value={selectedCustomer.email}
      choices={choices || []}
      fetchChoices={search}
      onChange={handleSelect}
      onFetchMore={loadMore}
      disabled={disabled}
    />
  );
};

export default GiftCardCustomerSelectField;
