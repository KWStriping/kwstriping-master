import * as m from '@paraglide/messages';
import Button from '@tempo/ui/components/buttons/Button';
import { ConfirmButton } from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { getById } from '@tempo/utils';
import { AddressType } from '@tempo/api/generated/constants';
import type { AddressFragment } from '@tempo/api/generated/graphql';
import SearchIcon from '@mui/icons-material/Search';
import {
  Checkbox,
  DialogActions,
  DialogContent,
  FormControlLabel,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Fragment, useState } from 'react';
import type { ChangeEvent, FC } from 'react';

import { dialogMessages as messages } from './messages';
import { parseQuery, stringifyAddress } from './utils';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import CustomerAddressChoiceCard from '@tempo/dashboard/components/customers/CustomerAddressChoiceCard';

export interface OrderCustomerAddressesSearchProps {
  type: AddressType;
  cloneAddress: boolean;
  formChange: FormChange;
  openFromCustomerChange: boolean;
  transitionState: ConfirmButtonTransitionState;
  selectedCustomerAddressId: string;
  customerAddresses: AddressFragment[];
  onChangeCustomerShippingAddress: (customerAddress: AddressFragment) => void;
  onChangeCustomerBillingAddress: (customerAddress: AddressFragment) => void;
  exitSearch();
}

const OrderCustomerAddressesSearch: FC<OrderCustomerAddressesSearchProps> = (props) => {
  const {
    type,
    cloneAddress,
    formChange,
    transitionState,
    openFromCustomerChange,
    selectedCustomerAddressId,
    customerAddresses,
    onChangeCustomerShippingAddress,
    onChangeCustomerBillingAddress,
    exitSearch,
  } = props;

  const styles = useStyles(props);

  const initialAddress = customerAddresses.find(getById(selectedCustomerAddressId));

  const [query, setQuery] = useState('');
  const [temporarySelectedAddress, setTemporarySelectedAddress] = useState(initialAddress);

  const handleSelect = () => {
    if (type === AddressType.Shipping) {
      onChangeCustomerShippingAddress(temporarySelectedAddress);
    } else {
      onChangeCustomerBillingAddress(temporarySelectedAddress);
    }
    if (openFromCustomerChange) {
      exitSearch();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredCustomerAddresses = customerAddresses.filter((address) => {
    const parsedAddress = stringifyAddress(address);

    return parsedAddress.search(new RegExp(parseQuery(query), 'i')) >= 0;
  });

  return (
    <>
      <DialogContent className={styles.dialogContent ?? ''}>
        {m.dashboard_searchInfo() ?? 'Select an address you want to use from the list below'}
        <TextField
          value={query}
          variant="outlined"
          onChange={handleChange}
          placeholder={'Search addresses'}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{ className: styles.searchInput }}
        />
        <div className={styles.scrollableWrapper ?? ''}>
          {filteredCustomerAddresses.length === 0
            ? (m.dashboard_oResultsFound() ?? 'No results found')
            : filteredCustomerAddresses?.map((address) => (
                <Fragment key={address.id}>
                  <CustomerAddressChoiceCard
                    selected={address.id === temporarySelectedAddress.id}
                    onSelect={() => setTemporarySelectedAddress(address)}
                    address={address}
                  />
                </Fragment>
              ))}
        </div>
        {!openFromCustomerChange && filteredCustomerAddresses.length !== 0 && (
          <FormControlLabel
            control={
              <Checkbox
                checked={cloneAddress}
                name="cloneAddress"
                onChange={() =>
                  formChange({
                    target: {
                      name: 'cloneAddress',
                      value: !cloneAddress,
                    },
                  })
                }
              />
            }
            label={
              m[
                type === AddressType.Shipping
                  ? messages.billingSameAsShipping
                  : messages.shippingSameAsBilling
              ]
            }
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={exitSearch} color="secondary">
          {m.dashboard_cancel() ?? 'Cancel'}
        </Button>
        <ConfirmButton
          color="primary"
          transitionState={transitionState}
          type={openFromCustomerChange ? undefined : 'submit'}
          onClick={handleSelect}
        >
          {m.dashboard_select() ?? 'Select'}
        </ConfirmButton>
      </DialogActions>
    </>
  );
};

OrderCustomerAddressesSearch.displayName = 'OrderCustomerAddressesSearch';
export default OrderCustomerAddressesSearch;
