import { Trans, useTranslation } from '@core/i18n';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { DialogHeader } from '@core/ui/components/dialog/DialogHeader';
import { getById } from '@core/utils';
import { transformAddressToAddressInput } from '@core/utils/address';
import Checkbox from '@dashboard/components/core/Checkbox';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import { AddressType } from '@core/api/constants';
import type {
  AddressFragment,
  AddressUpdateInput,
  CountryWithCodeFragment,
  Node,
  OrderErrorFragment,
} from '@core/api/graphql';
import useAddressValidation from '@dashboard/hooks/useAddressValidation';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import useModalDialogErrors from '@dashboard/hooks/useModalDialogErrors';
import type { AddressTypeInput } from '@dashboard/oldSrc/customers/types';
import { buttonMessages } from '@dashboard/oldSrc/intl';
import { mapCountriesToChoices } from '@dashboard/oldSrc/utils/maps';
import { Dialog, DialogActions, DialogContent, Divider, FormControlLabel } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import type { FC } from 'react';

import type { OrderCustomerAddressesEditFormData } from './form';
import OrderCustomerAddressesEditForm, { AddressInputOption } from './form';

import { dialogMessages } from './messages';
import OrderCustomerAddressEdit from './OrderCustomerAddressEdit';
import OrderCustomerAddressesSearch from './OrderCustomerAddressesSearch';
import type {
  OrderCustomerAddressesEditDialogOutput,
  OrderCustomerSearchAddressState,
} from './types';
import { AddressEditDialogVariant } from './types';
import { getAddressEditProps, hasPreSubmitErrors, validateDefaultAddress } from './utils';

export interface OrderCustomerAddressesEditDialogProps {
  open: boolean;
  variant: AddressEditDialogVariant;
  loading: boolean;
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  orderShippingAddress?: AddressTypeInput;
  orderBillingAddress?: AddressTypeInput;
  countries?: Maybe<CountryWithCodeFragment[]>;
  customerAddresses?: Maybe<AddressFragment[]>;
  defaultShippingAddress?: Node;
  defaultBillingAddress?: Node;
  onClose();
  onConfirm(data: Partial<OrderCustomerAddressesEditDialogOutput>): SubmitPromise<any[]>;
}

const defaultSearchState: OrderCustomerSearchAddressState = {
  open: false,
  type: undefined,
};

const OrderCustomerAddressesEditDialog: FC<OrderCustomerAddressesEditDialogProps> = (props) => {
  const {
    open,
    variant,
    loading,
    confirmButtonState,
    errors = [],
    countries = [],
    customerAddresses = [],
    defaultShippingAddress,
    defaultBillingAddress,
    onClose,
    onConfirm,
    orderShippingAddress,
    orderBillingAddress,
  } = props;
  const { t } = useTranslation();

  const hasCustomerChanged = variant === AddressEditDialogVariant.ChangeCustomer;

  const { errors: shippingValidationErrors, submit: handleShippingSubmit } = useAddressValidation(
    (address) => address,
    AddressType.Shipping
  );
  const { errors: billingValidationErrors, submit: handleBillingSubmit } = useAddressValidation(
    (address) => address,
    AddressType.Billing
  );

  const dialogErrors = useModalDialogErrors(
    [...errors, ...shippingValidationErrors, ...billingValidationErrors],
    open
  );

  const continueToSearchAddressesState = (data: OrderCustomerAddressesEditFormData): boolean => {
    if (hasCustomerChanged || addressSearchState.open) {
      return false;
    }
    if (!customerAddresses.length) {
      return false;
    }
    if (variant === AddressEditDialogVariant.ChangeShippingAddress) {
      return data?.shippingAddressInputOption === AddressInputOption.CustomerAddress;
    }
    return data?.billingAddressInputOption === AddressInputOption.CustomerAddress;
  };

  const getCustomerAddress = (selectedCustomerAddressID: string): AddressUpdateInput =>
    transformAddressToAddressInput(customerAddresses.find(getById(selectedCustomerAddressID)));
  // async because handleShippingSubmit can return a promise
  const handleAddressesSubmit = async (data: OrderCustomerAddressesEditFormData) => {
    const shippingAddress =
      !!customerAddresses?.length &&
      data?.shippingAddressInputOption === AddressInputOption.CustomerAddress
        ? getCustomerAddress(data?.customerShippingAddress?.id)
        : await handleShippingSubmit(data?.shippingAddress);

    const billingAddress =
      !!customerAddresses?.length &&
      data?.billingAddressInputOption === AddressInputOption.CustomerAddress
        ? getCustomerAddress(data?.customerBillingAddress?.id)
        : await handleBillingSubmit(data?.billingAddress);

    if (variant === AddressEditDialogVariant.ChangeShippingAddress) {
      return {
        shippingAddress,
        ...(data?.cloneAddress && { billingAddress: shippingAddress }),
      };
    }
    if (variant === AddressEditDialogVariant.ChangeBillingAddress) {
      return {
        ...(data?.cloneAddress && { shippingAddress: billingAddress }),
        billingAddress,
      };
    }
    return {
      shippingAddress,
      billingAddress: data?.cloneAddress ? shippingAddress : billingAddress,
    };
  };

  const getDialogTitle = (): MessageDescriptor => {
    if (addressSearchState.open) {
      if (variant === AddressEditDialogVariant.ChangeShippingAddress) {
        return dialogMessages.shippingTitle;
      }
      if (variant === AddressEditDialogVariant.ChangeBillingAddress) {
        return dialogMessages.billingTitle;
      }
    }
    if (variant === AddressEditDialogVariant.ChangeShippingAddress) {
      return dialogMessages.shippingChangeTitle;
    }
    if (variant === AddressEditDialogVariant.ChangeBillingAddress) {
      return dialogMessages.billingChangeTitle;
    }
    return dialogMessages.customerChangeTitle;
  };
  const getDialogDescription = (): MessageDescriptor => {
    if (customerAddresses.length === 0) {
      return dialogMessages.noAddressDescription;
    }
    if (variant === AddressEditDialogVariant.ChangeCustomer) {
      return dialogMessages.customerChangeDescription;
    }
    return dialogMessages.addressChangeDescription;
  };

  const handleContinue = (data: OrderCustomerAddressesEditFormData) => {
    if (continueToSearchAddressesState(data)) {
      setAddressSearchState({
        open: true,
        type:
          variant === AddressEditDialogVariant.ChangeShippingAddress
            ? AddressType.Shipping
            : AddressType.Billing,
      });
      return;
    }
    handleSubmit(data);
  };
  const handleSubmit = async (data: OrderCustomerAddressesEditFormData) => {
    const addressesInput = await handleAddressesSubmit(data);
    if (addressesInput && !hasPreSubmitErrors(addressesInput)) {
      await onConfirm(addressesInput as OrderCustomerAddressesEditDialogOutput);
      setAddressSearchState(defaultSearchState);
    }
    return Promise.resolve([...shippingValidationErrors, ...billingValidationErrors]);
  };

  const countryChoices = mapCountriesToChoices(countries);

  const [addressSearchState, setAddressSearchState] =
    useState<OrderCustomerSearchAddressState>(defaultSearchState);

  const validatedDefaultShippingAddress = validateDefaultAddress(
    defaultShippingAddress,
    customerAddresses
  );
  const validatedDefaultBillingAddress = validateDefaultAddress(
    defaultBillingAddress,
    customerAddresses
  );

  const addressEditCommonProps = {
    showCard: hasCustomerChanged,
    loading,
    countryChoices,
    customerAddresses,
  };

  const exitModal = () => {
    onClose();
    setAddressSearchState(defaultSearchState);
  };

  return (
    <Dialog onClose={exitModal} open={open} fullWidth>
      <DialogHeader onClose={exitModal}>
        <Trans {...getDialogTitle()} />
      </DialogHeader>
      <OrderCustomerAddressesEditForm
        countryChoices={countryChoices}
        countries={countries}
        defaultShippingAddress={validatedDefaultShippingAddress}
        defaultBillingAddress={validatedDefaultBillingAddress}
        defaultCloneAddress={hasCustomerChanged}
        initial={{
          shippingAddress: orderShippingAddress,
          billingAddress: orderBillingAddress,
        }}
        onSubmit={handleContinue}
      >
        {({ change, data, handlers }) => {
          const shippingAddressEditProps = getAddressEditProps(
            'shipping',
            data,
            handlers,
            change,
            dialogErrors,
            setAddressSearchState,
            addressEditCommonProps
          );
          const billingAddressEditProps = getAddressEditProps(
            'billing',
            data,
            handlers,
            change,
            dialogErrors,
            setAddressSearchState,
            addressEditCommonProps
          );
          return (
            <>
              {addressSearchState.open ? (
                <OrderCustomerAddressesSearch
                  openFromCustomerChange={hasCustomerChanged}
                  type={addressSearchState?.type}
                  cloneAddress={data?.cloneAddress}
                  formChange={change}
                  transitionState={confirmButtonState}
                  customerAddresses={customerAddresses}
                  selectedCustomerAddressId={
                    addressSearchState.type === AddressType.Shipping
                      ? data?.customerShippingAddress?.id
                      : data?.customerBillingAddress?.id
                  }
                  onChangeCustomerShippingAddress={(customerAddress) =>
                    handlers.changeCustomerAddress(customerAddress, 'customerShippingAddress')
                  }
                  onChangeCustomerBillingAddress={(customerAddress) =>
                    handlers.changeCustomerAddress(customerAddress, 'customerBillingAddress')
                  }
                  exitSearch={() => setAddressSearchState(defaultSearchState)}
                />
              ) : (
                <>
                  <DialogContent className={styles.dialogContent ?? ''}>
                    <Typography>
                      <Trans {...getDialogDescription()} />
                    </Typography>
                    {hasCustomerChanged && (
                      <>
                        <OrderCustomerAddressEdit {...shippingAddressEditProps} />
                        <FormSpacer />
                        <Divider />
                        <FormSpacer />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data?.cloneAddress}
                              name="billingSameAsShipping"
                              onChange={() =>
                                change({
                                  target: {
                                    name: 'cloneAddress',
                                    value: !data?.cloneAddress,
                                  },
                                })
                              }
                              data-test-id="billing-same-as-shipping"
                            />
                          }
                          label={t(
                            'dashboard.illingSameAsShipping',
                            'Set the same for billing address'
                          )}
                        />
                        {!data?.cloneAddress && (
                          <>
                            <FormSpacer />
                            <Typography>
                              {customerAddresses?.length ? (
                                <Trans {...dialogMessages.customerChangeBillingDescription} />
                              ) : (
                                t('dashboard.oAddressBillingDescription', 'Add a new address:')
                              )}
                            </Typography>
                            <FormSpacer />
                            <OrderCustomerAddressEdit {...billingAddressEditProps} />
                          </>
                        )}
                      </>
                    )}
                    {variant === AddressEditDialogVariant.ChangeShippingAddress && (
                      <>
                        <OrderCustomerAddressEdit {...shippingAddressEditProps} />
                        {data?.shippingAddressInputOption ===
                          AddressInputOption.NewAddress && (
                          <>
                            <FormSpacer />
                            <Divider />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={data?.cloneAddress}
                                  name="billingSameAsShipping"
                                  onChange={() =>
                                    change({
                                      target: {
                                        name: 'cloneAddress',
                                        value: !data?.cloneAddress,
                                      },
                                    })
                                  }
                                  data-test-id="billing-same-as-shipping"
                                />
                              }
                              label={t(
                                'dashboard.illingSameAsShipping',
                                'Set the same for billing address'
                              )}
                            />
                          </>
                        )}
                      </>
                    )}
                    {variant === AddressEditDialogVariant.ChangeBillingAddress && (
                      <>
                        <OrderCustomerAddressEdit {...billingAddressEditProps} />
                        {data?.shippingAddressInputOption ===
                          AddressInputOption.NewAddress && (
                          <>
                            <FormSpacer />
                            <Divider />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={data?.cloneAddress}
                                  name="shippingSameAsBilling"
                                  onChange={() =>
                                    change({
                                      target: {
                                        name: 'cloneAddress',
                                        value: !data?.cloneAddress,
                                      },
                                    })
                                  }
                                  data-test-id="billing-same-as-shipping"
                                />
                              }
                              label={t(
                                'dashboard.shippingSameAsBilling',
                                'Set the same for shipping address'
                              )}
                            />
                          </>
                        )}
                      </>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <ConfirmButton
                      transitionState={confirmButtonState}
                      color="primary"
                      type="submit"
                      data-test-id="submit"
                    >
                      <Trans
                        {...(continueToSearchAddressesState(data)
                          ? buttonMessages.continue
                          : buttonMessages.save)}
                      />
                    </ConfirmButton>
                  </DialogActions>
                </>
              )}
            </>
          );
        }}
      </OrderCustomerAddressesEditForm>
    </Dialog>
  );
};

OrderCustomerAddressesEditDialog.displayName = 'OrderCustomerAddressesEditDialog';
export default OrderCustomerAddressesEditDialog;
