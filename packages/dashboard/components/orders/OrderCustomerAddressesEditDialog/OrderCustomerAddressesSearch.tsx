import { useTranslation } from '@core/i18n';
import Button from '@core/ui/components/buttons/Button';
import { ConfirmButton } from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { getById } from '@core/utils';
import CustomerAddressChoiceCard from '@dashboard/components/customers/CustomerAddressChoiceCard';
import { AddressType } from '@core/api/constants';
import type { AddressFragment } from '@core/api/graphql';
import type { FormChange } from '@dashboard/hooks/useForm';
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

  const { t } = useTranslation();
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
        {t('dashboard.searchInfo', 'Select an address you want to use from the list below')}
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
            ? t('dashboard.oResultsFound', 'No results found')
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
            label={t(
              type === AddressType.Shipping
                ? messages.billingSameAsShipping
                : messages.shippingSameAsBilling
            )}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={exitSearch} color="secondary">
          {t('dashboard.cancel', 'Cancel')}
        </Button>
        <ConfirmButton
          color="primary"
          transitionState={transitionState}
          type={openFromCustomerChange ? undefined : 'submit'}
          onClick={handleSelect}
        >
          {t('dashboard.select', 'Select')}
        </ConfirmButton>
      </DialogActions>
    </>
  );
};

OrderCustomerAddressesSearch.displayName = 'OrderCustomerAddressesSearch';
export default OrderCustomerAddressesSearch;
